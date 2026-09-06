'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui';
import { ShieldCheck, Zap, Truck, Flame, ArrowRight, ChevronDown } from 'lucide-react';
import { SHIPPING_POLICY } from '@/lib/policies';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-reveal', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          delay: 0.1,
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 border-b border-white/10 bg-gradient-to-b from-zinc-950 to-[#000000]"
    >
      <div className="max-w-5xl mx-auto text-center space-y-7">
        <div className="hero-reveal inline-flex items-center gap-2 px-3 py-1 bg-black border border-white/20 text-[11px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
          <Flame className="w-3.5 h-3.5 text-white" /> STYFLA &bull; HIGH PERFORMANCE JIU-JITSU
        </div>

        <h1 className="hero-reveal text-4xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
          Decida Continuar.
        </h1>

        <p className="hero-reveal max-w-xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed font-bold uppercase tracking-[0.15em]">
          Uma decisão. Todos os dias.
        </p>

        <div className="hero-reveal flex flex-wrap justify-center gap-4 pt-4">
          <a href="#rash-guards">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              Shop Now <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>

        {/* Quick Pillars */}
        <div className="hero-reveal grid grid-cols-1 sm:grid-cols-3 gap-4 pt-14 text-left">
          <div className="p-5 bg-zinc-950 border border-white/10 hover:border-white/40 transition-colors duration-200 space-y-1">
            <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-wider">
              <ShieldCheck className="w-4 h-4 text-white" /> Regulamento IBJJF
            </div>
            <p className="text-xs text-zinc-400">Áreas e cores de graduação 100% aprovadas para competições oficiais.</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-white/10 hover:border-white/40 transition-colors duration-200 space-y-1">
            <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-wider">
              <Zap className="w-4 h-4 text-white" /> Silicone Grip
            </div>
            <p className="text-xs text-zinc-400">Barra com fita emborrachada interna que não sobe durante o rola.</p>
          </div>
          <div className="p-5 bg-zinc-950 border border-white/10 hover:border-white/40 transition-colors duration-200 space-y-1">
            <div className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-wider">
              <Truck className="w-4 h-4 text-white" /> {SHIPPING_POLICY.dispatchLabel}
            </div>
            <p className="text-xs text-zinc-400">{SHIPPING_POLICY.dispatchDescription}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-14">
        <ChevronDown className="w-5 h-5 text-zinc-600 animate-bounce-subtle" aria-hidden="true" />
      </div>
    </section>
  );
}
