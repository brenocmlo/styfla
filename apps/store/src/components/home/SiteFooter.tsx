export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-[#050505] py-16 px-6 text-center text-xs text-zinc-500 space-y-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src="/brand/logo.png" alt="STYFLA" className="h-7 w-auto object-contain opacity-90" />
        <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase font-black">
          DECIDA CONTINUAR
        </span>
      </div>
      <p className="max-w-md mx-auto text-zinc-500 text-[11px] leading-relaxed">
        High Performance Jiu-Jitsu. Armaduras para quem vive o tatame. Conformidade com regulamentos oficiais IBJJF / CBJJ.
      </p>
      <p className="text-[10px] text-zinc-600 font-mono pt-4 border-t border-white/5">
        &copy; 2026 STYFLA NO-GI APPAREL. TODOS OS DIREITOS RESERVADOS.
      </p>
    </footer>
  );
}
