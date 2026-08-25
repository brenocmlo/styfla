'use client';

import { useActionState } from 'react';
import { Lock } from 'lucide-react';
import { loginAdmin } from './actions';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, undefined);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <span className="relative inline-flex">
            <img src="/brand/symbol.png" alt="STYFLA" className="h-10 w-auto mx-auto object-contain" />
            <TrademarkBadge size="sm" className="absolute -top-1 -right-3 text-zinc-400" />
          </span>
          <h1 className="text-xl font-black uppercase tracking-tight">Painel Administrativo</h1>
          <p className="text-xs text-zinc-400">Acesso restrito à equipe STYFLA</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[11px] font-bold uppercase text-zinc-400">
              Senha de Acesso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {state?.error && (
            <p className="text-xs font-bold text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 text-xs font-black uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {isPending ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
