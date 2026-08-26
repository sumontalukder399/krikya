import { SESSION_COOKIE } from '@/src/lib/auth/session';
import { ok } from '@/src/utils/api-response';
export async function POST() { const response = ok({ loggedOut: true }); response.cookies.set(SESSION_COOKIE, '', { path: '/', expires: new Date(0) }); return response; }
