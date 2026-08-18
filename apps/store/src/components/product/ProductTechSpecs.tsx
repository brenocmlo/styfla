import { Flame, Check } from 'lucide-react';
import type { ProductDetail } from '@/lib/products';

interface ProductTechSpecsProps {
  techSpecs: ProductDetail['techSpecs'];
  features: string[];
}

export function ProductTechSpecs({ techSpecs, features }: ProductTechSpecsProps) {
  return (
    <section className="mt-16 pt-12 border-t border-white/10 space-y-8">
      <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
        <Flame className="w-5 h-5 text-white" /> Especificações Técnicas da Armadura
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
          <h3 className="text-xs font-black uppercase text-white tracking-widest">Ficha de Materiais</h3>
          <dl className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-zinc-400">Composição do Tecido:</dt>
              <dd className="font-bold text-white">{techSpecs.composition}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-zinc-400">Gramatura / Densidade:</dt>
              <dd className="font-bold text-white font-mono">{techSpecs.weight}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-zinc-400">Fator de Proteção Solar:</dt>
              <dd className="font-bold text-white font-mono">{techSpecs.uvProtection}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-zinc-400">Tipo de Costura:</dt>
              <dd className="font-bold text-white">{techSpecs.seams}</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-zinc-400">Regras IBJJF / CBJJ:</dt>
              <dd className="font-bold text-white">{techSpecs.ibjjfStatus}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-400 shrink-0">Cuidados:</dt>
              <dd className="font-bold text-white text-right">{techSpecs.care}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6 bg-zinc-950 border border-white/10 space-y-4">
          <h3 className="text-xs font-black uppercase text-white tracking-widest">Diferenciais de Performance</h3>
          <ul className="space-y-2.5 text-xs text-zinc-300">
            {features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
