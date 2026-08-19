'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@styfla/ui';
import { TicketPercent, Plus, Trash2, Check, X } from 'lucide-react';

interface CouponItem {
  id: string;
  code: string;
  discountType: 'PERCENT' | 'FIXED' | 'FREE_SHIPPING';
  value: number;
  minOrder: number;
  uses: number;
  maxUses: number;
  isActive: boolean;
  expiresAt: string;
}

const INITIAL_COUPONS: CouponItem[] = [
  {
    id: 'c1',
    code: 'TATAME10',
    discountType: 'PERCENT',
    value: 10,
    minOrder: 150,
    uses: 48,
    maxUses: 100,
    isActive: true,
    expiresAt: '31/12/2026',
  },
  {
    id: 'c2',
    code: 'BLACKBELT50',
    discountType: 'FIXED',
    value: 50,
    minOrder: 300,
    uses: 19,
    maxUses: 50,
    isActive: true,
    expiresAt: '15/09/2026',
  },
  {
    id: 'c3',
    code: 'FRETENOGI',
    discountType: 'FREE_SHIPPING',
    value: 0,
    minOrder: 199,
    uses: 82,
    maxUses: 200,
    isActive: true,
    expiresAt: '30/10/2026',
  },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'PERCENT' as const,
    value: 10,
    minOrder: 100,
    maxUses: 50,
    expiresAt: '31/12/2026',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CouponItem = {
      id: `c-${Date.now()}`,
      code: newCoupon.code.toUpperCase(),
      discountType: newCoupon.discountType,
      value: Number(newCoupon.value),
      minOrder: Number(newCoupon.minOrder),
      uses: 0,
      maxUses: Number(newCoupon.maxUses),
      isActive: true,
      expiresAt: newCoupon.expiresAt,
    };
    setCoupons([created, ...coupons]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <TicketPercent className="w-6 h-6 text-[#E63946]" /> Cupons & Campanhas Promocionais
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Crie cupons de desconto, frete grátis e promoções para eventos e atletas parceiros.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold"
        >
          <Plus className="w-4 h-4" /> Criar Novo Cupom
        </Button>
      </div>

      <div className="p-6 rounded-xl bg-[#111317] border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Código</th>
              <th className="pb-3">Tipo de Benefício</th>
              <th className="pb-3">Pedido Mínimo</th>
              <th className="pb-3">Utilizações</th>
              <th className="pb-3">Validade</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 font-mono font-bold text-white text-xs tracking-wider">
                  {c.code}
                </td>
                <td className="py-3.5">
                  {c.discountType === 'PERCENT' && (
                    <span className="font-bold text-[#00C08B]">{c.value}% OFF</span>
                  )}
                  {c.discountType === 'FIXED' && (
                    <span className="font-bold text-[#00C08B]">R$ {c.value},00 OFF</span>
                  )}
                  {c.discountType === 'FREE_SHIPPING' && (
                    <Badge variant="blue-belt" className="text-[8px]">Frete Grátis</Badge>
                  )}
                </td>
                <td className="py-3.5">R$ {c.minOrder.toFixed(2).replace('.', ',')}</td>
                <td className="py-3.5 font-mono">
                  {c.uses} / {c.maxUses}
                </td>
                <td className="py-3.5 text-zinc-400">{c.expiresAt}</td>
                <td className="py-3.5">
                  <Badge variant={c.isActive ? 'pix' : 'default'} className="text-[8px]">
                    {c.isActive ? 'Ativo' : 'Expirado'}
                  </Badge>
                </td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => setCoupons(coupons.filter((it) => it.id !== c.id))}
                    className="p-1.5 rounded bg-zinc-800 hover:bg-red-950/80 text-zinc-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Criação de Cupom */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#16181D] border border-white/10 rounded-2xl p-6 shadow-2xl text-[#F4F4F6] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-black uppercase text-white font-mono">
                Novo Cupom de Desconto
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-400">Código do Cupom *</label>
                <input
                  required
                  placeholder="EX: STYFLA10"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded bg-zinc-900 border border-white/10 text-white uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Tipo</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded bg-zinc-900 border border-white/10 text-white"
                  >
                    <option value="PERCENT">% Porcentagem</option>
                    <option value="FIXED">Valor Fixo (R$)</option>
                    <option value="FREE_SHIPPING">Frete Grátis</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Valor do Desconto</label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded bg-zinc-900 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Pedido Mínimo (R$)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrder}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded bg-zinc-900 border border-white/10 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Limite de Usos</label>
                  <input
                    type="number"
                    value={newCoupon.maxUses}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded bg-zinc-900 border border-white/10 text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <Button type="submit" variant="primary" size="sm">
                  Salvar Cupom
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
