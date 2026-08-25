'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@styfla/ui';

gsap.registerPlugin(ScrollTrigger);

export function FlashboyLegacySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const scrollTrigger = {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        };
        gsap.from('.flashboy-text', { opacity: 0, y: 24, duration: 0.6, ease: 'power2.out', scrollTrigger });
        gsap.from('.flashboy-photo', { opacity: 0, scale: 1.08, duration: 0.7, ease: 'power2.out', scrollTrigger });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 px-6 border-t border-white/10" id="flashboy">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 p-10 bg-zinc-950 border border-white/15">
        <div className="flashboy-text space-y-4 max-w-lg">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-bold block">
            ATLETA &bull; FUNDADOR &bull; INSPIRAÇÃO
          </span>
          <div className="py-2">
            <img
              src="/brand/joao-flashboy.png"
              alt="JOAO FLASHBOY"
              className="h-14 sm:h-20 w-auto object-contain"
            />
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            Antes de fundador, João foi atleta. Anos de treinos intensos, competições e viagens construíram
            uma rotina real de alto rendimento, vivida ao lado da família em cada vitória, cada derrota e
            cada desafio do caminho.
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-normal">
            A STYFLA nasceu dessa trajetória. A linha assinatura carrega a mesma modelagem, identidade e
            mentalidade que movem João todos os dias: a decisão de continuar. Sua filosofia pode ser vivida
            por qualquer atleta disposto a evoluir.
          </p>
          <div className="pt-2">
            <a href="#rash-guards">
              <Button variant="primary" size="md" className="tracking-wider text-xs">
                Garantir Edição Limitada
              </Button>
            </a>
          </div>
        </div>

        <div className="flashboy-photo relative aspect-[3/4] w-64 md:w-80 bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=85"
            alt="João Flashboy"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-[11px] font-mono font-black uppercase text-white tracking-widest block">
              SPEED &amp; POWER &bull; NO-GI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
