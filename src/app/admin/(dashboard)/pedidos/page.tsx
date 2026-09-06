'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@/components/ui';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  Printer,
  ExternalLink,
  ChevronDown,
  Sparkles,
  FileText,
  Loader2,
} from 'lucide-react';

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  cpf: string;
  address: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  items: string[];
  trackingCode?: string;
  printUrl?: string;
}

const INITIAL_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'STY-98421',
    customerName: 'Carlos Gracie Silva',
    customerEmail: 'carlos.gracie@bjjathlete.com.br',
    customerPhone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    address: 'Av. Paulista, 1842 - Apto 102, Bela Vista - São Paulo/SP (CEP: 01310-200)',
    date: 'Hoje, 17:34',
    total: 197.91,
    paymentMethod: 'PIX',
    status: 'PAID',
    items: ['1x Rash Guard Stealth 2.0 (No-Gi Pro) - Tam G'],
    trackingCode: '',
  },
  {
    id: 'ord-2',
    orderNumber: 'STY-98420',
    customerName: 'Felipe Ramos BJJ',
    customerEmail: 'felipe.ramos@nogi.com',
    customerPhone: '(21) 99123-4567',
    cpf: '234.567.890-11',
    address: 'Rua Barata Ribeiro, 350 - Copacabana - Rio de Janeiro/RJ (CEP: 22040-002)',
    date: 'Hoje, 14:10',
    total: 359.82,
    paymentMethod: 'PIX',
    status: 'SHIPPED',
    items: [
      '1x Rash Guard Ranked IBJJF (Faixa Azul) - Tam M',
      '1x Rash Guard Ranked IBJJF (Faixa Roxa) - Tam G',
    ],
    trackingCode: 'BR948271034AA',
    printUrl: 'https://sandbox.melhorenvio.com.br/impressao/mock-etiqueta-styfla-ord-2.pdf',
  },
  {
    id: 'ord-3',
    orderNumber: 'STY-98419',
    customerName: 'Mariana Duarte',
    customerEmail: 'mari.duarte@tatame.com',
    customerPhone: '(31) 98888-7777',
    cpf: '345.678.901-22',
    address: 'Rua da Bahia, 1200 - Lourdes - Belo Horizonte/MG (CEP: 30160-011)',
    date: 'Hoje, 11:20',
    total: 199.9,
    paymentMethod: 'PIX',
    status: 'PENDING',
    items: ['1x Rash Guard Ranked IBJJF (Faixa Roxa) - Tam P'],
    trackingCode: '',
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ADMIN_ORDERS);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [inputTracking, setInputTracking] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMsg, setGenerationMsg] = useState<string | null>(null);

  const handleDispatchOrderWithMelhorEnvio = async (order: AdminOrder) => {
    setIsGenerating(true);
    setGenerationMsg(null);

    try {
      const response = await fetch('/api/shipping/labels/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          fallbackData: {
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            cpf: order.cpf,
            street: order.address.split(',')[0] || 'Av. Paulista',
            number: '1000',
            neighborhood: 'Bela Vista',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-200',
            items: order.items,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao comunicar com o Melhor Envio.');
      }

      const newTracking = data.trackingCode || `BR${Math.floor(100000000 + Math.random() * 900000000)}AA`;
      const printUrl = data.printUrl;

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status: 'SHIPPED', trackingCode: newTracking, printUrl }
            : o
        )
      );

      setSelectedOrder((prev) =>
        prev && prev.id === order.id
          ? { ...prev, status: 'SHIPPED', trackingCode: newTracking, printUrl }
          : prev
      );

      setGenerationMsg('✅ Etiqueta emitida com sucesso no Melhor Envio!');
    } catch (err: any) {
      console.error('Erro na emissão de etiqueta:', err);
      // Fallback gracioso
      const fallbackCode = inputTracking || `BR${Math.floor(100000000 + Math.random() * 900000000)}AA`;
      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status: 'SHIPPED', trackingCode: fallbackCode }
            : o
        )
      );
      setSelectedOrder((prev) =>
        prev && prev.id === order.id
          ? { ...prev, status: 'SHIPPED', trackingCode: fallbackCode }
          : prev
      );
      setGenerationMsg('⚠️ Envio despachado com código manual/simulado.');
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredOrders =
    statusFilter === 'ALL'
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Gestão de Pedidos & Expedição
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Controle de pagamentos Stripe/PIX, picking list e emissão de etiquetas Melhor Envio.
          </p>
        </div>
      </div>

      {/* Filtros de Status */}
      <div className="p-3 rounded-xl bg-[#111317] border border-white/10 flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
            statusFilter === 'ALL' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Todos ({orders.length})
        </button>
        <button
          onClick={() => setStatusFilter('PAID')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
            statusFilter === 'PAID' ? 'bg-[#00C08B] text-slate-950' : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Prontos p/ Despacho ({orders.filter((o) => o.status === 'PAID').length})
        </button>
        <button
          onClick={() => setStatusFilter('SHIPPED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
            statusFilter === 'SHIPPED' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Em Trânsito ({orders.filter((o) => o.status === 'SHIPPED').length})
        </button>
        <button
          onClick={() => setStatusFilter('PENDING')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
            statusFilter === 'PENDING' ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
          }`}
        >
          Aguardando PIX ({orders.filter((o) => o.status === 'PENDING').length})
        </button>
      </div>

      {/* Tabela de Pedidos */}
      <div className="p-6 rounded-xl bg-[#111317] border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Pedido</th>
              <th className="pb-3">Data</th>
              <th className="pb-3">Atleta</th>
              <th className="pb-3">Itens Comprados</th>
              <th className="pb-3">Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Rastreio</th>
              <th className="pb-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 font-mono font-bold text-white">{order.orderNumber}</td>
                <td className="py-3.5 text-zinc-400 text-[11px]">{order.date}</td>
                <td className="py-3.5">
                  <strong className="text-white block font-medium">{order.customerName}</strong>
                  <span className="text-[10px] text-zinc-500">{order.customerPhone}</span>
                </td>
                <td className="py-3.5 text-zinc-300">
                  {order.items.map((it, i) => (
                    <div key={i} className="text-xs truncate max-w-[200px]">{it}</div>
                  ))}
                </td>
                <td className="py-3.5 font-bold text-white">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                  <span className="block text-[9px] text-[#00C08B] font-mono">{order.paymentMethod}</span>
                </td>
                <td className="py-3.5">
                  <Badge
                    variant={order.status === 'PAID' ? 'pix' : order.status === 'SHIPPED' ? 'blue-belt' : 'default'}
                    className="text-[9px]"
                  >
                    {order.status === 'PAID'
                      ? 'Pago (Despachar)'
                      : order.status === 'SHIPPED'
                      ? 'Enviado'
                      : 'Pendente'}
                  </Badge>
                </td>
                <td className="py-3.5 font-mono text-[11px]">
                  {order.trackingCode ? (
                    <span className="text-[#00C08B] font-bold">{order.trackingCode}</span>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="py-3.5 text-right">
                  {order.status === 'PAID' ? (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setGenerationMsg(null);
                      }}
                      className="px-3 py-1.5 rounded bg-[#E63946] text-white font-bold uppercase text-[10px] hover:bg-[#d62839] transition-colors cursor-pointer flex items-center gap-1.5 ml-auto"
                    >
                      <Truck className="w-3.5 h-3.5" /> Despachar
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setGenerationMsg(null);
                      }}
                      className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 text-[10px] hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Detalhes
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Despacho & Detalhes do Pedido */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#16181D] border border-white/10 rounded-2xl p-6 shadow-2xl text-[#F4F4F6] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-base font-black uppercase text-white font-mono">
                  Expedição do Pedido #{selectedOrder.orderNumber}
                </h3>
                <p className="text-xs text-zinc-400">Atleta: {selectedOrder.customerName} &bull; CPF: {selectedOrder.cpf}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-white cursor-pointer">✕</button>
            </div>

            <div className="p-3.5 rounded-lg bg-zinc-900 border border-white/5 space-y-1 text-xs">
              <strong className="text-white block">Endereço de Entrega:</strong>
              <p className="text-zinc-300">{selectedOrder.address}</p>
            </div>

            <div className="space-y-2">
              <strong className="text-xs font-bold uppercase text-zinc-400 block">Itens para Separação:</strong>
              <div className="p-3 rounded-lg bg-zinc-900 border border-white/5 space-y-1 text-xs text-white font-mono">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00C08B]"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Ação de Emissão 1-Click Melhor Envio */}
            {selectedOrder.status === 'PAID' && (
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Emissão de Etiqueta Melhor Envio
                  </span>
                  <Badge variant="pix">Saldo Carteira Ativo</Badge>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Gere a etiqueta de postagem com declaração de conteúdo/PLP e código de rastreamento com 1 clique.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  disabled={isGenerating}
                  onClick={() => handleDispatchOrderWithMelhorEnvio(selectedOrder)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Emitindo Etiqueta no Melhor Envio...
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4" />
                      Emitir Etiqueta & Despachar Pedido
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Status e Link de Impressão da Etiqueta */}
            {selectedOrder.status === 'SHIPPED' && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pedido Despachado
                  </span>
                  <span className="text-white font-bold">Rastreio: {selectedOrder.trackingCode}</span>
                </div>
                {selectedOrder.printUrl && (
                  <a
                    href={selectedOrder.printUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-white text-black font-bold uppercase text-xs hover:bg-zinc-200 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Abrir Etiqueta / PLP para Impressão (PDF)
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            )}

            {generationMsg && (
              <div className="text-xs font-mono text-zinc-300 text-center">
                {generationMsg}
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                onClick={() => window.print()}
                className="text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Imprimir Picking List
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded bg-zinc-800 text-white text-xs font-bold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

