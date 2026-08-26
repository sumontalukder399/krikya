import { currentSession } from '@/src/server/auth';
import { fail, ok } from '@/src/utils/api-response';
export async function GET() { const session = await currentSession(); return session ? ok(session) : fail('Unauthorized', 401); }
