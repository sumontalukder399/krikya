import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { connectDatabase } from '@/src/database/connection';
import { User } from '@/src/database/models/User';
import { createSessionToken, SESSION_COOKIE } from '@/src/lib/auth/session';
import { fail, ok } from '@/src/utils/api-response';
import { rateLimit } from '@/src/server/rate-limit';

const schema = z.object({
  name: z.string().trim().min(3).max(40),
  email: z.string().email(),
  phone: z.string().trim().min(8).max(24),
  password: z.string().min(8).max(128),
  referralCode: z.string().trim().max(80).optional(),
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip') || 'local';
  const rate = rateLimit(`register:${ip}`, 5, 60 * 60_000);
  if (!rate.allowed) return fail(`Too many registrations. Retry in ${rate.retryAfter}s`, 429);
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return fail('Invalid registration data', 422, parsed.error.flatten());
  try {
    await connectDatabase();
    let parentId;
    if (parsed.data.referralCode) {
      const referralCode = parsed.data.referralCode.trim();
      const personalId = /^KR([0-9A-F]{24})$/i.exec(referralCode)?.[1];
      const parent = personalId
        ? await User.findById(personalId).select('_id role')
        : await User.findOne({ $or: [{ email: referralCode.toLowerCase() }, { phone: referralCode }] }).select('_id role');
      if (!parent || (!personalId && parent.role !== 'affiliate_agent')) return fail('Invalid referral code', 422);
      parentId = parent._id;
    }
    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone,
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      role: 'user',
      parentId,
    });
    const data = { id: String(user._id), name: user.name, email: user.email, phone: user.phone, role: user.role, balance: user.balance };
    const response = ok(data, 201);
    response.cookies.set(SESSION_COOKIE, await createSessionToken({ userId: data.id, name: data.name, email: data.email, role: 'user' }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
    return response;
  } catch (error) {
    return fail((error as { code?: number }).code === 11000 ? 'Email already exists' : 'Registration failed', (error as { code?: number }).code === 11000 ? 409 : 500);
  }
}
