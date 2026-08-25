'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
          },
        });

        tl.from('.philosophy-headline', { opacity: 0, y: 40, scale: 0.9, duration: 1 })
          .from('.philosophy-subhead', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
          .from('.philosophy-quote', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2');
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="min-h-[80vh] flex items-center justify-center py-28 px-6 border-t border-white/10 bg-black text-center"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="philosophy-headline text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Decida Continuar.
        </h2>
        <p className="philosophy-subhead text-sm sm:text-base text-zinc-400 uppercase tracking-[0.2em] font-bold">
          Uma decisão. Todos os dias.
        </p>
        <p className="philosophy-quote max-w-xl mx-auto text-zinc-300 text-base sm:text-lg leading-relaxed pt-6 border-t border-white/10">
          Todo campeão toma uma decisão antes da vitória.
          <br />
          <span className="text-white font-bold">A decisão de continuar.</span>
        </p>
      </div>
    </section>
  );
}
