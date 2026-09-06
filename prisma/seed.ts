import { PrismaClient, IbjjfRank, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeding do banco de dados STYFLA (Coleções Preto & Azul)...');

  // 1. Limpeza de dados antigos
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();

  // Hashes de senha
  const adminPasswordHash = await bcrypt.hash('admin', 10);
  const testerPasswordHash = await bcrypt.hash('tester123', 10);

  // 2. Usuários
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador STYFLA',
      email: 'admin@styfla.com.br',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      cpf: '000.000.000-00',
      phone: '(11) 99999-0000',
    },
  });

  const testerUser = await prisma.user.create({
    data: {
      name: 'Atleta Tester STYFLA',
      email: 'tester@styfla.com.br',
      passwordHash: testerPasswordHash,
      role: Role.CUSTOMER,
      cpf: '987.654.321-11',
      phone: '(11) 97777-8888',
      addresses: {
        create: [
          {
            title: 'Endereço Principal',
            recipient: 'Atleta Tester STYFLA',
            street: 'Rua dos Atletas',
            number: '100',
            complement: 'Bloco A',
            neighborhood: 'Jardins',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01410-000',
            isDefault: true,
          },
        ],
      },
    },
  });

  // 3. Categorias Principais
  const catRashGuards = await prisma.category.create({
    data: {
      name: 'Rash Guards',
      slug: 'rash-guards',
      description: 'Rash guards técnicas de alta compressão em Poliamida Premium.',
    },
  });

  const catConjuntos = await prisma.category.create({
    data: {
      name: 'Conjuntos',
      slug: 'conjuntos',
      description: 'Combos completos de Rash Guard + Fight Shorts.',
    },
  });

  const catShorts = await prisma.category.create({
    data: {
      name: 'Shorts',
      slug: 'shorts',
      description: 'Fight shorts ultraleves com fenda lateral flexível.',
    },
  });

  const catKimonos = await prisma.category.create({
    data: {
      name: 'Kimonos',
      slug: 'kimonos',
      description: 'Kimonos trançados de alta densidade da linha ORIGIN.',
    },
  });

  // 4. Produtos e Variantes (Preto & Azul)

  // P1: Rash Guard Stealth Black
  const p1 = await prisma.product.create({
    data: {
      name: 'Rash Guard Stealth Black (No-Gi Pro)',
      slug: 'rash-guard-stealth-2-0',
      description:
        'A Rash Guard Stealth Black foi forjada em poliamida pesada de alta densidade para treinos de alta intensidade e competições sem quimono. Possui estampa em preto fosco de alta definição e fita de silicone na barra interna.',
      details: 'Composição: 85% Poliamida / 15% Elastano. Gramatura: 260 g/m². FPU 50+.',
      categoryId: catRashGuards.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 219.90,
      pixPrice: 197.91,
      images: {
        create: [
          { url: '/products/rash-guard-preta-frente.jpg', alt: 'Rash Guard Stealth Black Frente', order: 1 },
          { url: '/products/rash-guard-preta-costas.jpg', alt: 'Rash Guard Stealth Black Costas', order: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-RG-BLK-PP', size: 'PP', stock: 3, weightG: 260, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLK-P',  size: 'P',  stock: 12, weightG: 260, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLK-M',  size: 'M',  stock: 24, weightG: 270, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLK-G',  size: 'G',  stock: 18, weightG: 280, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLK-GG', size: 'GG', stock: 9,  weightG: 290, heightCm: 3, widthCm: 20, lengthCm: 25 },
        ],
      },
    },
  });

  // P2: Rash Guard Velocity Blue
  const p2 = await prisma.product.create({
    data: {
      name: 'Rash Guard Velocity Blue (No-Gi Pro)',
      slug: 'rash-guard-ranked-blue',
      description:
        'A Rash Guard Velocity Blue traz a vivacidade do azul cobalto combinada à máxima compressão vascular. Desenvolvida para atletas que buscam alta performance, proteção térmica e estilo marcante.',
      details: 'Composição: 85% Poliamida / 15% Elastano. Gramatura: 260 g/m². FPU 50+.',
      categoryId: catRashGuards.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 219.90,
      pixPrice: 197.91,
      images: {
        create: [
          { url: '/products/rash-guard-azul-frente.jpg', alt: 'Rash Guard Velocity Blue Frente', order: 1 },
          { url: '/products/rash-guard-azul-costas.jpg', alt: 'Rash Guard Velocity Blue Costas', order: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-RG-BLU-P',  size: 'P',  stock: 10, weightG: 250, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLU-M',  size: 'M',  stock: 15, weightG: 260, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLU-G',  size: 'G',  stock: 12, weightG: 270, heightCm: 3, widthCm: 20, lengthCm: 25 },
          { sku: 'STY-RG-BLU-GG', size: 'GG', stock: 7,  weightG: 280, heightCm: 3, widthCm: 20, lengthCm: 25 },
        ],
      },
    },
  });

  // P3: Conjunto Stealth Black
  const p3 = await prisma.product.create({
    data: {
      name: 'Conjunto No-Gi Stealth Black (Rash + Short)',
      slug: 'conjunto-stealth-black',
      description:
        'Combo completo de alta performance composto pela Rash Guard Stealth Black e pelo Fight Short STYFLA Preto.',
      details: 'Incluso: Rash Guard + Short. Poliamida + Poliéster Flex.',
      categoryId: catConjuntos.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 359.90,
      pixPrice: 323.91,
      images: {
        create: [
          { url: '/products/rash-guard-preta-frente.jpg', alt: 'Conjunto Stealth Black', order: 1 },
          { url: '/products/short-preto.jpg', alt: 'Short STYFLA Preto', order: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-CJ-BLK-P',  size: 'P',  stock: 8,  weightG: 440, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLK-M',  size: 'M',  stock: 14, weightG: 450, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLK-G',  size: 'G',  stock: 10, weightG: 460, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLK-GG', size: 'GG', stock: 5,  weightG: 470, heightCm: 5, widthCm: 25, lengthCm: 30 },
        ],
      },
    },
  });

  // P4: Conjunto Velocity Blue
  const p4 = await prisma.product.create({
    data: {
      name: 'Conjunto No-Gi Velocity Blue (Rash + Short)',
      slug: 'conjunto-velocity-blue',
      description:
        'Combo completo No-Gi composto pela Rash Guard Velocity Blue e pelo Fight Short STYFLA Branco/Azul.',
      details: 'Incluso: Rash Guard + Short. Poliamida + Poliéster Flex.',
      categoryId: catConjuntos.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 359.90,
      pixPrice: 323.91,
      images: {
        create: [
          { url: '/products/rash-guard-azul-frente.jpg', alt: 'Conjunto Velocity Blue', order: 1 },
          { url: '/products/short-branco-frente.jpg', alt: 'Short STYFLA Branco/Azul', order: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-CJ-BLU-P',  size: 'P',  stock: 6,  weightG: 440, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLU-M',  size: 'M',  stock: 11, weightG: 450, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLU-G',  size: 'G',  stock: 9,  weightG: 460, heightCm: 5, widthCm: 25, lengthCm: 30 },
          { sku: 'STY-CJ-BLU-GG', size: 'GG', stock: 4,  weightG: 470, heightCm: 5, widthCm: 25, lengthCm: 30 },
        ],
      },
    },
  });

  // P5: Short STYFLA Preto
  const p5 = await prisma.product.create({
    data: {
      name: 'Short STYFLA Preto (Fight Shorts)',
      slug: 'short-styfla-preto',
      description:
        'Short de treino em preto com faixa lateral branca e cintura elástica ajustável.',
      details: 'Composição: 90% Poliéster / 10% Elastano. Fenda lateral dupla.',
      categoryId: catShorts.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 179.90,
      pixPrice: 161.91,
      images: {
        create: [
          { url: '/products/short-preto.jpg', alt: 'Short STYFLA Preto', order: 1 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-SH-BLK-P',  size: 'P',  stock: 10, weightG: 180, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-BLK-M',  size: 'M',  stock: 16, weightG: 190, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-BLK-G',  size: 'G',  stock: 14, weightG: 200, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-BLK-GG', size: 'GG', stock: 6,  weightG: 210, heightCm: 2, widthCm: 20, lengthCm: 22 },
        ],
      },
    },
  });

  // P6: Short STYFLA Branco/Azul
  const p6 = await prisma.product.create({
    data: {
      name: 'Short STYFLA Branco/Azul (Fight Shorts)',
      slug: 'short-styfla-branco',
      description:
        'Short de treino em branco com faixa lateral azul cobalto e cintura elástica ajustável.',
      details: 'Composição: 90% Poliéster / 10% Elastano.',
      categoryId: catShorts.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 179.90,
      pixPrice: 161.91,
      images: {
        create: [
          { url: '/products/short-branco-frente.jpg', alt: 'Short STYFLA Branco Frente', order: 1 },
          { url: '/products/short-branco-costas.jpg', alt: 'Short STYFLA Branco Costas', order: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-SH-WHT-P',  size: 'P',  stock: 8,  weightG: 180, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-WHT-M',  size: 'M',  stock: 13, weightG: 190, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-WHT-G',  size: 'G',  stock: 10, weightG: 200, heightCm: 2, widthCm: 20, lengthCm: 22 },
          { sku: 'STY-SH-WHT-GG', size: 'GG', stock: 5,  weightG: 210, heightCm: 2, widthCm: 20, lengthCm: 22 },
        ],
      },
    },
  });

  // P7: Kimono ORIGIN_001
  const p7 = await prisma.product.create({
    data: {
      name: 'Kimono STYFLA // ORIGIN_001',
      slug: 'kimono-styfla-origin-001',
      description:
        'O primeiro modelo de kimono da marca. Trançado pesado 450 g/m² com calça em RipStop 10oz reforçado nas joelheiras.',
      details: 'Jacket: Algodão Trançado 450g/m². Pants: RipStop 10oz.',
      categoryId: catKimonos.id,
      ibjjfRank: IbjjfRank.NONE,
      isIbjjfLegal: true,
      isFeatured: true,
      price: 599.90,
      pixPrice: 539.91,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=85', alt: 'Kimono ORIGIN 001', order: 1 },
        ],
      },
      variants: {
        create: [
          { sku: 'STY-KM-ORG-A0', size: 'A0', stock: 5,  weightG: 1400, heightCm: 10, widthCm: 30, lengthCm: 40 },
          { sku: 'STY-KM-ORG-A1', size: 'A1', stock: 12, weightG: 1550, heightCm: 10, widthCm: 30, lengthCm: 40 },
          { sku: 'STY-KM-ORG-A2', size: 'A2', stock: 20, weightG: 1650, heightCm: 10, widthCm: 30, lengthCm: 40 },
          { sku: 'STY-KM-ORG-A3', size: 'A3', stock: 15, weightG: 1800, heightCm: 10, widthCm: 30, lengthCm: 40 },
          { sku: 'STY-KM-ORG-A4', size: 'A4', stock: 6,  weightG: 1950, heightCm: 10, widthCm: 30, lengthCm: 40 },
        ],
      },
    },
  });

  // 5. Cupons
  await prisma.coupon.createMany({
    data: [
      { code: 'STYFLA10', discountPercent: 10, minOrderValue: 100, isActive: true },
      { code: 'DECIDACONTINUAR', discountPercent: 15, minOrderValue: 200, isActive: true },
      { code: 'FRETEGRATIS', discountValue: 0, minOrderValue: 299, isActive: true },
    ],
  });

  console.log('✅ Seeding concluído com produtos Preto & Azul!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
