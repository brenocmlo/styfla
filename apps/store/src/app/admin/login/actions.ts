'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, isValidAdminPassword } from '@/lib/adminAuth';

export async function loginAdmin(_prevState: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (!password || !isValidAdminPassword(password)) {
    return { error: 'Senha incorreta.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin');
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect('/admin/login');
}
