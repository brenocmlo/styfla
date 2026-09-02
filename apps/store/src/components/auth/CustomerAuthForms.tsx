'use client';

import React, { useState, useActionState } from 'react';
import { Button } from '@styfla/ui';
import { loginCustomerAction, registerCustomerAction } from '@/app/(store)/conta/actions';
import { Lock, UserPlus, LogIn, ArrowRight, ShieldCheck, Zap, User, Mail, Smartphone, Shield } from 'lucide-react';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

export function CustomerAuthForms() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [loginState, loginAction, isLoginPending] = useActionState(loginCustomerAction, null);
  const [regState, regAction, isRegPending] = useActionState(registerCustomerAction, null);

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-16 px-4">
      <div className="bg-zinc-950 border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Glow de fundo sutil */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <img src="/brand/symbol.png" alt="STYFLA" className="h-7 w-auto object-contain" />
            <span className="font-heading text-xl tracking-wider text-white">
              STYFLA<TrademarkBadge className="text-white" />
            </span>
          </div>
          <p className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-black">
            HIGH PERFORMANCE JIU-JITSU
          </p>
        </div>

        {/* Toggle Mode Selector Mobile-First */}
        <div className="grid grid-cols-2 p-1 bg-black border border-white/15">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-black font-mono shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" /> Entrar
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-black font-mono shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" /> Criar Conta
            </span>
          </button>
        </div>

        {/* LOG IN FORM */}
        {mode === 'login' && (
          <form action={loginAction} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                Acesse sua Área do Atleta
              </h2>
              <p className="text-xs text-zinc-400">
                Acompanhe seus pedidos, código de rastreamento e dados cadastrais.
              </p>
            </div>

            {loginState?.error && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium animate-fadeIn">
                {loginState.error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Mail className="w-3 h-3 text-white" /> E-mail do Atleta *
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-sans transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white" /> Senha *
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono transition-all"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoginPending}
              className="w-full h-12 flex items-center justify-center gap-2 text-xs font-black tracking-widest mt-2 cursor-pointer uppercase shadow-lg"
            >
              {isLoginPending ? 'Autenticando...' : 'Entrar na Conta'} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form action={regAction} className="space-y-4">
            <div className="text-center space-y-1">
              <h2 className="text-base sm:text-lg font-black uppercase text-white tracking-tight">
                Cadastre-se na STYFLA
              </h2>
              <p className="text-xs text-zinc-400">
                Faça parte da nossa comunidade No-Gi e tenha checkout ultra-rápido.
              </p>
            </div>

            {regState?.error && (
              <div className="p-3 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-medium animate-fadeIn">
                {regState.error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <User className="w-3 h-3 text-white" /> Nome Completo *
              </label>
              <input
                required
                type="text"
                name="name"
                placeholder="Ex: Carlos Gracie"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Mail className="w-3 h-3 text-white" /> E-mail *
              </label>
              <input
                required
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="000.000.000-00"
                  className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  <Smartphone className="w-3 h-3 text-white" /> WhatsApp
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(11) 99999-9999"
                  className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-white" /> Criar Senha * (Mínimo 6 caracteres)
              </label>
              <input
                required
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-11 px-3.5 text-xs bg-black border border-white/20 text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isRegPending}
              className="w-full h-12 flex items-center justify-center gap-2 text-xs font-black tracking-widest mt-2 cursor-pointer uppercase shadow-lg"
            >
              {isRegPending ? 'Criando Conta...' : 'Finalizar Cadastro'} <Zap className="w-4 h-4 text-black" />
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-white/10 text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-white" /> Protegido por criptografia SSL &bull; LGPD Compliant
        </div>
      </div>
    </div>
  );
}
