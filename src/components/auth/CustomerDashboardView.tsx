'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@/components/ui';
import { EXCHANGE_POLICY } from '@/lib/policies';
import { logoutCustomerAction, updateCustomerProfileAction } from '@/app/(store)/conta/actions';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Shield,
  RotateCcw,
  Truck,
  ChevronRight,
  Plus,
  ExternalLink,
  Trash2,
  ArrowLeft,
  LogOut,
  Check,
} from 'lucide-react';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

interface CustomerDashboardProps {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    createdAt: string;
    addresses: Array<{
      id: string;
      title: string;
      recipient: string;
      street: string;
      number: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
      zipCode: string;
      isDefault: boolean;
    }>;
    orders: Array<{
      id: string;
      orderNumber: string;
      date: string;
      status: string;
      statusText: string;
      total: number;
      paymentMethod: string;
      trackingCode?: string;
      carrier?: string;
      items: Array<{
        title: string;
        size: string;
        quantity: number;
        price: number;
        image: string;
      }>;
    }>;
  };
}

export function CustomerDashboardView({ customer }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'returns'>('orders');
  const [belt, setBelt] = useState('Faixa Preta');
  const [academy, setAcademy] = useState('Gracie Barra Jardins');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    await logoutCustomerAction();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {/* Top Header & Welcome Banner Mobile-First */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-black font-mono text-lg sm:text-xl font-black flex items-center justify-center shrink-0 shadow-lg border border-white">
            {getInitials(customer.name)}
          </div>
          <div className="space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white">
                {customer.name}
              </h1>
              <Badge variant="black-belt" className="text-[9px] sm:text-[10px] py-0.5">
                {belt}
              </Badge>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-400 font-mono truncate">
              {customer.email} &bull; ATLETA STYFLA DESDE {new Date(customer.createdAt).getFullYear()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link href="/" className="flex-1 sm:flex-initial">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold h-9">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Loja
            </Button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 h-9 bg-zinc-900 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </div>

      {/* Tabs Mobile Scrollbar horizontal */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-white/10 lg:hidden font-mono scrollbar-none">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-black uppercase whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-950 text-zinc-400 border-transparent'
          }`}
        >
          Meus Pedidos ({customer.orders.length})
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 text-xs font-black uppercase whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'addresses'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-950 text-zinc-400 border-transparent'
          }`}
        >
          Endereços ({customer.addresses.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-xs font-black uppercase whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-950 text-zinc-400 border-transparent'
          }`}
        >
          Dados do Atleta
        </button>

        <button
          onClick={() => setActiveTab('returns')}
          className={`px-4 py-2 text-xs font-black uppercase whitespace-nowrap transition-all border-b-2 cursor-pointer ${
            activeTab === 'returns'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-950 text-zinc-400 border-transparent'
          }`}
        >
          Trocas (CDC)
        </button>
      </div>

      {/* Layout Desktop Sidebar + Mobile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Sidebar Desktop */}
        <div className="hidden lg:block lg:col-span-3 space-y-2">
          <div className="p-2 bg-zinc-950 border border-white/10 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-black uppercase transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className="w-4 h-4" /> Meus Pedidos
              </span>
              <span className="text-[10px] font-mono opacity-80">({customer.orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-black uppercase transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" /> Endereços
              </span>
              <span className="text-[10px] font-mono opacity-80">({customer.addresses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-black uppercase transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <User className="w-4 h-4" /> Dados do Atleta
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('returns')}
              className={`w-full flex items-center justify-between px-3.5 py-3 text-xs font-black uppercase transition-all cursor-pointer ${
                activeTab === 'returns'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4" /> Trocas & Devoluções
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </div>

          <div className="p-4 bg-zinc-950 border border-white/10 space-y-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2 font-bold text-white uppercase text-[10px] tracking-wider">
              <Shield className="w-4 h-4 text-white" /> Garantia Styfla<TrademarkBadge className="text-white" />
            </div>
            <p className="text-[11px] leading-relaxed">
              Costuras quádruplas Flatlock com garantia contra defeitos de fábrica.
            </p>
          </div>
        </div>

        {/* Painel Principal de Conteúdo */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* ABA 1: MEUS PEDIDOS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest text-white">
                  Histórico de Pedidos & Rastreamento
                </h2>
                <span className="text-[10px] text-zinc-400 font-mono">Atualização em Tempo Real</span>
              </div>

              {customer.orders.length === 0 ? (
                <div className="p-8 sm:p-12 bg-zinc-950 border border-white/10 text-center space-y-3">
                  <Package className="w-8 h-8 text-zinc-500 mx-auto" />
                  <h4 className="text-xs font-black uppercase text-white tracking-widest">Nenhum pedido realizado ainda</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Você ainda não efetuou nenhuma compra. Escolha sua armadura e decida continuar.
                  </p>
                  <Link href="/#lancamentos">
                    <Button variant="primary" size="sm" className="mt-2">
                      Ver Coleção
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.orders.map((order) => (
                    <div key={order.id} className="p-4 sm:p-6 bg-zinc-950 border border-white/10 space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-sm font-black font-mono text-white">
                              PEDIDO #{order.orderNumber}
                            </span>
                            <Badge
                              variant={order.status === 'DELIVERED' ? 'white' : 'outline'}
                              className="text-[9px]"
                            >
                              {order.statusText}
                            </Badge>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">
                            {order.date} &bull; Pago via {order.paymentMethod}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-sm font-black text-white font-mono block">
                            Total: R$ {order.total.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>

                      {order.trackingCode && (
                        <div className="p-3.5 bg-black border border-white/10 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                            <span className="flex items-center gap-1.5 font-bold text-white uppercase font-mono">
                              <Truck className="w-4 h-4 text-white shrink-0" /> {order.carrier || 'Correios'} &bull; CÓDIGO: {order.trackingCode}
                            </span>
                            <a
                              href={`https://rastreamento.correios.com.br/app/index.php?codigo=${order.trackingCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline font-bold flex items-center gap-1 cursor-pointer uppercase text-[11px]"
                            >
                              Rastrear <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-14 object-cover bg-black border border-white/10 shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-white uppercase truncate">{item.title}</h4>
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  TAM: <strong className="text-white">{item.size}</strong> &bull; QTD: {item.quantity}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs font-black text-white font-mono shrink-0">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA 2: ENDEREÇOS */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">
                    Endereços de Entrega
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Locais de entrega salvos no seu cadastro</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {customer.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 bg-zinc-950 border space-y-3 transition-all ${
                      addr.isDefault ? 'border-white' : 'border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-white font-mono flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-white" /> {addr.title}
                      </span>
                      {addr.isDefault && <Badge variant="white">Padrão</Badge>}
                    </div>

                    <div className="text-xs text-zinc-300 space-y-1">
                      <strong className="text-white block font-semibold">{addr.recipient}</strong>
                      <p>{addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}</p>
                      <p>{addr.neighborhood} &bull; {addr.city}/{addr.state}</p>
                      <p className="font-mono text-zinc-400">CEP: {addr.zipCode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABA 3: DADOS DO ATLETA */}
          {activeTab === 'profile' && (
            <div className="p-5 sm:p-6 bg-zinc-950 border border-white/10 space-y-6">
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white">
                  Dados Cadastrais do Atleta
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">Mantenha seus dados atualizados no PostgreSQL</p>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-zinc-900 border border-white text-white text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> Dados atualizados com sucesso!
                </div>
              )}

              <form action={async (formData) => {
                const res = await updateCustomerProfileAction(null, formData);
                if (res.success) {
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome Completo</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={customer.name}
                      className="w-full h-11 px-3.5 text-xs bg-black border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">E-mail</label>
                    <input
                      disabled
                      type="email"
                      defaultValue={customer.email}
                      className="w-full h-11 px-3.5 text-xs bg-zinc-900 border border-white/5 text-zinc-500 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">WhatsApp / Celular</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={customer.phone}
                      className="w-full h-11 px-3.5 text-xs bg-black border border-white/15 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CPF</label>
                    <input
                      disabled
                      type="text"
                      defaultValue={customer.cpf}
                      className="w-full h-11 px-3.5 text-xs bg-zinc-900 border border-white/5 text-zinc-500 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Graduação / Faixa de BJJ</label>
                    <select
                      value={belt}
                      onChange={(e) => setBelt(e.target.value)}
                      className="w-full h-11 px-3.5 text-xs bg-black border border-white/15 text-white"
                    >
                      <option>Faixa Branca</option>
                      <option>Faixa Azul</option>
                      <option>Faixa Roxa</option>
                      <option>Faixa Marrom</option>
                      <option>Faixa Preta</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Academia / Equipe</label>
                    <input
                      type="text"
                      value={academy}
                      onChange={(e) => setAcademy(e.target.value)}
                      className="w-full h-11 px-3.5 text-xs bg-black border border-white/15 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button type="submit" variant="primary" size="sm" className="w-full sm:w-auto cursor-pointer font-black h-11 px-6">
                    Salvar Alterações
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ABA 4: TROCAS & DEVOLUÇÕES */}
          {activeTab === 'returns' && (
            <div className="p-5 sm:p-6 bg-zinc-950 border border-white/10 space-y-6">
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white">
                  Política de Trocas & Devoluções
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">Garantia total de satisfação e caimento perfeito no tatame</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black border border-white/10 space-y-2">
                  <strong className="text-white block font-black uppercase text-[10px] tracking-wider">
                    1. {EXCHANGE_POLICY.windowLabel}
                  </strong>
                  <p className="text-zinc-400">{EXCHANGE_POLICY.windowDescription}</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-2">
                  <strong className="text-white block font-black uppercase text-[10px] tracking-wider">
                    2. {EXCHANGE_POLICY.conditionLabel}
                  </strong>
                  <p className="text-zinc-400">{EXCHANGE_POLICY.conditionDescription}</p>
                </div>

                <div className="p-4 bg-black border border-white/10 space-y-2">
                  <strong className="text-white block font-black uppercase text-[10px] tracking-wider">
                    3. {EXCHANGE_POLICY.logisticsLabel}
                  </strong>
                  <p className="text-zinc-400">{EXCHANGE_POLICY.logisticsDescription}</p>
                </div>
              </div>

              <div className="p-5 bg-black border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase text-white">Precisa trocar o tamanho da sua armadura?</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Nosso time de atendimento troca sua peça de forma ágil para você não perder nenhum treino.</p>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto shrink-0 text-xs font-bold h-10">
                  Solicitar Troca no WhatsApp
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
