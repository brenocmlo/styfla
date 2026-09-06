'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const count = totalItems();

  return (
    <header className="sticky top-0 z-40 bg-[#000000]/95 backdrop-blur-md border-b border-white/10 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative inline-flex">
              <img
                src="/brand/symbol.png"
                alt="STYFLA Icon"
                className="h-6 w-auto object-contain brightness-100 group-hover:scale-105 transition-transform"
              />
              <TrademarkBadge size="xs" className="absolute -top-1 -right-2 text-zinc-300" />
            </span>
            <span className="inline-flex items-start gap-0.5">
              <img
                src="/brand/logo.png"
                alt="STYFLA"
                className="h-6 w-auto object-contain brightness-100 group-hover:opacity-90 transition-opacity"
              />
              <TrademarkBadge size="xs" className="text-zinc-300" />
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-black tracking-widest text-zinc-400">
            <Link href="/#historia" className="hover:text-white transition-colors">Nossa História</Link>
            <Link href="/#flashboy" className="hover:text-white transition-colors">Flashboy</Link>
            <Link href="/#rash-guards" className="hover:text-white transition-colors">Rash Guards</Link>
            <Link href="/#kimonos" className="hover:text-white transition-colors">Kimonos</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/conta"
            className="flex items-center gap-1.5 p-2 text-zinc-300 hover:text-white transition-colors text-xs font-black uppercase hover:bg-white/5 tracking-wider"
            title="Minha Conta / Meus Pedidos"
          >
            <User className="w-4 h-4 text-zinc-300" />
            <span className="hidden sm:inline">Minha Conta</span>
          </Link>

          <button
            onClick={openCart}
            className="relative p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer hover:bg-white/5"
            aria-label="Abrir Sacola"
          >
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black text-[10px] font-black rounded-none flex items-center justify-center animate-scale-in font-mono">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
