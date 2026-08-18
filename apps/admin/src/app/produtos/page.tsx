'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@styfla/ui';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  pixPrice: number;
  totalStock: number;
  ibjjfRank: 'white-belt' | 'blue-belt' | 'purple-belt' | 'brown-belt' | 'black-belt';
  ibjjfText: string;
  isActive: boolean;
  image: string;
}

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'p1',
    name: 'Rash Guard Stealth 2.0 (No-Gi Pro)',
    category: 'Competição No-Gi',
    price: 219.9,
    pixPrice: 197.91,
    totalStock: 70,
    ibjjfRank: 'black-belt',
    ibjjfText: 'Faixa Preta',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    name: 'Rash Guard Ranked IBJJF (Faixa Azul)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    totalStock: 44,
    ibjjfRank: 'blue-belt',
    ibjjfText: 'Faixa Azul',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'p3',
    name: 'Rash Guard Ranked IBJJF (Faixa Roxa)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    totalStock: 28,
    ibjjfRank: 'purple-belt',
    ibjjfText: 'Faixa Roxa',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'p4',
    name: 'Rash Guard Ranked IBJJF (Faixa Marrom)',
    category: 'Graduação Oficial',
    price: 199.9,
    pixPrice: 179.91,
    totalStock: 24,
    ibjjfRank: 'brown-belt',
    ibjjfText: 'Faixa Marrom',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&auto=format&fit=crop&q=80',
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State para novo produto
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Competição No-Gi',
    price: 199.9,
    pixPrice: 179.91,
    ibjjfRank: 'black-belt' as const,
    ibjjfText: 'Faixa Preta',
    composition: '85% Poliamida / 15% Elastano',
    stockP: 10,
    stockM: 15,
    stockG: 12,
    stockGG: 8,
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(newProduct.stockP) + Number(newProduct.stockM) + Number(newProduct.stockG) + Number(newProduct.stockGG);
    
    const created: AdminProduct = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      pixPrice: Number(newProduct.pixPrice),
      totalStock: total,
      ibjjfRank: newProduct.ibjjfRank,
      ibjjfText: newProduct.ibjjfText,
      isActive: true,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80',
    };

    setProducts([created, ...products]);
    setIsModalOpen(false);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Catálogo de Rash Guards & Produtos
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Cadastre novas coleções, configure grades de tamanho e preços no PIX.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold"
        >
          <Plus className="w-4 h-4" /> Cadastrar Novo Produto
        </Button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="p-4 rounded-xl bg-[#111317] border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-[#E63946]"
          />
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          Exibindo <strong>{filtered.length}</strong> produtos
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="p-6 rounded-xl bg-[#111317] border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Produto</th>
              <th className="pb-3">Categoria</th>
              <th className="pb-3">Graduação IBJJF</th>
              <th className="pb-3">Preço PIX / Cartão</th>
              <th className="pb-3">Estoque Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-12 object-cover rounded bg-zinc-900 border border-white/10"
                  />
                  <div>
                    <h3 className="font-bold text-white text-xs">{prod.name}</h3>
                    <span className="text-[10px] font-mono text-zinc-500">ID: {prod.id}</span>
                  </div>
                </td>
                <td className="py-3.5 text-zinc-300">{prod.category}</td>
                <td className="py-3.5">
                  <Badge variant={prod.ibjjfRank} className="text-[9px]">
                    {prod.ibjjfText}
                  </Badge>
                </td>
                <td className="py-3.5">
                  <span className="font-bold text-[#00C08B] block">
                    R$ {prod.pixPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    R$ {prod.price.toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td className="py-3.5">
                  <span className="font-bold font-mono text-white text-xs">
                    {prod.totalStock} un
                  </span>
                </td>
                <td className="py-3.5">
                  <Badge variant={prod.isActive ? 'pix' : 'default'} className="text-[9px]">
                    {prod.isActive ? 'Ativo' : 'Pausado'}
                  </Badge>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setProducts(products.filter((p) => p.id !== prod.id))}
                    className="p-1.5 rounded bg-zinc-800 hover:bg-red-950/80 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Criação de Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#16181D] border border-white/10 rounded-2xl p-6 shadow-2xl text-[#F4F4F6] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#E63946]" /> Cadastrar Nova Rash Guard
                </h3>
                <p className="text-xs text-zinc-400">Preencha as especificações técnicas e estoque inicial da peça</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 pt-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-zinc-400">Nome do Produto *</label>
                <input
                  required
                  placeholder="Ex: Rash Guard Ranked IBJJF (Faixa Preta Pro)"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Categoria</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white"
                  >
                    <option>Competição No-Gi</option>
                    <option>Graduação Oficial</option>
                    <option>Coleção Street / Lifestyle</option>
                    <option>No-Gi Shorts</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Graduação IBJJF</label>
                  <select
                    value={newProduct.ibjjfRank}
                    onChange={(e) => {
                      const rank = e.target.value as any;
                      const textMap: any = {
                        'white-belt': 'Faixa Branca',
                        'blue-belt': 'Faixa Azul',
                        'purple-belt': 'Faixa Roxa',
                        'brown-belt': 'Faixa Marrom',
                        'black-belt': 'Faixa Preta',
                      };
                      setNewProduct({ ...newProduct, ibjjfRank: rank, ibjjfText: textMap[rank] });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white"
                  >
                    <option value="white-belt">Faixa Branca</option>
                    <option value="blue-belt">Faixa Azul</option>
                    <option value="purple-belt">Faixa Roxa</option>
                    <option value="brown-belt">Faixa Marrom</option>
                    <option value="black-belt">Faixa Preta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Preço Regular (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setNewProduct({ ...newProduct, price: p, pixPrice: +(p * 0.9).toFixed(2) });
                    }}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-white/10 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase text-[#00C08B]">Preço com Desconto PIX (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.pixPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, pixPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-emerald-800/40 text-[#00C08B] font-bold"
                  />
                </div>
              </div>

              {/* Grade de Estoque */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-3">
                <label className="text-[11px] font-bold uppercase text-white block">
                  Estoque Inicial por Tamanho
                </label>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold">Tam P</span>
                    <input
                      type="number"
                      value={newProduct.stockP}
                      onChange={(e) => setNewProduct({ ...newProduct, stockP: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-zinc-800 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold">Tam M</span>
                    <input
                      type="number"
                      value={newProduct.stockM}
                      onChange={(e) => setNewProduct({ ...newProduct, stockM: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-zinc-800 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold">Tam G</span>
                    <input
                      type="number"
                      value={newProduct.stockG}
                      onChange={(e) => setNewProduct({ ...newProduct, stockG: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-zinc-800 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold">Tam GG</span>
                    <input
                      type="number"
                      value={newProduct.stockGG}
                      onChange={(e) => setNewProduct({ ...newProduct, stockGG: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-zinc-800 border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
                >
                  Cancelar
                </button>
                <Button type="submit" variant="primary" size="sm">
                  Salvar Rash Guard
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
