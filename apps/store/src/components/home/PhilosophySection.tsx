export function PhilosophySection() {
  return (
    <section className="py-28 px-6 border-t border-white/10 bg-black text-center">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
          Decida Continuar.
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 uppercase tracking-[0.2em] font-bold">
          Uma decisão. Todos os dias.
        </p>
        <p className="max-w-xl mx-auto text-zinc-300 text-base sm:text-lg leading-relaxed pt-6 border-t border-white/10">
          Todo campeão toma uma decisão antes da vitória.
          <br />
          <span className="text-white font-bold">A decisão de continuar.</span>
        </p>
      </div>
    </section>
  );
}
