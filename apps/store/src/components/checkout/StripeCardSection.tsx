'use client';

import React, { useState } from 'react';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getStripePromise, isStripeClientConfigured } from '@/lib/stripeClient';
import { CreditCard, Lock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

const stripePromise = getStripePromise();

const ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#FFFFFF',
      fontFamily: 'inherit',
      fontSize: '12px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#71717A',
      },
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  },
};

interface StripeCardFieldsProps {
  cardHolderName: string;
  setCardHolderName: (name: string) => void;
  installments: number;
  setInstallments: (inst: number) => void;
  totalAmount: number;
  errorMessage: string | null;
  onCardFieldChange?: (complete: boolean) => void;
}

function StripeRealCardForm({
  cardHolderName,
  setCardHolderName,
  installments,
  setInstallments,
  totalAmount,
  errorMessage,
}: StripeCardFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Nome no Cartão */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Nome Impresso no Cartão *
        </label>
        <input
          type="text"
          required
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value.toUpperCase())}
          placeholder="Ex: CARLOS G SILVA"
          className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono uppercase"
        />
      </div>

      {/* Número do Cartão */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
          <span>Número do Cartão de Crédito *</span>
          <span className="flex items-center gap-1 text-[9px] text-zinc-500 lowercase font-mono">
            <Lock className="w-2.5 h-2.5" /> 256-bit ssl
          </span>
        </label>
        <div className="w-full px-3 py-2.5 bg-black border border-white/20 focus-within:border-white transition-colors">
          <CardNumberElement options={ELEMENT_OPTIONS} />
        </div>
      </div>

      {/* Expiração e CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Validade (MM/AA) *
          </label>
          <div className="w-full px-3 py-2.5 bg-black border border-white/20 focus-within:border-white transition-colors">
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            CVC / Código de Segurança *
          </label>
          <div className="w-full px-3 py-2.5 bg-black border border-white/20 focus-within:border-white transition-colors">
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>
        </div>
      </div>

      {/* Opções de Parcelamento */}
      <div className="space-y-1 pt-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Parcelas
        </label>
        <select
          value={installments}
          onChange={(e) => setInstallments(Number(e.target.value))}
          className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono cursor-pointer"
        >
          <option value={1}>1x de R$ {totalAmount.toFixed(2).replace('.', ',')} à vista</option>
          <option value={2}>2x de R$ {(totalAmount / 2).toFixed(2).replace('.', ',')} sem juros</option>
          <option value={3}>3x de R$ {(totalAmount / 3).toFixed(2).replace('.', ',')} sem juros</option>
        </select>
      </div>

      {/* Mensagem de Erro */}
      {errorMessage && (
        <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selo de Segurança */}
      <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/10 font-mono">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          Processamento Seguro Stripe
        </span>
        <span>PCI-DSS Level 1 & 3DS 2.0</span>
      </div>
    </div>
  );
}

/**
 * Formulário simulador para ambiente local quando NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não estiver configurada.
 */
function StripeDemoCardForm({
  cardHolderName,
  setCardHolderName,
  installments,
  setInstallments,
  totalAmount,
  errorMessage,
}: StripeCardFieldsProps) {
  const [demoCardNumber, setDemoCardNumber] = useState('4242 •••• •••• 4242');
  const [demoExpiry, setDemoExpiry] = useState('12/28');
  const [demoCvc, setDemoCvc] = useState('888');

  return (
    <div className="space-y-4">
      <div className="p-3 bg-zinc-900 border border-white/20 text-xs text-zinc-300 space-y-1">
        <div className="flex items-center gap-1.5 text-white font-bold uppercase text-[10px] tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Modo Stripe Sandbox / Teste Local Ativo
        </div>
        <p className="text-[11px] text-zinc-400">
          Você pode testar o fluxo de checkout diretamente. Os dados de teste abaixo são aceitos pelo simulador.
        </p>
      </div>

      {/* Nome no Cartão */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Nome Impresso no Cartão *
        </label>
        <input
          type="text"
          required
          value={cardHolderName}
          onChange={(e) => setCardHolderName(e.target.value.toUpperCase())}
          placeholder="Ex: CARLOS G SILVA"
          className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono uppercase"
        />
      </div>

      {/* Número do Cartão Demo */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
          <span>Número do Cartão de Teste *</span>
          <span className="flex items-center gap-1 text-[9px] text-zinc-500 lowercase font-mono">
            <Lock className="w-2.5 h-2.5" /> sandbox
          </span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={demoCardNumber}
            onChange={(e) => setDemoCardNumber(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-black border border-white/20 text-white font-mono"
            placeholder="4242 4242 4242 4242"
          />
          <button
            type="button"
            onClick={() => setDemoCardNumber('4242 4242 4242 4242')}
            className="px-3 py-2 bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase hover:bg-zinc-700 transition-colors"
          >
            Preencher Teste
          </button>
        </div>
      </div>

      {/* Expiração e CVC Demo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            Validade (MM/AA) *
          </label>
          <input
            type="text"
            value={demoExpiry}
            onChange={(e) => setDemoExpiry(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white font-mono"
            placeholder="12/28"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
            CVC *
          </label>
          <input
            type="text"
            value={demoCvc}
            onChange={(e) => setDemoCvc(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white font-mono"
            placeholder="888"
          />
        </div>
      </div>

      {/* Parcelas */}
      <div className="space-y-1 pt-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Parcelamento
        </label>
        <select
          value={installments}
          onChange={(e) => setInstallments(Number(e.target.value))}
          className="w-full px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white font-mono cursor-pointer"
        >
          <option value={1}>1x de R$ {totalAmount.toFixed(2).replace('.', ',')} à vista</option>
          <option value={2}>2x de R$ {(totalAmount / 2).toFixed(2).replace('.', ',')} sem juros</option>
          <option value={3}>3x de R$ {(totalAmount / 3).toFixed(2).replace('.', ',')} sem juros</option>
        </select>
      </div>

      {/* Erro */}
      {errorMessage && (
        <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selo */}
      <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/10 font-mono">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          Ambiente Sandbox Simulado STYFLA
        </span>
        <span>Cartão de Teste Ativo</span>
      </div>
    </div>
  );
}

export interface StripeCardSectionProps {
  cardHolderName: string;
  setCardHolderName: (name: string) => void;
  installments: number;
  setInstallments: (inst: number) => void;
  totalAmount: number;
  errorMessage: string | null;
}

export function StripeCardSection(props: StripeCardSectionProps) {
  if (!isStripeClientConfigured) {
    return <StripeDemoCardForm {...props} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeRealCardForm {...props} />
    </Elements>
  );
}
