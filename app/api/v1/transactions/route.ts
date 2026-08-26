import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { z } from 'zod';
import { connectDatabase } from '@/src/database/connection';
import { Transaction } from '@/src/database/models/Transaction';
import { User } from '@/src/database/models/User';
import { Notification } from '@/src/database/models/Notification';
import { requirePermission } from '@/src/server/auth';
import { fail, ok } from '@/src/utils/api-response';
import { visibleUserIds, canAccessUser } from '@/src/server/scope';
import { audit } from '@/src/server/audit';

const transferSchema = z.object({ userId: z.string().min(1), amount: z.number().positive(), operation: z.enum(['add', 'subtract']), pin: z.string().min(4).optional(), note: z.string().max(250).optional() });
const requestSchema = z.object({ type: z.enum(['deposit', 'withdrawal']), amount: z.number().positive().max(50_000), method: z.string().trim().min(2).max(80), reference: z.string().trim().max(120).optional(), note: z.string().trim().max(250).optional() });

export async function GET(req: Request) {
  const auth = await requirePermission('transactions:view'); if ('error' in auth) return fail(auth.error, auth.status);
  await connectDatabase(); const p = new URL(req.url).searchParams; const page = Math.max(1, Number(p.get('page')) || 1); const limit = Math.min(100, Math.max(1, Number(p.get('limit')) || 20));
  const ids = await visibleUserIds(auth.session); const filter: Record<string, unknown> = ids ? { userId: { $in: ids } } : {};
  if (p.get('type')) filter.type = p.get('type'); if (p.get('status')) filter.status = p.get('status');
  if (p.get('userId')) { if (!await canAccessUser(auth.session, p.get('userId')!)) return fail('Forbidden', 403); filter.userId = p.get('userId'); }
  if (p.get('start') || p.get('end')) filter.createdAt = { ...(p.get('start') && { $gte: new Date(p.get('start')!) }), ...(p.get('end') && { $lte: new Date(`${p.get('end')}T23:59:59.999Z`) }) };
  const [rows, total, summary] = await Promise.all([Transaction.find(filter).populate('userId', 'name email role').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(), Transaction.countDocuments(filter), Transaction.aggregate([{ $match: filter }, { $group: { _id: null, amount: { $sum: '$amount' }, bonus: { $sum: '$bonus' } } }])]);
  return ok({ rows, total, page, pages: Math.max(1, Math.ceil(total / limit)), summary: summary[0] || { amount: 0, bonus: 0 } });
}

