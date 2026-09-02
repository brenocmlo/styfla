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
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>('ALL');
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.08, start: 'top 90%' });

  const filteredProducts =
    selectedColorFilter === 'ALL'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.color === selectedColorFilter || p.category === selectedColorFilter);

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
      ibjjfRank: 'NONE',
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
            Coleções Preto & Azul
          </h2>
        </div>

        {/* Filtros de Cor e Categoria sem dependência de faixa */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-bold uppercase text-zinc-400 mr-2 tracking-wider">Filtrar:</span>
          <button
            onClick={() => setSelectedColorFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border ${
              selectedColorFilter === 'ALL'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black text-zinc-400 border-white/15 hover:border-white/40 hover:text-white'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedColorFilter('PRETO')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border ${
              selectedColorFilter === 'PRETO'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black text-zinc-400 border-white/15 hover:border-white/40 hover:text-white'
            }`}
          >
            Coleção Preta
          </button>
          <button
            onClick={() => setSelectedColorFilter('AZUL')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border ${
              selectedColorFilter === 'AZUL'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black text-zinc-400 border-white/15 hover:border-white/40 hover:text-white'
            }`}
          >
            Coleção Azul
          </button>
          <button
            onClick={() => setSelectedColorFilter('Conjuntos')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer border ${
              selectedColorFilter === 'Conjuntos'
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-black text-zinc-400 border-white/15 hover:border-white/40 hover:text-white'
            }`}
          >
            Conjuntos
          </button>
        </div>
      </div>

      <div className="max-w-2xl space-y-2 text-zinc-400 text-sm leading-relaxed mb-10">
        <p>
          Armaduras técnicas forjadas em poliamida de alta densidade nas cores Preto Profundo e Azul Cobalto. Com costura flatlock quádrupla anti-rasgo e fita de silicone antiderrapante na cintura.
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
                <Badge variant="white">NO-GI PERFORMANCE</Badge>
                <Badge variant="outline" className="bg-black/80 backdrop-blur-sm text-white">
                  {product.ibjjfText}
                </Badge>
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

              <div className="flex flex-wrap items-center gap-1 pt-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Tam:</span>
                {product.variants.map((v) => (
                  <span
                    key={v.id}
                    className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-black text-zinc-300 border border-white/10"
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
