import { Truck, Zap } from 'lucide-react';

export function PromoBar() {
  return (
    <div className="bg-[#080808] border-b border-white/10 py-2 px-4 text-center text-xs tracking-wider text-zinc-300 flex items-center justify-center gap-4">
      <span className="flex items-center gap-1.5 font-bold uppercase text-[11px]">
        <Truck className="w-3.5 h-3.5 text-white" /> FRETE GRÁTIS ACIMA DE R$ 299 &bull; ENVIOS PARA TODO BRASIL
      </span>
      <span className="hidden sm:inline text-zinc-700">/</span>
      <span className="hidden sm:flex items-center gap-1 text-white font-bold uppercase text-[11px]">
        <Zap className="w-3.5 h-3.5" /> 10% OFF NO PIX
      </span>
    </div>
  );
}