export async function POST(req: Request) {
  const body = await req.json(); const isBanking = body?.type === 'deposit' || body?.type === 'withdrawal';
  const auth = await requirePermission(isBanking ? 'transactions:view' : 'balance:transfer'); if ('error' in auth) return fail(auth.error, auth.status); await connectDatabase();
  if (isBanking) {
    if (auth.session.role !== 'user') return fail('Only users can submit banking requests', 403);
    const parsed = requestSchema.safeParse(body); if (!parsed.success) return fail('Invalid transaction request', 422, parsed.error.flatten());
    if (parsed.data.type === 'deposit' && parsed.data.amount < 200) return fail('Minimum deposit is 200', 422);
    if (parsed.data.type === 'withdrawal' && parsed.data.amount < 500) return fail('Minimum withdrawal is 500', 422);
    const userId = new Types.ObjectId(auth.session.userId);
    if (parsed.data.type === 'withdrawal') { const user = await User.findOneAndUpdate({ _id: userId, status: 'active', balance: { $gte: parsed.data.amount } }, { $inc: { balance: -parsed.data.amount } }, { returnDocument: 'after' }); if (!user) return fail('Insufficient balance or inactive account', 409); }
    try {
      const transaction = await Transaction.create({ ...parsed.data, userId, status: 'pending' });
      await Notification.create({ userId, type: parsed.data.type, title: `${parsed.data.type === 'deposit' ? 'Deposit' : 'Withdrawal'} submitted`, message: `Your request for BDT ${parsed.data.amount.toFixed(2)} is pending review.` });
      await audit(auth.session, `${parsed.data.type}.submitted`, 'Transaction', String(transaction._id), { amount: parsed.data.amount, method: parsed.data.method });
      const user = await User.findById(userId).select('balance').lean(); return ok({ transaction, balance: user?.balance ?? 0 }, 201);
    } catch (error) { if (parsed.data.type === 'withdrawal') await User.updateOne({ _id: userId }, { $inc: { balance: parsed.data.amount } }); throw error; }
  }
  const parsed = transferSchema.safeParse(body); if (!parsed.success) return fail('Invalid transfer data', 422, parsed.error.flatten());
  const actor = await User.findById(auth.session.userId).select('+transactionPinHash'); if (!actor?.transactionPinHash) return fail('Set your Transaction PIN before transferring balance', 409); if (!parsed.data.pin || !await bcrypt.compare(parsed.data.pin, actor.transactionPinHash)) return fail('Invalid transaction PIN', 403);
  const conditions: Record<string, unknown>[] = [{ email: parsed.data.userId.toLowerCase() }]; if (Types.ObjectId.isValid(parsed.data.userId)) conditions.push({ _id: parsed.data.userId });
  const target = await User.findOne({ $or: conditions }); if (!target) return fail('User not found', 404); if (!await canAccessUser(auth.session, String(target._id)) || String(target._id) === auth.session.userId) return fail('Forbidden', 403);
  const delta = parsed.data.operation === 'add' ? parsed.data.amount : -parsed.data.amount; const updated = await User.findOneAndUpdate({ _id: target._id, ...(delta < 0 && { balance: { $gte: parsed.data.amount } }) }, { $inc: { balance: delta } }, { returnDocument: 'after' }); if (!updated) return fail('Insufficient user balance', 409);
  const transaction = await Transaction.create({ userId: target._id, createdBy: auth.session.userId, type: 'transfer', amount: parsed.data.amount, status: 'approved', note: `${parsed.data.operation}: ${parsed.data.note || ''}` });
  await Notification.create({ userId: target._id, type: 'system', title: 'Balance updated', message: `Your balance was ${parsed.data.operation === 'add' ? 'credited' : 'debited'} by BDT ${parsed.data.amount.toFixed(2)}.` }); await audit(auth.session, 'balance.transferred', 'User', String(target._id), { operation: parsed.data.operation, amount: parsed.data.amount, transactionId: String(transaction._id) }); return ok({ transaction, balance: updated.balance }, 201);
}

export async function PATCH(req: Request) {
  const auth = await requirePermission('balance:transfer'); if ('error' in auth) return fail(auth.error, auth.status);
  const parsed = z.object({ id: z.string(), status: z.enum(['approved', 'rejected']), note: z.string().max(250).optional() }).safeParse(await req.json());
  if (!parsed.success || !Types.ObjectId.isValid(parsed.data.id)) return fail('Invalid status update', 422);
  await connectDatabase();
  const existing = await Transaction.findById(parsed.data.id); if (!existing) return fail('Transaction not found', 404);
  if (!await canAccessUser(auth.session, String(existing.userId))) return fail('Forbidden', 403);
  if (!['deposit', 'withdrawal'].includes(existing.type)) return fail('Only banking requests can be reviewed', 422);
  const transaction = await Transaction.findOneAndUpdate({ _id: existing._id, status: 'pending' }, { $set: { status: parsed.data.status, ...(parsed.data.note && { note: parsed.data.note }) } }, { returnDocument: 'after' });
  if (!transaction) return fail('Transaction was already reviewed', 409);
  const delta = transaction.type === 'deposit' && parsed.data.status === 'approved' ? transaction.amount + transaction.bonus : transaction.type === 'withdrawal' && parsed.data.status === 'rejected' ? transaction.amount : 0;
  try { if (delta) await User.updateOne({ _id: transaction.userId }, { $inc: { balance: delta } }); }
  catch (error) { await Transaction.updateOne({ _id: transaction._id, status: parsed.data.status }, { $set: { status: 'pending' } }); throw error; }
  await Notification.create({ userId: transaction.userId, type: transaction.type === 'deposit' ? 'deposit' : 'withdrawal', title: `${transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'} ${parsed.data.status}`, message: `Your BDT ${transaction.amount.toFixed(2)} request was ${parsed.data.status}.` });
  await audit(auth.session, `${transaction.type}.${parsed.data.status}`, 'Transaction', String(transaction._id), { amount: transaction.amount });
  return ok(transaction);
}
