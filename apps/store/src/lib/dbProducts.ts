import { prisma } from '@styfla/database';
import { PRODUCTS_DATA, type ProductDetail } from './products';

/**
 * Busca todos os produtos diretamente do banco PostgreSQL via Prisma.
 * Caso o banco esteja indisponível em dev/build estático, utiliza a lista estática como fallback.
 */
export async function getProductsList(): Promise<ProductDetail[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        variants: { orderBy: { size: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!products || products.length === 0) {
      return PRODUCTS_DATA;
    }

    return products.map((p) => {
      const isBlue = p.name.toLowerCase().includes('blue') || p.name.toLowerCase().includes('azul');

      return {
        id: p.id,
        slug: p.slug,
        name: p.name,
        category: p.category.name,
        color: isBlue ? 'AZUL' : 'PRETO',
        price: Number(p.price),
        pixPrice: Number(p.pixPrice),
        description: p.description,
        features: [
          'Grip de silicone emborrachado na cintura (não sobe no rola)',
          'Costura Flatlock 4 fios reforçada com fio texturizado',
          'Estampa por sublimação digital de alta definição (não desbota)',
          'Tecido antibacteriano e de secagem ultra-rápida',
        ],
        techSpecs: {
          composition: '85% Poliamida / 15% Elastano Premium',
          weight: '260 g/m² (Gramatura Pesada anti-transparência)',
          uvProtection: 'Fator FPU 50+ Certificado',
          seams: 'Ponto Flatlock Quádruplo Reforçado',
          ibjjfStatus: p.isIbjjfLegal ? '100% Homologada IBJJF / CBJJ' : 'Uso Treino',
          care: 'Lavar à mão ou máquina em água fria. Secar à sombra.',
        },
        ibjjfRank: 'default',
        ibjjfText: isBlue ? 'Coleção Azul' : 'Coleção Preta',
        images: p.images.length > 0 ? p.images.map((img) => img.url) : ['/products/rash-guard-preta-frente.jpg'],
        variants: p.variants.map((v) => ({
          id: v.id,
          size: v.size as any,
          stock: v.stock,
        })),
      };
    });
  } catch (error) {
    console.warn('⚠️ Falha ao conectar ao banco de dados PostgreSQL, utilizando dados locais de fallback:', error);
    return PRODUCTS_DATA;
  }
}

/**
 * Busca um único produto por slug.
 */
export async function getProductBySlugDb(slug: string): Promise<ProductDetail | undefined> {
  const products = await getProductsList();
  return products.find((p) => p.slug === slug);
}
