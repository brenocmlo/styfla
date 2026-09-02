import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@styfla/database';
import crypto from 'crypto';

const CUSTOMER_COOKIE_NAME = 'styfla_customer_session';
const CUSTOMER_SECRET = process.env.CUSTOMER_SESSION_SECRET || 'styfla_customer_dev_secret_key_2026_hmac';

export interface CustomerSessionPayload {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
  exp: number;
}

/**
 * Gera um hash seguro para a senha utilizando bcryptjs.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compara a senha em texto plano com o hash armazenado.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Assina um payload com HMAC SHA-256 para prevenir falsificação de token de sessão.
 */
function signToken(payload: CustomerSessionPayload): string {
  const jsonStr = JSON.stringify(payload);
  const base64Data = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto.createHmac('sha256', CUSTOMER_SECRET).update(base64Data).digest('base64url');
  return `${base64Data}.${signature}`;
}

/**
 * Decodifica e verifica a assinatura HMAC do token de sessão.
 */
function verifyToken(token: string): CustomerSessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [base64Data, signature] = parts;
    const expectedSignature = crypto.createHmac('sha256', CUSTOMER_SECRET).update(base64Data).digest('base64url');
    if (signature !== expectedSignature) return null;
    const jsonStr = Buffer.from(base64Data, 'base64url').toString('utf-8');
    const payload = JSON.parse(jsonStr) as CustomerSessionPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Define o cookie de sessão do cliente (HTTP-only, Secure em produção).
 */
export async function setCustomerSession(user: { id: string; name: string; email: string; role: 'CUSTOMER' | 'ADMIN' }) {
  const cookieStore = await cookies();
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 dias de validade
  const payload: CustomerSessionPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    exp,
  };

  const token = signToken(payload);

  cookieStore.set(CUSTOMER_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(exp),
    path: '/',
  });
}

/**
 * Remove o cookie de sessão do cliente.
 */
export async function deleteCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_COOKIE_NAME);
}

/**
 * Obtém a sessão do cliente autenticado.
 */
export async function getCustomerSession(): Promise<CustomerSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Busca o usuário completo no PostgreSQL com seus endereços e histórico de pedidos.
 */
export async function getAuthenticatedCustomer() {
  const session = await getCustomerSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id },
      include: {
        addresses: { orderBy: { isDefault: 'desc' } },
        orders: {
          include: {
            items: {
              include: {
                variant: {
                  include: {
                    product: {
                      include: {
                        images: { orderBy: { order: 'asc' } },
                      },
                    },
                  },
                },
              },
            },
            payment: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return user;
  } catch (error) {
    console.error('Erro ao carregar atleta do banco PostgreSQL:', error);
    return null;
  }
}
