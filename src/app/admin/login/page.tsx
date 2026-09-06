'use client';

import { useActionState } from 'react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import { loginAdmin } from './actions';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, undefined);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#000000] text-white px-4 py-8 relative overflow-hidden">
      {/* Símbolo do Raio decorativo de fundo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <img src="/brand/symbol.png" alt="" className="w-[500px] h-[500px] object-contain" />
      </div>

      <div className="w-full max-w-sm space-y-6 bg-zinc-950 border border-white/20 p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Brand Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center gap-2">
            <img src="/brand/symbol.png" alt="STYFLA" className="h-8 w-auto object-contain" />
            <span className="font-heading text-2xl tracking-wider text-white">
              STYFLA<TrademarkBadge className="text-white" />
            </span>
          </div>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest text-white">
              PAINEL DE EXPEDIÇÃO & ADMIN
            </h1>
            <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
              Autenticação com chave HMAC de segurança
            </p>
          </div>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-white" /> Senha Administrativa *
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
              />
            </div>
          </div>

          {state?.error && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium animate-fadeIn">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full h-11 text-xs font-black uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 font-mono shadow-lg"
          >
            {isPending ? 'Validando...' : 'Acessar Painel'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 text-center text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-white" /> Acesso protegido &bull; Sessão ativa por 8h
        </div>
      </div>
    </div>
  );
}
