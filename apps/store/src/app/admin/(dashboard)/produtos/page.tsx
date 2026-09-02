'use client';

import React, { useState } from 'react';
import { Button, Badge } from '@styfla/ui';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  color: 'PRETO' | 'AZUL' | 'BRANCO';
  price: number;
  pixPrice: number;
  totalStock: number;
  isActive: boolean;
  image: string;
}

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'p1',
    name: 'Rash Guard Stealth Black (No-Gi Pro)',
    category: 'Rash Guards',
    color: 'PRETO',
    price: 219.9,
    pixPrice: 197.91,
    totalStock: 66,
    isActive: true,
    image: '/products/rash-guard-preta-frente.jpg',
  },
  {
    id: 'p2',
    name: 'Rash Guard Velocity Blue (No-Gi Pro)',
    category: 'Rash Guards',
    color: 'AZUL',
    price: 219.9,
    pixPrice: 197.91,
    totalStock: 44,
    isActive: true,
    image: '/products/rash-guard-azul-frente.jpg',
  },
  {
    id: 'p3',
    name: 'Conjunto No-Gi Stealth Black (Rash + Short)',
    category: 'Conjuntos',
    color: 'PRETO',
    price: 359.9,
    pixPrice: 323.91,
    totalStock: 37,
    isActive: true,
    image: '/products/rash-guard-preta-frente.jpg',
  },
  {
    id: 'p4',
    name: 'Conjunto No-Gi Velocity Blue (Rash + Short)',
    category: 'Conjuntos',
    color: 'AZUL',
    price: 359.9,
    pixPrice: 323.91,
    totalStock: 30,
    isActive: true,
    image: '/products/rash-guard-azul-frente.jpg',
  },
  {
    id: 'p5',
    name: 'Short STYFLA Preto (Fight Shorts)',
    category: 'Shorts',
    color: 'PRETO',
    price: 179.9,
    pixPrice: 161.91,
    totalStock: 46,
    isActive: true,
    image: '/products/short-preto.jpg',
  },
  {
    id: 'p6',
    name: 'Short STYFLA Branco/Azul (Fight Shorts)',
    category: 'Shorts',
    color: 'AZUL',
    price: 179.9,
    pixPrice: 161.91,
    totalStock: 36,
    isActive: true,
    image: '/products/short-branco-frente.jpg',
  },
  {
    id: 'p7',
    name: 'Kimono STYFLA // ORIGIN_001',
    category: 'Kimonos',
    color: 'PRETO',
    price: 599.9,
    pixPrice: 539.91,
    totalStock: 58,
    isActive: true,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80',
  },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Form State para novo produto ou edição
  const [formState, setFormState] = useState({
    name: '',
    category: 'Rash Guards',
    color: 'PRETO' as 'PRETO' | 'AZUL' | 'BRANCO',
    price: 219.9,
    pixPrice: 197.91,
    stockP: 10,
    stockM: 15,
    stockG: 12,
    stockGG: 8,
    image: '/products/rash-guard-preta-frente.jpg',
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      category: 'Rash Guards',
      color: 'PRETO',
      price: 219.9,
      pixPrice: 197.91,
      stockP: 10,
      stockM: 15,
      stockG: 12,
      stockGG: 8,
      image: '/products/rash-guard-preta-frente.jpg',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: AdminProduct) => {
    setEditingProduct(prod);
    setFormState({
      name: prod.name,
      category: prod.category,
      color: prod.color,
      price: prod.price,
      pixPrice: prod.pixPrice,
      stockP: Math.floor(prod.totalStock / 4),
      stockM: Math.floor(prod.totalStock / 4),
      stockG: Math.floor(prod.totalStock / 4),
      stockGG: Math.floor(prod.totalStock / 4),
      image: prod.image,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const total = Number(formState.stockP) + Number(formState.stockM) + Number(formState.stockG) + Number(formState.stockGG);

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formState.name,
                category: formState.category,
                color: formState.color,
                price: Number(formState.price),
                pixPrice: Number(formState.pixPrice),
                totalStock: total,
                image: formState.image,
              }
            : p
        )
      );
    } else {
      const created: AdminProduct = {
        id: `p-${Date.now()}`,
        name: formState.name,
        category: formState.category,
        color: formState.color,
        price: Number(formState.price),
        pixPrice: Number(formState.pixPrice),
        totalStock: total,
        isActive: true,
        image: formState.image,
      };
      setProducts([created, ...products]);
    }

    setIsModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Title & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            Catálogo de Rash Guards, Conjuntos & Shorts
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestão direta do catálogo de peças nas cores Preto e Azul com preços no PIX.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 text-xs font-bold h-11 px-5 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Cadastrar Novo Produto
        </Button>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="p-4 bg-zinc-950 border border-white/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome, cor ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-black border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-white font-sans"
          />
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          Exibindo <strong>{filtered.length}</strong> itens no catálogo
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="p-6 bg-zinc-950 border border-white/10 overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3">Produto</th>
              <th className="pb-3">Categoria</th>
              <th className="pb-3">Cor da Coleção</th>
              <th className="pb-3">Preço PIX / Cartão</th>
              <th className="pb-3">Estoque Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-300 font-sans">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-white/[0.02]">
                <td className="py-3.5 flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-12 object-cover bg-black border border-white/10 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-white text-xs uppercase">{prod.name}</h3>
                    <span className="text-[10px] font-mono text-zinc-500">ID: {prod.id}</span>
                  </div>
                </td>
                <td className="py-3.5 text-zinc-300 font-bold">{prod.category}</td>
                <td className="py-3.5">
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                    prod.color === 'PRETO'
                      ? 'bg-black text-white border-white/30'
                      : 'bg-zinc-900 text-zinc-200 border-white/20'
                  }`}>
                    {prod.color}
                  </span>
                </td>
                <td className="py-3.5">
                  <span className="font-bold text-white font-mono block">
                    R$ {prod.pixPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Cartão: R$ {prod.price.toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td className="py-3.5">
                  <span className="font-bold font-mono text-white text-xs">
                    {prod.totalStock} un
                  </span>
                </td>
                <td className="py-3.5">
                  <button
                    onClick={() => toggleStatus(prod.id)}
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase border cursor-pointer ${
                      prod.isActive
                        ? 'bg-white text-black border-white'
                        : 'bg-black text-zinc-500 border-white/10'
                    }`}
                  >
                    {prod.isActive ? 'Ativo na Loja' : 'Pausado'}
                  </button>
                </td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="px-2.5 py-1 bg-zinc-900 border border-white/20 text-white hover:bg-white hover:text-black transition-colors cursor-pointer text-[11px] font-bold uppercase"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setProducts(products.filter((p) => p.id !== prod.id))}
                    className="p-1.5 bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Excluir produto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Criação / Edição de Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-white/20 p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-white" />
                  {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                </h3>
                <p className="text-xs text-zinc-400">Configure nome, coleção (Preto/Azul), preços e estoque</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-zinc-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nome do Produto *</label>
                <input
                  required
                  placeholder="Ex: Rash Guard Stealth Black (No-Gi Pro)"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full h-11 px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Categoria</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full h-11 px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  >
                    <option>Rash Guards</option>
                    <option>Conjuntos</option>
                    <option>Shorts</option>
                    <option>Kimonos</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Cor da Coleção</label>
                  <select
                    value={formState.color}
                    onChange={(e) => setFormState({ ...formState, color: e.target.value as any })}
                    className="w-full h-11 px-3 py-2 text-xs bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  >
                    <option value="PRETO">Coleção Preta</option>
                    <option value="AZUL">Coleção Azul</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Preço Regular (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formState.price}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setFormState({ ...formState, price: p, pixPrice: +(p * 0.9).toFixed(2) });
                    }}
                    className="w-full h-11 px-3 py-2 text-xs bg-black border border-white/20 text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white">Preço 10% OFF no PIX (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formState.pixPrice}
                    onChange={(e) => setFormState({ ...formState, pixPrice: Number(e.target.value) })}
                    className="w-full h-11 px-3 py-2 text-xs bg-black border border-white text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">URL da Foto Principal</label>
                <input
                  type="text"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full h-11 px-3 py-2 text-xs bg-black border border-white/20 text-white font-mono"
                />
              </div>

              {/* Grade de Estoque */}
              <div className="p-4 bg-black border border-white/10 space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-white block">
                  Estoque por Tamanho
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold block">Tam P</span>
                    <input
                      type="number"
                      value={formState.stockP}
                      onChange={(e) => setFormState({ ...formState, stockP: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 text-xs bg-zinc-900 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold block">Tam M</span>
                    <input
                      type="number"
                      value={formState.stockM}
                      onChange={(e) => setFormState({ ...formState, stockM: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 text-xs bg-zinc-900 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold block">Tam G</span>
                    <input
                      type="number"
                      value={formState.stockG}
                      onChange={(e) => setFormState({ ...formState, stockG: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 text-xs bg-zinc-900 border border-white/10 text-white font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-400 font-bold block">Tam GG</span>
                    <input
                      type="number"
                      value={formState.stockGG}
                      onChange={(e) => setFormState({ ...formState, stockGG: Number(e.target.value) })}
                      className="w-full px-2 py-1.5 text-xs bg-zinc-900 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <Button type="submit" variant="primary" size="sm" className="font-black h-11 px-6">
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Peça'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
