'use client';

import { Zap, ShoppingBag, ShieldCheck, Info } from 'lucide-react';
import { Button } from '@/components/ui';
import type { ProductDetail } from '@/lib/products';
import { ProductSizeSelector } from './ProductSizeSelector';
import { ProductShippingCalculator } from './ProductShippingCalculator';
import { ProductLogistics } from './ProductLogistics';

interface ProductPurchasePanelProps {
  product: ProductDetail;
  selectedVariant: ProductDetail['variants'][number];
  onSelectVariant: (variant: ProductDetail['variants'][number]) => void;
  onOpenSizeGuide: () => void;
  onBuyNow: () => void;
  onAddToCart: () => void;
}

export function ProductPurchasePanel({
  product,
  selectedVariant,
  onSelectVariant,
  onOpenSizeGuide,
  onBuyNow,
  onAddToCart,
}: ProductPurchasePanelProps) {
  return (
    <div className="md:col-span-5 space-y-6">
      <div>
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
          {product.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
          {product.name}
        </h1>
      </div>

      <div className="p-5 bg-zinc-950 border border-white/10 space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-white font-mono">
            R$ {product.pixPrice.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-xs font-bold text-black px-2 py-0.5 bg-white uppercase font-mono">
            10% OFF no PIX
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          ou{' '}
          <strong className="text-white font-mono">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </strong>{' '}
          em até 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros no cartão
        </p>
      </div>

      <ProductSizeSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={onSelectVariant}
        onOpenSizeGuide={onOpenSizeGuide}
      />

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="pix"
          size="lg"
          onClick={onBuyNow}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-black tracking-widest py-4"
        >
          <Zap className="w-4 h-4" /> Comprar Agora com 1-Click PIX
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-2 text-xs font-black tracking-widest py-4"
        >
          <ShoppingBag className="w-4 h-4" /> Adicionar à Sacola
        </Button>
      </div>

      <ProductShippingCalculator />
      <ProductLogistics />

      <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs text-zinc-300">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <span><strong>Costura Flatlock 4 fios:</strong> Não desfia e não incomoda sob atrito direto na pele.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <span><strong>Grip de Silicone na Barra:</strong> Mantém a rash guard no lugar durante as passagens de guarda.</span>
        </div>
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-white shrink-0 mt-0.5" />
          <span><strong>Proteção UV 50+:</strong> Máxima proteção térmica e solar em treinos intensos.</span>
        </div>
      </div>
    </div>
  );
}
