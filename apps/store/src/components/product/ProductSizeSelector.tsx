'use client';

import { Check, Ruler } from 'lucide-react';
import type { ProductDetail } from '@/lib/products';

const SIZE_GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

interface ProductSizeSelectorProps {
  variants: ProductDetail['variants'];
  selectedVariant: ProductDetail['variants'][number];
  onSelectVariant: (variant: ProductDetail['variants'][number]) => void;
  onOpenSizeGuide: () => void;
}

export function ProductSizeSelector({
  variants,
  selectedVariant,
  onSelectVariant,
  onOpenSizeGuide,
}: ProductSizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase text-zinc-300 tracking-wider">
          Selecione o Tamanho:
        </span>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="text-xs font-bold text-white underline flex items-center gap-1 cursor-pointer hover:text-zinc-300"
        >
          <Ruler className="w-3.5 h-3.5" /> Guia de Medidas (Altura × Peso)
        </button>
      </div>

      <div className={`grid ${SIZE_GRID_COLS[variants.length] ?? 'grid-cols-6'} gap-2`}>
        {variants.map((v) => {
          const isSelected = selectedVariant.id === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`py-3 text-xs font-mono font-black uppercase transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-zinc-950 text-zinc-300 border-white/15 hover:border-white/50 hover:bg-zinc-900'
              }`}
            >
              {v.size}
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
        <Check className="w-3.5 h-3.5 text-white" /> Estoque pronto para envio: {selectedVariant.stock} unidades.
      </p>
    </div>
  );
}
