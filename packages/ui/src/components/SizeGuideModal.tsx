'use client';

import React from 'react';
import { X, ShieldAlert, Check } from 'lucide-react';
import { Badge } from './Badge';
import { Button } from './Button';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-black border border-white/15 rounded-none p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              Guia de Medidas <span className="text-zinc-400">Rash Guards</span>
            </h3>
            <p className="text-xs text-zinc-400">Recomendação por Altura & Peso (Modelagem Compressão Pro)</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-none text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* IBJJF Info */}
        <div className="my-4 p-3 rounded-none bg-zinc-950 border border-white/10 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300">
            <strong className="text-white block font-semibold mb-0.5">Regras Oficiais IBJJF / CBJJ:</strong>
            Para competições oficiais No-Gi, a rash guard deve ter pelo menos 10% da cor da sua faixa atual e cobrir toda a região do tronco até a cintura.
          </div>
        </div>

        {/* Tabela de Medidas */}
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-900 border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3">Tamanho</th>
                <th className="p-3">Altura Recomendada</th>
                <th className="p-3">Peso Recomendado</th>
                <th className="p-3">Tórax (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              <tr className="hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="default">PP</Badge></td>
                <td className="p-3">1,50m - 1,62m</td>
                <td className="p-3">50kg - 62kg</td>
                <td className="p-3">82 - 88 cm</td>
              </tr>
              <tr className="hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="default">P</Badge></td>
                <td className="p-3">1,60m - 1,72m</td>
                <td className="p-3">63kg - 72kg</td>
                <td className="p-3">89 - 95 cm</td>
              </tr>
              <tr className="bg-white/5 hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="white">M (Mais Vendido)</Badge></td>
                <td className="p-3">1,70m - 1,80m</td>
                <td className="p-3">73kg - 82kg</td>
                <td className="p-3">96 - 103 cm</td>
              </tr>
              <tr className="hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="default">G</Badge></td>
                <td className="p-3">1,78m - 1,88m</td>
                <td className="p-3">83kg - 94kg</td>
                <td className="p-3">104 - 111 cm</td>
              </tr>
              <tr className="hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="default">GG</Badge></td>
                <td className="p-3">1,82m - 1,94m</td>
                <td className="p-3">95kg - 108kg</td>
                <td className="p-3">112 - 120 cm</td>
              </tr>
              <tr className="hover:bg-white/10 transition-colors">
                <td className="p-3 font-bold text-white"><Badge variant="default">2XG</Badge></td>
                <td className="p-3">1,85m - 2,00m</td>
                <td className="p-3">109kg - 125kg</td>
                <td className="p-3">121 - 130 cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dicas de Caimento */}
        <div className="space-y-2 text-xs text-zinc-400 bg-zinc-950 p-4 rounded-none border border-white/10">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Check className="w-4 h-4 text-white" /> Caimento Segunda Pele:
          </div>
          <p>Nossas rash guards possuem alta compressão muscular. Se você prefere um caimento ligeiramente mais solto, recomendamos optar por um número acima do indicado na tabela.</p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Entendido, Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};
