'use client';

import React from 'react';
import { Button, Badge } from '@styfla/ui';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Zap,
  AlertTriangle,
  ArrowUpRight,
  Truck,
  CheckCircle2,
  Clock,
  Package,
} from 'lucide-react';

const KPIS = [
  {
    title: 'Faturamento do Mês',
    value: 'R$ 48.920,00',
    change: '+26.4%',
    isPositive: true,
    sub: 'vs. mês anterior',
    icon: TrendingUp,
  },
  {
    title: 'Total de Pedidos',
    value: '228',
    change: '+18%',
    isPositive: true,
    sub: '3 aguardando despacho',
    icon: ShoppingBag,
  },
  {
    title: 'Ticket Médio',
    value: 'R$ 214,56',
    change: '+8.2%',
    isPositive: true,
    sub: '1.4 peças por pedido',
    icon: Package,
  },
  {
    title: 'Conversão via PIX',
    value: '81.4%',
    change: '+5.1%',
    isPositive: true,
    sub: 'Economia em taxas de cartão',
    icon: Zap,
  },
];

const RECENT_ORDERS = [
  {
    id: 'STY-98421',
    customer: 'Carlos Gracie Silva',
    items: 'Rash Guard Stealth 2.0 (G)',
    total: 197.91,
    status: 'PAID',
    statusLabel: 'Pronto para Despacho',
    payment: 'PIX',
    time: 'Há 12 min',
  },
  {
    id: 'STY-98420',
    customer: 'Felipe BJJ Ramos',
    items: 'Rash Guard Ranked Blue (M) + 1x',
    total: 359.82,
    status: 'SHIPPED',
    statusLabel: 'Em Trânsito',
    payment: 'PIX',
    time: 'Há 1 hora',
  },
  {
    id: 'STY-98419',
    customer: 'Mariana Duarte',
    items: 'Rash Guard Ranked Purple (P)',
    total: 199.9,
    status: 'PENDING',
    statusLabel: 'Aguardando PIX',
    payment: 'PIX',
    time: 'Há 18 min',
  },
  {
    id: 'STY-98418',
    customer: 'Lucas Mendonça',
    items: 'Rash Guard Ranked Brown (GG)',
    total: 219.9,
    status: 'DELIVERED',
    statusLabel: 'Entregue',
    payment: 'CARTÃO (3x)',
    time: 'Ontem',
  },
];

const STOCK_ALERTS = [
  {
    sku: 'STY-RG-BLUE-M',
    product: 'Rash Guard Ranked IBJJF (Faixa Azul)',
    size: 'M',
    currentStock: 0,
    status: 'ESGOTADO',
  },
  {
    sku: 'STY-RG-BLK-PP',
    product: 'Rash Guard Stealth 2.0 (No-Gi Pro)',
    size: 'PP',
    currentStock: 3,
    status: 'CRÍTICO',
  },
  {
    sku: 'STY-RG-BRN-P',
    product: 'Rash Guard Ranked IBJJF (Faixa Marrom)',
    size: 'P',
    currentStock: 4,
    status: 'BAIXO',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Dashboard de Performance
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Métricas de vendas, estoque e separação de pedidos da Styfla.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/produtos">
            <Button variant="primary" size="sm" className="text-xs">
              + Cadastrar Rash Guard
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-xl bg-[#111317] border border-white/10 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {kpi.title}
                </span>
                <div className="p-2 rounded-lg bg-zinc-800/80 text-zinc-300">
                  <Icon className="w-4 h-4 text-[#E63946]" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-black text-white font-mono">{kpi.value}</div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-[#00C08B] font-bold flex items-center">
                    {kpi.change} <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-zinc-500 text-[11px]">{kpi.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Pedidos Recentes & Alertas de Estoque */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pedidos Recentes (8 colunas) */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-[#111317] border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black uppercase tracking-tight text-white">
                Últimos Pedidos
              </h2>
              <p className="text-xs text-zinc-400">Acompanhe e despache pedidos em tempo real</p>
            </div>
            <Link href="/admin/pedidos" className="text-xs font-bold text-[#00C08B] hover:underline">
              Ver Todos &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="pb-3">Pedido</th>
                  <th className="pb-3">Atleta</th>
                  <th className="pb-3">Itens</th>
                  <th className="pb-3">Valor</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-3">
                      <strong className="text-white block font-medium">{order.customer}</strong>
                      <span className="text-[10px] text-zinc-500">{order.time}</span>
                    </td>
                    <td className="py-3 text-zinc-400 max-w-[180px] truncate">{order.items}</td>
                    <td className="py-3 font-bold text-white">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                      <span className="block text-[9px] text-[#00C08B] font-mono">{order.payment}</span>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={order.status === 'PAID' ? 'pix' : order.status === 'SHIPPED' ? 'blue-belt' : 'default'}
                        className="text-[9px]"
                      >
                        {order.statusLabel}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      {order.status === 'PAID' ? (
                        <Link href="/admin/pedidos">
                          <button className="px-2.5 py-1 rounded bg-[#E63946] text-white text-[10px] font-bold uppercase hover:bg-[#d62839] transition-colors cursor-pointer">
                            Despachar
                          </button>
                        </Link>
                      ) : (
                        <span className="text-[10px] text-zinc-500">Concluído</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas de Ruptura de Estoque (4 colunas) */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-[#111317] border border-white/10 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Ruptura de Estoque
              </h2>
              <Badge variant="red">Atenção</Badge>
            </div>

            <p className="text-xs text-zinc-400">
              Produtos com saldo crítico que precisam de reposição na confecção.
            </p>

            <div className="space-y-3">
              {STOCK_ALERTS.map((alert) => (
                <div
                  key={alert.sku}
                  className="p-3.5 rounded-lg bg-zinc-900/80 border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{alert.product}</span>
                    <Badge variant={alert.currentStock === 0 ? 'red' : 'gold'} className="text-[8px]">
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-mono">SKU: {alert.sku}</span>
                    <span className="font-bold text-white">Saldo: {alert.currentStock} un</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/admin/estoque" className="pt-4">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Gerenciar Todo o Estoque &rarr;
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
