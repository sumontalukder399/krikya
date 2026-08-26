import { currentSession } from '@/src/server/auth';
import { AdminApp } from '@/src/features/admin/AdminApp';
import { AdminLogin } from '@/src/features/admin/AdminLogin';
export const dynamic = 'force-dynamic';
export default async function AdminPage() { const session = await currentSession(); return session ? <AdminApp session={session} /> : <AdminLogin />; }
