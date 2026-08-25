import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'styfla_admin_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      'ADMIN_SESSION_SECRET não está configurada. Defina essa variável de ambiente para habilitar o login do admin.'
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const signature = sign(String(expiresAt));
  return `${expiresAt}.${signature}`;
}

export function isValidAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split('.');
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  return safeEqual(sign(expiresAtRaw), signature);
}

export function isValidAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      'ADMIN_PASSWORD não está configurada. Defina essa variável de ambiente para habilitar o login do admin.'
    );
  }
  // Hash both sides first so the comparison is constant-time regardless of input length.
  const expectedHash = createHmac('sha256', getSessionSecret()).update(expected).digest();
  const givenHash = createHmac('sha256', getSessionSecret()).update(password).digest();
  return timingSafeEqual(expectedHash, givenHash);
}
