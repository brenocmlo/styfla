'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@styfla/ui';
import { EXCHANGE_POLICY } from '@/lib/policies';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Shield,
  RotateCcw,
  Truck,
  CheckCircle2,
  ChevronRight,
  Plus,
  ExternalLink,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

interface OrderMock {
  id: string;
  orderNumber: string;
  date: string;
  status: 'DELIVERED' | 'SHIPPED' | 'PROCESSING' | 'PENDING';
  statusText: string;
  total: number;
  paymentMethod: 'PIX' | 'CREDIT_CARD';
  trackingCode?: string;
  carrier?: string;
  estimatedDelivery?: string;
  items: Array<{
    title: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
    ibjjfRank: string;
  }>;
}

const INITIAL_ORDERS: OrderMock[] = [
  {
    id: 'ord-1',
    orderNumber: 'STY-98421',
    date: '16 de Agosto de 2026',
    status: 'SHIPPED',
    statusText: 'Em Trânsito',
    total: 219.9,
    paymentMethod: 'PIX',
    trackingCode: 'BR948271034AA',
    carrier: 'Correios SEDEX',
    estimatedDelivery: '19 de Agosto de 2026',
    items: [
      {
        title: 'Rash Guard Stealth 2.0 (No-Gi Pro)',
        size: 'G',
        quantity: 1,
        price: 197.91,
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
        ibjjfRank: 'Preta',
      },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: 'STY-87319',
    date: '02 de Julho de 2026',
    status: 'DELIVERED',
    statusText: 'Entregue',
    total: 359.82,
    paymentMethod: 'PIX',
    trackingCode: 'BR817362541AA',
    carrier: 'Correios SEDEX',
    items: [
      {
        title: 'Rash Guard Ranked IBJJF (Faixa Roxa)',
        size: 'G',
        quantity: 1,
        price: 179.91,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=80',
        ibjjfRank: 'Roxa',
      },
      {
        title: 'Rash Guard Ranked IBJJF (Faixa Azul)',
        size: 'M',
        quantity: 1,
        price: 179.91,
        image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&auto=format&fit=crop&q=80',
        ibjjfRank: 'Azul',
      },
    ],
  },
];

interface AddressMock {
  id: string;
  title: string;
  recipient: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: AddressMock[] = [
  {
    id: 'addr-1',
    title: 'Minha Casa',
    recipient: 'Carlos Gracie Silva',
    street: 'Av. Paulista',
    number: '1842',
    complement: 'Apto 102',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-200',
    isDefault: true,
  },
  {
    id: 'addr-2',
    title: 'Centro de Treinamento / Academia',
    recipient: 'Carlos Gracie Silva (CT BJJ)',
    street: 'Rua Augusta',
    number: '500',
    neighborhood: 'Consolação',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01304-000',
    isDefault: false,
  },
];

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile' | 'returns'>('orders');
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Carlos Gracie Silva',
    email: 'carlos.gracie@bjjathlete.com.br',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    belt: 'Faixa Preta',
    academy: 'Gracie Barra Jardins',
  });

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header & Welcome Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white text-black font-mono text-xl font-black flex items-center justify-center shadow-lg">
              CG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                  {profileData.name}
                </h1>
                <Badge variant="black-belt" className="text-[10px] py-0.5">
                  {profileData.belt}
                </Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                {profileData.email} &bull; MEMBRO STYFLA DESDE 2026
              </p>
            </div>
          </div>

          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5 text-xs font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Loja
            </Button>
          </Link>
        </div>

        {/* Layout com Sidebar e Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Menu Lateral de Navegação (3 colunas) */}
          <div className="lg:col-span-3 space-y-2">
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
                <span className="text-[10px] font-mono opacity-80">({INITIAL_ORDERS.length})</span>
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
                <span className="text-[10px] font-mono opacity-80">({addresses.length})</span>
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

            {/* Suporte Rápido */}
            <div className="p-4 bg-zinc-950 border border-white/10 space-y-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 font-bold text-white uppercase text-[10px] tracking-wider">
                <Shield className="w-4 h-4 text-white" /> Garantia Styfla
              </div>
              <p className="text-[11px] leading-relaxed">
                Costuras com garantia contra defeitos de fábrica. Dúvidas com seu tamanho? Fale com nosso suporte.
              </p>
            </div>
          </div>

          {/* Painel de Conteúdo Principal (9 colunas) */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ABA 1: MEUS PEDIDOS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">
                    Histórico de Pedidos & Rastreamento
                  </h2>
                  <span className="text-xs text-zinc-400 font-mono">Status em tempo real</span>
                </div>

                <div className="space-y-4">
                  {INITIAL_ORDERS.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 bg-zinc-950 border border-white/10 space-y-5"
                    >
                      {/* Header do Pedido */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                        <div>
                          <div className="flex items-center gap-3">
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
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                          </span>
                        </div>
                      </div>

                      {/* Timeline de Rastreio */}
                      {order.status === 'SHIPPED' && (
                        <div className="p-4 bg-black border border-white/10 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-bold text-white uppercase font-mono">
                              <Truck className="w-4 h-4 text-white" /> {order.carrier} &bull; CÓDIGO: {order.trackingCode}
                            </span>
                            <span className="text-zinc-400">Previsão: <strong className="text-white">{order.estimatedDelivery}</strong></span>
                          </div>

                          <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-bold uppercase tracking-wider">
                            <div className="text-white">
                              <div className="h-1 bg-white mb-1.5"></div>
                              Pago
                            </div>
                            <div className="text-white">
                              <div className="h-1 bg-white mb-1.5"></div>
                              Em Separação
                            </div>
                            <div className="text-white">
                              <div className="h-1 bg-white mb-1.5 animate-pulse"></div>
                              Em Trânsito
                            </div>
                            <div className="text-zinc-600">
                              <div className="h-1 bg-zinc-800 mb-1.5"></div>
                              Entregue
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lista de Itens do Pedido */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-14 object-cover bg-black border border-white/10"
                              />
                              <div>
                                <h4 className="text-xs font-bold text-white uppercase">{item.title}</h4>
                                <span className="text-[10px] text-zinc-400 font-mono">
                                  TAM: <strong className="text-white">{item.size}</strong> &bull; QTD: {item.quantity}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs font-black text-white font-mono">
                              R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Ações do Pedido */}
                      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                        {order.trackingCode ? (
                          <a
                            href={`https://rastreamento.correios.com.br/app/index.php?codigo=${order.trackingCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:underline font-bold flex items-center gap-1 cursor-pointer uppercase text-[11px]"
                          >
                            Rastrear nos Correios <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : <div />}

                        <div className="flex gap-2">
                          <Link href="/produto/rash-guard-stealth-2-0">
                            <button className="px-3 py-1.5 bg-zinc-900 border border-white/10 text-white hover:bg-white hover:text-black text-xs font-bold uppercase transition-colors cursor-pointer">
                              Comprar Novamente
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <p className="text-xs text-zinc-400 mt-0.5">Gerencie os locais onde você recebe suas armaduras</p>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="flex items-center gap-1.5 text-xs font-black"
                  >
                    <Plus className="w-3.5 h-3.5" /> Novo Endereço
                  </Button>
                </div>

                {isAddingAddress && (
                  <div className="p-6 bg-zinc-950 border border-white/20 space-y-4 animate-fade-in">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Adicionar Novo Endereço
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        placeholder="Identificação (Ex: Casa, CT)"
                        className="px-3 py-2 text-xs bg-black border border-white/15 text-white"
                      />
                      <input
                        placeholder="CEP (00000-000)"
                        className="px-3 py-2 text-xs bg-black border border-white/15 text-white font-mono"
                      />
                      <input
                        placeholder="Rua / Logradouro"
                        className="sm:col-span-2 px-3 py-2 text-xs bg-black border border-white/15 text-white"
                      />
                      <input
                        placeholder="Número"
                        className="px-3 py-2 text-xs bg-black border border-white/15 text-white font-mono"
                      />
                      <input
                        placeholder="Bairro"
                        className="px-3 py-2 text-xs bg-black border border-white/15 text-white"
                      />
                      <input
                        placeholder="Cidade"
                        className="px-3 py-2 text-xs bg-black border border-white/15 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <Button variant="primary" size="sm" onClick={() => setIsAddingAddress(false)}>
                        Salvar Endereço
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
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
                        {addr.isDefault ? (
                          <Badge variant="white">Padrão</Badge>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="text-[10px] font-bold text-zinc-400 hover:text-white cursor-pointer uppercase"
                          >
                            Definir como Padrão
                          </button>
                        )}
                      </div>

                      <div className="text-xs text-zinc-300 space-y-1">
                        <strong className="text-white block font-semibold">{addr.recipient}</strong>
                        <p>{addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`}</p>
                        <p>{addr.neighborhood} &bull; {addr.city}/{addr.state}</p>
                        <p className="font-mono text-zinc-400">CEP: {addr.zipCode}</p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-end gap-3 text-xs">
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="text-zinc-500 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA 3: DADOS DO ATLETA */}
            {activeTab === 'profile' && (
              <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-white">
                    Dados Cadastrais do Atleta
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">Mantenha seus dados atualizados para faturamento e suporte</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome Completo</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-black border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">E-mail</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-black border border-white/15 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">WhatsApp / Celular</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-black border border-white/15 text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CPF</label>
                    <input
                      disabled
                      type="text"
                      value={profileData.cpf}
                      className="w-full px-3 py-2 text-xs bg-zinc-900 border border-white/5 text-zinc-500 cursor-not-allowed font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Graduação / Faixa de BJJ</label>
                    <select
                      value={profileData.belt}
                      onChange={(e) => setProfileData({ ...profileData, belt: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-black border border-white/15 text-white"
                    >
                      <option>Faixa Branca</option>
                      <option>Faixa Azul</option>
                      <option>Faixa Roxa</option>
                      <option>Faixa Marrom</option>
                      <option>Faixa Preta</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Academia / Equipe</label>
                    <input
                      type="text"
                      value={profileData.academy}
                      onChange={(e) => setProfileData({ ...profileData, academy: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-black border border-white/15 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <Button variant="primary" size="sm">
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}

            {/* ABA 4: TROCAS & DEVOLUÇÕES */}
            {activeTab === 'returns' && (
              <div className="p-6 bg-zinc-950 border border-white/10 space-y-6">
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
                  <Button variant="outline" size="sm" className="shrink-0 text-xs font-bold">
                    Solicitar Troca no WhatsApp
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
