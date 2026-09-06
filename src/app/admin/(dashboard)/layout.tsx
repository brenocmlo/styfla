import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, isValidAdminSessionToken } from '@/lib/adminAuth';
import { AdminShell } from '@/components/admin/AdminShell';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSessionToken(token)) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
