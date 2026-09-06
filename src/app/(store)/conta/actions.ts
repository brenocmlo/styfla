'use server';

import { prisma, Role } from '@/lib/db';
import { hashPassword, verifyPassword, setCustomerSession, deleteCustomerSession, getCustomerSession } from '@/lib/customerAuth';
import { revalidatePath } from 'next/cache';

export async function loginCustomerAction(_prevState: any, formData: FormData) {
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Informe o e-mail e a senha cadastrados.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return { error: 'E-mail ou senha incorretos. Verifique suas credenciais.' };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { error: 'E-mail ou senha incorretos. Verifique suas credenciais.' };
    }

    await setCustomerSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'CUSTOMER' | 'ADMIN',
    });

    revalidatePath('/conta');
    return { success: true };
  } catch (error) {
    console.error('Erro no login do cliente:', error);
    return { error: 'Não foi possível realizar o login. Tente novamente.' };
  }
}

export async function registerCustomerAction(_prevState: any, formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const cpf = formData.get('cpf')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();
  const password = formData.get('password')?.toString();

  if (!name || !email || !password) {
    return { error: 'Preencha todos os campos obrigatórios.' };
  }

  if (password.length < 6) {
    return { error: 'A senha deve conter no mínimo 6 caracteres.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: 'Já existe uma conta vinculada a este e-mail.' };
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        cpf: cpf || null,
        phone: phone || null,
        passwordHash,
        role: Role.CUSTOMER,
      },
    });

    await setCustomerSession({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as 'CUSTOMER' | 'ADMIN',
    });

    revalidatePath('/conta');
    return { success: true };
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    return { error: 'Ocorreu um erro ao criar seu cadastro. Verifique os dados.' };
  }
}

export async function logoutCustomerAction() {
  await deleteCustomerSession();
  revalidatePath('/conta');
  return { success: true };
}

export async function updateCustomerProfileAction(_prevState: any, formData: FormData) {
  const session = await getCustomerSession();
  if (!session) {
    return { error: 'Sessão expirada. Faça login novamente.' };
  }

  const name = formData.get('name')?.toString().trim();
  const phone = formData.get('phone')?.toString().trim();

  if (!name) {
    return { error: 'O nome não pode ficar em branco.' };
  }

  try {
    await prisma.user.update({
      where: { id: session.id },
      data: { name, phone },
    });

    revalidatePath('/conta');
    return { success: true, message: 'Dados atualizados com sucesso!' };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return { error: 'Não foi possível atualizar os dados.' };
  }
}
