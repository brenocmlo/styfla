export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  category: string;
  color: 'PRETO' | 'AZUL' | 'BRANCO';
  price: number;
  pixPrice: number;
  description: string;
  features: string[];
  techSpecs: {
    composition: string;
    weight: string;
    uvProtection: string;
    seams: string;
    ibjjfStatus: string;
    care: string;
  };
  ibjjfRank: 'white-belt' | 'blue-belt' | 'purple-belt' | 'brown-belt' | 'black-belt' | 'default';
  ibjjfText: string;
  images: string[];
  variants: Array<{
    id: string;
    size: 'PP' | 'P' | 'M' | 'G' | 'GG' | '2XG' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4';
    stock: number;
  }>;
}

export const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: '1',
    slug: 'rash-guard-stealth-2-0',
    name: 'Rash Guard Stealth Black (No-Gi Pro)',
    category: 'Rash Guards',
    color: 'PRETO',
    price: 219.9,
    pixPrice: 197.91,
    description:
      'A Rash Guard Stealth Black foi forjada em poliamida pesada de alta densidade para treinos de alta intensidade e competições sem quimono. Possui estampa em preto fosco de alta definição e fita de silicone na barra interna que impede que a peça suba durante a luta.',
    features: [
      'Grip de silicone emborrachado na cintura (não sobe no rola)',
      'Costura Flatlock 4 fios reforçada com fio texturizado',
      'Estampa por sublimação digital de alta definição em preto profundo',
      'Tecido antibacteriano e de secagem ultra-rápida',
      'Modelagem anatômica com recorte raglan para máxima mobilidade',
    ],
    techSpecs: {
      composition: '85% Poliamida de Alta Densidade / 15% Elastano Premium',
      weight: '260 g/m² (Gramatura Pesada anti-transparência)',
      uvProtection: 'Fator FPU 50+ Certificado',
      seams: 'Ponto Flatlock Quádruplo Reforçado',
      ibjjfStatus: 'Homologada para Competições No-Gi',
      care: 'Lavar à mão ou máquina em água fria. Não usar alvejante. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Coleção Preta',
    images: ['/products/rash-guard-preta-frente.jpg', '/products/rash-guard-preta-costas.jpg'],
    variants: [
      { id: 'v1-pp', size: 'PP', stock: 3 },
      { id: 'v1-p', size: 'P', stock: 12 },
      { id: 'v1-m', size: 'M', stock: 24 },
      { id: 'v1-g', size: 'G', stock: 18 },
      { id: 'v1-gg', size: 'GG', stock: 9 },
      { id: 'v1-2xg', size: '2XG', stock: 0 },
    ],
  },
  {
    id: '2',
    slug: 'rash-guard-ranked-blue',
    name: 'Rash Guard Velocity Blue (No-Gi Pro)',
    category: 'Rash Guards',
    color: 'AZUL',
    price: 219.9,
    pixPrice: 197.91,
    description:
      'A Rash Guard Velocity Blue traz a vivacidade do azul cobalto combinada à máxima compressão vascular. Desenvolvida para atletas que buscam alta performance, proteção térmica e estilo marcante.',
    features: [
      'Azul cobalto intenso por sublimação digital de alta definição',
      'Tecnologia térmica Dry-Fit para dissipação contínua de calor',
      'Barra elástica com grip antiderrapante de silicone',
      'Proteção contra queimaduras de tatame e atrito',
    ],
    techSpecs: {
      composition: '85% Poliamida / 15% Elastano Premium',
      weight: '260 g/m²',
      uvProtection: 'Fator FPU 50+',
      seams: 'Flatlock Reforçado 4 Fios',
      ibjjfStatus: 'Homologada para Competições No-Gi',
      care: 'Lavar à mão ou máquina em água fria. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Coleção Azul',
    images: ['/products/rash-guard-azul-frente.jpg', '/products/rash-guard-azul-costas.jpg'],
    variants: [
      { id: 'v2-p', size: 'P', stock: 10 },
      { id: 'v2-m', size: 'M', stock: 15 },
      { id: 'v2-g', size: 'G', stock: 12 },
      { id: 'v2-gg', size: 'GG', stock: 7 },
    ],
  },
  {
    id: '3',
    slug: 'conjunto-stealth-black',
    name: 'Conjunto No-Gi Stealth Black (Rash + Short)',
    category: 'Conjuntos',
    color: 'PRETO',
    price: 359.9,
    pixPrice: 323.91,
    description:
      'Combo completo de alta performance composto pela Rash Guard Stealth Black e pelo Fight Short STYFLA Preto. Economize no conjunto completo para seus treinos No-Gi.',
    features: [
      'Incluso: 1x Rash Guard Stealth Black + 1x Short STYFLA Preto',
      'Desconto especial de conjunto com 10% no PIX',
      'Tecidos de alta compressão e mobilidade total de quadril',
    ],
    techSpecs: {
      composition: 'Poliamida Premium + Poliéster Flex',
      weight: '440g (Conjunto)',
      uvProtection: 'FPU 50+',
      seams: 'Flatlock Reforçado',
      ibjjfStatus: 'Homologado No-Gi',
      care: 'Lavar em água fria. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Conjunto Preto',
    images: ['/products/rash-guard-preta-frente.jpg', '/products/short-preto.jpg'],
    variants: [
      { id: 'v3-p', size: 'P', stock: 8 },
      { id: 'v3-m', size: 'M', stock: 14 },
      { id: 'v3-g', size: 'G', stock: 10 },
      { id: 'v3-gg', size: 'GG', stock: 5 },
    ],
  },
  {
    id: '4',
    slug: 'conjunto-velocity-blue',
    name: 'Conjunto No-Gi Velocity Blue (Rash + Short)',
    category: 'Conjuntos',
    color: 'AZUL',
    price: 359.9,
    pixPrice: 323.91,
    description:
      'Combo completo No-Gi composto pela Rash Guard Velocity Blue e pelo Fight Short STYFLA Branco/Azul. Conjunto harmonizado em alta definição visual.',
    features: [
      'Incluso: 1x Rash Guard Velocity Blue + 1x Short STYFLA Branco/Azul',
      'Conjunto oficial com desconto exclusivo',
      'Tecnologia de Secagem Rápida e Silicone Grip',
    ],
    techSpecs: {
      composition: 'Poliamida Premium + Poliéster Flex',
      weight: '440g (Conjunto)',
      uvProtection: 'FPU 50+',
      seams: 'Flatlock Reforçado',
      ibjjfStatus: 'Homologado No-Gi',
      care: 'Lavar em água fria. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Conjunto Azul',
    images: ['/products/rash-guard-azul-frente.jpg', '/products/short-branco-frente.jpg'],
    variants: [
      { id: 'v4-p', size: 'P', stock: 6 },
      { id: 'v4-m', size: 'M', stock: 11 },
      { id: 'v4-g', size: 'G', stock: 9 },
      { id: 'v4-gg', size: 'GG', stock: 4 },
    ],
  },
  {
    id: '5',
    slug: 'short-styfla-preto',
    name: 'Short STYFLA Preto (Fight Shorts)',
    category: 'Shorts',
    color: 'PRETO',
    price: 179.9,
    pixPrice: 161.91,
    description:
      'Short de treino em preto com faixa lateral branca e cintura elástica ajustável. Tecido leve e flexível, feito para não travar o quadril em raspagens durante o No-Gi.',
    features: [
      'Cintura elástica com cordão de ajuste interno',
      'Fenda lateral dupla para máxima amplitude de movimento',
      'Tecido leve de secagem rápida',
      'Estampa por sublimação digital em preto profundo',
    ],
    techSpecs: {
      composition: '90% Poliéster / 10% Elastano',
      weight: '180 g/m² (Leve e respirável)',
      uvProtection: 'Fator FPU 40+',
      seams: 'Ponto Reforçado Flatlock',
      ibjjfStatus: 'Aprovado para competições No-Gi (IBJJF/ADCC)',
      care: 'Lavar à mão ou máquina em água fria. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Coleção Preta',
    images: ['/products/short-preto.jpg'],
    variants: [
      { id: 'v5-p', size: 'P', stock: 10 },
      { id: 'v5-m', size: 'M', stock: 16 },
      { id: 'v5-g', size: 'G', stock: 14 },
      { id: 'v5-gg', size: 'GG', stock: 6 },
    ],
  },
  {
    id: '6',
    slug: 'short-styfla-branco',
    name: 'Short STYFLA Branco/Azul (Fight Shorts)',
    category: 'Shorts',
    color: 'AZUL',
    price: 179.9,
    pixPrice: 161.91,
    description:
      'Short de treino em branco com faixa lateral azul cobalto e cintura elástica ajustável. Tecido leve e flexível, feito para não travar o quadril em raspagens durante o No-Gi.',
    features: [
      'Cintura elástica com cordão de ajuste interno',
      'Fenda lateral dupla para máxima amplitude de movimento',
      'Tecido leve de secagem rápida com faixa lateral azul',
    ],
    techSpecs: {
      composition: '90% Poliéster / 10% Elastano',
      weight: '180 g/m²',
      uvProtection: 'Fator FPU 40+',
      seams: 'Ponto Reforçado Flatlock',
      ibjjfStatus: 'Aprovado para competições No-Gi (IBJJF/ADCC)',
      care: 'Lavar à mão ou máquina em água fria. Secar à sombra.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Coleção Azul',
    images: ['/products/short-branco-frente.jpg', '/products/short-branco-costas.jpg'],
    variants: [
      { id: 'v6-p', size: 'P', stock: 8 },
      { id: 'v6-m', size: 'M', stock: 13 },
      { id: 'v6-g', size: 'G', stock: 10 },
      { id: 'v6-gg', size: 'GG', stock: 5 },
    ],
  },
  {
    id: '7',
    slug: 'kimono-styfla-origin-001',
    name: 'Kimono STYFLA // ORIGIN_001',
    category: 'Kimonos',
    color: 'PRETO',
    price: 599.9,
    pixPrice: 539.91,
    description:
      'O primeiro modelo de kimono da marca. Trançado pesado 450 g/m² com calça em RipStop 10oz reforçado nas joelheiras. Etiqueta interna com a mensagem "DECIDA CONTINUAR".',
    features: [
      'Jacket em algodão trançado 450 g/m² de alta resistência',
      'Calça em RipStop 10oz com joelheiras duplas',
      'Etiqueta interna exclusiva "DECIDA CONTINUAR"',
    ],
    techSpecs: {
      composition: '100% Algodão Trançado + Calça RipStop',
      weight: '1.6 kg',
      uvProtection: 'N/A',
      seams: 'Tripla Costura Reforçada',
      ibjjfStatus: 'Conforme com regulamento de Kimonos',
      care: 'Lavar em água fria. Não usar secadora.',
    },
    ibjjfRank: 'default',
    ibjjfText: 'Série Especial',
    images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=85'],
    variants: [
      { id: 'v7-a0', size: 'A0', stock: 5 },
      { id: 'v7-a1', size: 'A1', stock: 12 },
      { id: 'v7-a2', size: 'A2', stock: 20 },
      { id: 'v7-a3', size: 'A3', stock: 15 },
      { id: 'v7-a4', size: 'A4', stock: 6 },
    ],
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCTS_DATA.find((p) => p.slug === slug);
}
