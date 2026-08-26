import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/src/lib/auth/session';
import { can, type Permission } from './permissions/roles';
import { connectDatabase } from '@/src/database/connection';import { RolePolicy } from '@/src/database/models/RolePolicy';

export async function currentSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try { return await verifySessionToken(token); } catch { return null; }
}
export async function requirePermission(permission: Permission) {
  const session = await currentSession();
  if (!session) return { error: 'Unauthorized', status: 401 as const };
  await connectDatabase();const policy=await RolePolicy.findOne({role:session.role}).lean();const allowed=policy?policy.permissions.includes(permission):can(session.role,permission);
  if (!allowed) return { error: 'Forbidden', status: 403 as const };
  return { session };
}
