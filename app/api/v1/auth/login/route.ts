import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { connectDatabase } from '@/src/database/connection';
import { User } from '@/src/database/models/User';
import { createSessionToken, SESSION_COOKIE } from '@/src/lib/auth/session';
import { fail, ok } from '@/src/utils/api-response';
import { rateLimit } from '@/src/server/rate-limit';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
export async function POST(request: Request) {
  try {
    const ip=request.headers.get('x-forwarded-for')?.split(',')[0]||request.headers.get('x-real-ip')||'local';const rate=rateLimit(`login:${ip}`,8,15*60_000);if(!rate.allowed)return fail(`Too many login attempts. Retry in ${rate.retryAfter}s`,429);
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return fail('Invalid email or password', 422, parsed.error.flatten());
    await connectDatabase();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() }).select('+passwordHash');
    if (!user || user.status !== 'active' || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return fail('Invalid email or password', 401);
    user.lastLoginAt = new Date(); await user.save();
    const safeUser = { id: String(user._id), name: user.name, email: user.email, role: user.role, balance: user.balance };
    const response = ok(safeUser);
    response.cookies.set(SESSION_COOKIE, await createSessionToken({ userId: safeUser.id, name: user.name, email: user.email, role: user.role }), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
    return response;
  } catch (error) { return fail(error instanceof Error ? error.message : 'Login failed', 500); }
}
