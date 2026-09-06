'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@/components/ui';
import {
  Boxes,
  Search,
  Filter,
  Plus,
  Minus,
  Save,
  AlertTriangle,
  Check,
} from 'lucide-react';

interface SkuStock {
  sku: string;
  productName: string;
  size: string;
  category: string;
  stock: number;
  minAlert: number;
}

const INITIAL_SKUS: SkuStock[] = [
  { sku: 'STY-RG-BLK-PP', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: 'PP', category: 'Competição', stock: 3, minAlert: 5 },
  { sku: 'STY-RG-BLK-P', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: 'P', category: 'Competição', stock: 12, minAlert: 5 },
  { sku: 'STY-RG-BLK-M', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: 'M', category: 'Competição', stock: 24, minAlert: 8 },
  { sku: 'STY-RG-BLK-G', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: 'G', category: 'Competição', stock: 18, minAlert: 8 },
  { sku: 'STY-RG-BLK-GG', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: 'GG', category: 'Competição', stock: 9, minAlert: 5 },
  { sku: 'STY-RG-BLK-2XG', productName: 'Rash Guard Stealth 2.0 (No-Gi Pro)', size: '2XG', category: 'Competição', stock: 4, minAlert: 5 },
  { sku: 'STY-RG-BLUE-M', productName: 'Rash Guard Ranked IBJJF (Faixa Azul)', size: 'M', category: 'Graduação', stock: 0, minAlert: 6 },
  { sku: 'STY-RG-BLUE-G', productName: 'Rash Guard Ranked IBJJF (Faixa Azul)', size: 'G', category: 'Graduação', stock: 12, minAlert: 6 },
  { sku: 'STY-RG-PURP-M', productName: 'Rash Guard Ranked IBJJF (Faixa Roxa)', size: 'M', category: 'Graduação', stock: 8, minAlert: 5 },
  { sku: 'STY-RG-BRN-P', productName: 'Rash Guard Ranked IBJJF (Faixa Marrom)', size: 'P', category: 'Graduação', stock: 4, minAlert: 5 },
];

export default function AdminStockPage() {
  const [skus, setSkus] = useState(INITIAL_SKUS);
  const [search, setSearch] = useState('');
  const [filterOnlyCritical, setFilterOnlyCritical] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleAdjust = (skuCode: string, delta: number) => {
    setSkus(
      skus.map((s) =>
        s.sku === skuCode ? { ...s, stock: Math.max(0, s.stock + delta) } : s
      )
    );
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const filtered = skus.filter((item) => {
    const matchesSearch =
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.productName.toLowerCase().includes(search.toLowerCase());
    if (filterOnlyCritical) {
      return matchesSearch && item.stock <= item.minAlert;
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Boxes className="w-6 h-6 text-[#E63946]" /> Controle de Estoque por SKU
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Ajuste instantâneo de saldo, prevenção de backorders e monitoramento de ruptura.
          </p>
        </div>

        {savedFeedback && (
          <div className="px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-[#00C08B] flex items-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4" /> Estoque atualizado no banco!
          </div>
        )}
      </div>

      {/* Filtros e Busca */}
      <div className="p-4 rounded-xl bg-[#111317] border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Buscar por SKU ou Nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#E63946]"
          />
        </div>

        <button
          onClick={() => setFilterOnlyCritical(!filterOnlyCritical)}
          className={`px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
            filterOnlyCritical
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
              : 'bg-zinc-800 text-zinc-300 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          {filterOnlyCritical ? 'Exibindo Apenas Críticos' : 'Filtrar Saldo Crítico'}
        </button>
      </div>

      {/* Tabela de Estoque por SKU */}
      <div className="p-6 rounded-xl bg-[#111317] border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">SKU</th>
              <th className="pb-3">Produto</th>
              <th className="pb-3">Tamanho</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-center">Saldo em Estoque</th>
              <th className="pb-3 text-right">Ajuste Rápido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {filtered.map((item) => {
              const isOut = item.stock === 0;
              const isCritical = item.stock > 0 && item.stock <= item.minAlert;

              return (
                <tr key={item.sku} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-mono font-bold text-white text-xs">{item.sku}</td>
                  <td className="py-3">
                    <strong className="text-white block font-medium">{item.productName}</strong>
                    <span className="text-[10px] text-zinc-500">{item.category}</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 font-bold text-zinc-200">
                      {item.size}
                    </span>
                  </td>
                  <td className="py-3">
                    {isOut ? (
                      <Badge variant="red" className="text-[8px]">Esgotado</Badge>
                    ) : isCritical ? (
                      <Badge variant="gold" className="text-[8px]">Crítico (&le; {item.minAlert})</Badge>
                    ) : (
                      <Badge variant="pix" className="text-[8px]">Normal</Badge>
                    )}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`text-sm font-black font-mono ${
                      isOut ? 'text-red-400' : isCritical ? 'text-amber-400' : 'text-white'
                    }`}>
                      {item.stock} un
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="inline-flex items-center border border-white/10 rounded-lg bg-zinc-900 overflow-hidden">
                      <button
                        onClick={() => handleAdjust(item.sku, -1)}
                        className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Diminuir estoque"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-white border-x border-white/10">
                        {item.stock}
                      </span>
                      <button
                        onClick={() => handleAdjust(item.sku, 1)}
                        className="px-2.5 py-1 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Adicionar estoque"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
