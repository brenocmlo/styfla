'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Badge } from '@styfla/ui';
import { PRODUCTS_DATA, type ProductDetail } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ShoppingBag } from 'lucide-react';

export function RashGuardsSection() {
  const { addItem, openCart } = useCart();
  const [selectedRankFilter, setSelectedRankFilter] = useState<string>('ALL');
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.08, start: 'top 90%' });

  const filteredProducts =
    selectedRankFilter === 'ALL'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.ibjjfRank === selectedRankFilter);

  const handleQuickAdd = (product: ProductDetail, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariant = product.variants[0];
    addItem({
      variantId: defaultVariant.id,
      productId: product.id,
      title: product.name,
      size: defaultVariant.size,
      price: product.price,
      pixPrice: product.pixPrice,
      imageUrl: product.images[0],
      ibjjfRank: product.ibjjfRank === 'default' ? 'NONE' : 'BLACK',
      quantity: 1,
    });
    openCart();
  };

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto" id="rash-guards">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-1">
            CATÁLOGO OFICIAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Rash Guards
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-bold uppercase text-zinc-400 mr-2 tracking-wider">Filtrar Faixa:</span>
          <button
            onClick={() => setSelectedRankFilter('ALL')}
            className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer border ${
              selectedRankFilter === 'ALL'
                ? 'bg-white text-black border-white'
                : 'bg-black text-zinc-400 border-white/10 hover:border-white/40 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button onClick={() => setSelectedRankFilter('white-belt')} className="cursor-pointer">
            <Badge variant="white-belt">Branca</Badge>
          </button>
          <button onClick={() => setSelectedRankFilter('blue-belt')} className="cursor-pointer">
            <Badge variant="blue-belt">Azul</Badge>
          </button>
          <button onClick={() => setSelectedRankFilter('purple-belt')} className="cursor-pointer">
            <Badge variant="purple-belt">Roxa</Badge>
          </button>
          <button onClick={() => setSelectedRankFilter('brown-belt')} className="cursor-pointer">
            <Badge variant="brown-belt">Marrom</Badge>
          </button>
          <button onClick={() => setSelectedRankFilter('black-belt')} className="cursor-pointer">
            <Badge variant="black-belt">Preta</Badge>
          </button>
        </div>
      </div>

      <div className="max-w-2xl space-y-2 text-zinc-400 text-sm leading-relaxed mb-10">
        <p>
          Rash guards forjadas em poliamida de alta densidade, com costura flatlock quádrupla anti-rasgo e fita de silicone antiderrapante na cintura. Pensadas para o treino de alta intensidade e para a pressão real da competição.
        </p>
        <p>
          Mais do que uma peça bonita, é o equipamento de quem decide treinar todos os dias. Você veste STYFLA porque faz parte desse estilo de vida.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/produto/${product.slug}`}
            className="group bg-zinc-950 border border-white/10 hover:border-white/40 transition-all duration-200 overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[4/5] bg-black overflow-hidden border-b border-white/10">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <Badge variant="white">IBJJF APPROVED</Badge>
                <Badge variant={product.ibjjfRank}>{product.ibjjfText}</Badge>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  {product.category}
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-zinc-300 transition-colors line-clamp-1 mt-0.5">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Tam:</span>
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="px-2 py-0.5 text-[10px] font-mono font-bold bg-black text-zinc-300 border border-white/10"
                  >
                    {v.size}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-white font-mono">
                    R$ {product.pixPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-zinc-400">no PIX</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">
                  ou R$ {product.price.toFixed(2).replace('.', ',')} em 3x
                </span>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => handleQuickAdd(product, e)}
                  className="w-full mt-3 flex items-center justify-center gap-1.5 py-3 tracking-wider text-xs font-black"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Adicionar à Sacola
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
