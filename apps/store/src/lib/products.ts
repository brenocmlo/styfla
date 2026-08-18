export interface ProductDetail {
  id: string;
  slug: string;
  name: string;
  category: string;
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
    size: 'PP' | 'P' | 'M' | 'G' | 'GG' | '2XG';
    stock: number;
  }>;
}

export const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: '1',
    slug: 'rash-guard-stealth-2-0',
    name: 'Rash Guard Stealth 2.0 (No-Gi Pro)',
    category: 'Competição No-Gi',
    price: 219.9,
    pixPrice: 197.91,
    description:
      'A Rash Guard Stealth 2.0 foi forjada para treinos de alta intensidade e campeonatos sem quimono. Desenvolvida com tecido de compressão multidirecional que melhora a circulação muscular e reduz a fadiga durante o rola. Possui acabamento em fita de silicone na barra interna que impede que a peça suba.',
    features: [
      'Grip de silicone emborrachado na cintura (não sobe no rola)',
      'Costura Flatlock 4 fios reforçada com fio texturizado',
      'Estampa por sublimação digital de alta definição (não desbota)',
      'Tecido antibacteriano e de secagem ultra-rápida',
      'Modelagem anatômica com recorte raglan para máxima mobilidade de ombros',
    ],
    techSpecs: {
      composition: '85% Poliamida de Alta Densidade / 15% Elastano Premium',
      weight: '260 g/m² (Gramatura Pesada anti-transparência)',
      uvProtection: 'Fator FPU 50+ Certificado',
      seams: 'Ponto Flatlock Quádruplo Reforçado',
      ibjjfStatus: '100% Homologada para Competições IBJJF / CBJJ',
      care: 'Lavar à mão ou máquina (ciclo delicado) em água fria. Não usar alvejante. Secar à sombra.',
    },
    ibjjfRank: 'black-belt',
    ibjjfText: 'Faixa Preta',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&auto=format&fit=crop&q=85',
    ],
    variants: [
      { id: 'v1-pp', size: 'PP', stock: 3 },
      { id: 'v1-p', size: 'P', stock: 12 },
      { id: 'v1-m', size: 'M', stock: 24 },
      { id: 'v1-g', size: 'G', stock: 18 },
      { id: 'v1-gg', size: 'GG', stock: 9 },
      { id: 'v1-2xg', size: '2XG', stock: 4 },
    ],
  },
  {
    id: '2',
    slug: 'rash-guard-ranked-blue',
    name: 'Rash Guard Ranked IBJJF (Faixa Azul)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    description:
      'Projetada rigorosamente de acordo com as regras de vestimenta da IBJJF e CBJJ. Contém mais de 10% da cor oficial da faixa azul com design moderno e anatômico.',
    features: [
      'Padrão oficial de cores de graduação IBJJF',
      'Tecnologia térmica Dry-Fit para dissipação de calor',
      'Barra elástica com grip antiderrapante',
      'Proteção contra queimaduras de tatame',
    ],
    techSpecs: {
      composition: '84% Poliamida / 16% Elastano',
      weight: '250 g/m²',
      uvProtection: 'Fator FPU 50+',
      seams: 'Flatlock Reforçado',
      ibjjfStatus: 'IBJJF Approved - Faixa Azul',
      care: 'Lavar à mão ou máquina (ciclo delicado) em água fria. Não usar alvejante. Secar à sombra.',
    },
    ibjjfRank: 'blue-belt',
    ibjjfText: 'Faixa Azul',
    images: [
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=85',
    ],
    variants: [
      { id: 'v2-p', size: 'P', stock: 10 },
      { id: 'v2-m', size: 'M', stock: 15 },
      { id: 'v2-g', size: 'G', stock: 12 },
      { id: 'v2-gg', size: 'GG', stock: 7 },
    ],
  },
  {
    id: '3',
    slug: 'rash-guard-ranked-purple',
    name: 'Rash Guard Ranked IBJJF (Faixa Roxa)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    description:
      'Equipamento de elite para atletas graduados com a faixa roxa. Alta durabilidade e caimento impecável no corpo.',
    features: [
      'Aprovada em checagens de tatame de torneios internacionais',
      'Costura quádrupla anti-desfiamento',
      'Silicone grip integrado',
    ],
    techSpecs: {
      composition: '84% Poliamida / 16% Elastano',
      weight: '250 g/m²',
      uvProtection: 'Fator FPU 50+',
      seams: 'Flatlock Reforçado',
      ibjjfStatus: 'IBJJF Approved - Faixa Roxa',
      care: 'Lavar à mão ou máquina (ciclo delicado) em água fria. Não usar alvejante. Secar à sombra.',
    },
    ibjjfRank: 'purple-belt',
    ibjjfText: 'Faixa Roxa',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&auto=format&fit=crop&q=85',
    ],
    variants: [
      { id: 'v3-m', size: 'M', stock: 8 },
      { id: 'v3-g', size: 'G', stock: 14 },
      { id: 'v3-gg', size: 'GG', stock: 6 },
    ],
  },
  {
    id: '4',
    slug: 'rash-guard-ranked-brown',
    name: 'Rash Guard Ranked IBJJF (Faixa Marrom)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    description:
      'Rash guard oficial para a graduação marrom. Combina elegância rústica com tecnologia têxtil de ponta.',
    features: [
      'Conformidade estrita de cor marrom IBJJF',
      'Tecido denso com efeito de compressão vascular',
      'Grip emborrachado na barra',
    ],
    techSpecs: {
      composition: '84% Poliamida / 16% Elastano',
      weight: '250 g/m²',
      uvProtection: 'Fator FPU 50+',
      seams: 'Flatlock Reforçado',
      ibjjfStatus: 'IBJJF Approved - Faixa Marrom',
      care: 'Lavar à mão ou máquina (ciclo delicado) em água fria. Não usar alvejante. Secar à sombra.',
    },
    ibjjfRank: 'brown-belt',
    ibjjfText: 'Faixa Marrom',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=85',
    ],
    variants: [
      { id: 'v4-p', size: 'P', stock: 4 },
      { id: 'v4-m', size: 'M', stock: 9 },
      { id: 'v4-g', size: 'G', stock: 11 },
    ],
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return PRODUCTS_DATA.find((p) => p.slug === slug);
}
