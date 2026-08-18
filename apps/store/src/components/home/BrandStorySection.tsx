import React from 'react';

const JOURNEY_STEPS = ['Família', 'Jiu-Jitsu', 'João', 'Alta Performance', 'Superação', 'Decisão', 'STYFLA'];

export function BrandStorySection() {
  return (
    <section className="py-20 px-6 border-t border-white/10 bg-zinc-950" id="historia">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-1">
            DE ONDE VIEMOS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            A História por Trás da STYFLA
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p>
            A STYFLA nasceu dentro de uma família que vive o Jiu-Jitsu. A trajetória de{' '}
            <strong className="text-white">João FlashBoy</strong>, com treinos intensos, competições,
            viagens, conquistas e derrotas, foi construída ao lado dos pais, presentes em cada decisão e
            cada desafio do caminho.
          </p>
          <p>
            Dessa vivência nasceu um conceito simples: antes de toda vitória existe uma decisão. E essa
            decisão é continuar. Continuar treinando, aprendendo, competindo, evoluindo, mesmo quando o
            processo exige mais.
          </p>
          <p className="text-white font-bold">
            Foi desse conceito que nasceu a STYFLA. Não em uma agência. Em uma trajetória real.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {JOURNEY_STEPS.map((step, i) => (
            <React.Fragment key={step}>
              <span className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-black border border-white/15 text-zinc-300">
                {step}
              </span>
              {i < JOURNEY_STEPS.length - 1 && <span className="text-zinc-700">&rarr;</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
