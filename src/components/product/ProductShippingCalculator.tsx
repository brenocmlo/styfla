'use client';

import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import type { ShippingQuote } from '@/types';

interface ProductShippingCalculatorProps {
  weightGrams?: number;
}

export function ProductShippingCalculator({ weightGrams = 260 }: ProductShippingCalculatorProps) {
  const [zipCode, setZipCode] = useState('');
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuote[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  const handleCalculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanCep = zipCode.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      setError('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setIsCalculating(true);
    try {
      const res = await fetch('/api/shipping/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipCode: cleanCep, weightG: weightGrams }),
      });

      const data = await res.json();
      if (data.success && data.quotes) {
        setShippingQuotes(data.quotes);
      } else {
        setError(data.error || 'Não foi possível calcular o frete para este CEP.');
      }
    } catch {
      setError('Falha de conexão ao calcular o frete.');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="p-5 bg-zinc-950 border border-white/10 space-y-3">
      <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5 tracking-wider">
        <Truck className="w-4 h-4 text-white" /> Calcular Frete (Melhor Envio / Correios)
      </span>

      <form onSubmit={handleCalculateShipping} className="flex gap-2">
        <input
          type="text"
          placeholder="00000-000"
          maxLength={9}
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="flex-1 px-3 py-2 text-xs bg-black border border-white/20 text-white placeholder-zinc-500 focus:outline-none focus:border-white font-mono"
        />
        <button
          type="submit"
          disabled={isCalculating}
          className="px-5 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase transition-colors cursor-pointer"
        >
          {isCalculating ? 'Calculando...' : 'Calcular'}
        </button>
      </form>

      {error && <p className="text-xs text-red-300 font-medium">{error}</p>}

      {shippingQuotes.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-white/10 font-mono">
          {shippingQuotes.map((q) => (
            <div key={q.serviceId} className="flex items-center justify-between text-xs p-2.5 bg-black border border-white/10">
              <div>
                <span className="font-bold text-white block uppercase">{q.name}</span>
                <span className="text-[10px] text-zinc-400">Entrega estimada: {q.deliveryDays} dias úteis</span>
              </div>
              <span className="font-black text-white">R$ {q.price.toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
