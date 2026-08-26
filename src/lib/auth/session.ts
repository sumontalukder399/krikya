import { SignJWT, jwtVerify } from 'jose';
import type { Role } from '@/src/server/permissions/roles';

export const SESSION_COOKIE = 'krikya_admin_session';
export type Session = { userId: string; email: string; name: string; role: Role };
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'development-only-secret-change-me-32' : ''));

export async function createSessionToken(session: Session) {
  if (!secret().length) throw new Error('JWT_SECRET is not configured');
  return new SignJWT(session).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(secret());
}
export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret());
  return payload as unknown as Session;
}
