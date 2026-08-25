'use client';

import { Badge } from '@styfla/ui';
import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function KimonosTeaserSection() {
  const containerRef = useScrollReveal<HTMLDivElement>({ y: 16, stagger: 0.1 });

  return (
    <section className="py-20 px-6 border-t border-white/10" id="kimonos">
      <div ref={containerRef} className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-1">
              PRÓXIMO LANÇAMENTO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Kimonos
            </h2>
          </div>
          <Badge variant="white">Em Breve</Badge>
        </div>

        <div className="relative bg-zinc-950 border border-white/15 p-10 sm:p-16 flex flex-col items-center text-center gap-5 overflow-hidden">
          <img
            src="/brand/symbol.png"
            alt=""
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 w-64 h-64 object-contain opacity-[0.04] pointer-events-none"
          />
          <span className="text-[11px] font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">
            STYFLA // ORIGIN_001
          </span>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white max-w-lg">
            O primeiro kimono da armadura STYFLA
          </h3>
          <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
            Representa a origem da marca. Modelagem premium e identidade forjada para alta performance, em desenvolvimento para os atletas que decidem continuar.
          </p>
          <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
            As rash guards seguem como prioridade de lançamento, mas o kimono já faz parte da família STYFLA desde o início.
          </p>
          <a
            href="https://instagram.com/styfla.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black uppercase tracking-widest text-white underline hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Acompanhe o lançamento no Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
