import {
  PrismaClient,
  Prisma,
  Role,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  IbjjfRank,
} from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export {
  PrismaClient,
  Prisma,
  Role,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  IbjjfRank,
};
export type * from '@prisma/client';

