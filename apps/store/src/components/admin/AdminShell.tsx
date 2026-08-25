'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Boxes,
  TicketPercent,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { logoutAdmin } from '@/app/admin/login/actions';
import { TrademarkBadge } from '@/components/brand/TrademarkBadge';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Pedidos & Envios', href: '/admin/pedidos', icon: ShoppingBag, badge: '3' },
    { name: 'Catálogo de Produtos', href: '/admin/produtos', icon: Package },
    { name: 'Estoque por SKU', href: '/admin/estoque', icon: Boxes, alert: true },
    { name: 'Cupons & Descontos', href: '/admin/cupons', icon: TicketPercent },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#000000] text-[#FFFFFF]">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#080808] border-r border-white/10 shrink-0 select-none">
        {/* Brand Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="inline-flex items-start gap-0.5">
              <img src="/brand/logo.png" alt="STYFLA" className="h-6 w-auto object-contain" />
              <TrademarkBadge size="xs" className="text-zinc-400" />
            </span>
            <span className="text-[9px] uppercase font-mono font-black bg-white text-black px-1.5 py-0.5 tracking-widest">
              ADMIN
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-white text-black shadow-lg font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.5 font-mono font-bold ${
                    isActive ? 'bg-black text-white' : 'bg-zinc-900 text-white border border-white/10'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.alert && !isActive && (
                  <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Quick Link to Store */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-black">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>VPS ONLINE &bull; STYFLA v1.0</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-zinc-900 hover:bg-white hover:text-black border border-white/20 text-xs font-black uppercase text-white transition-all cursor-pointer tracking-wider"
          >
            Abrir Loja Virtual <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 bg-transparent hover:bg-white/5 border border-white/10 text-xs font-black uppercase text-zinc-400 hover:text-white transition-all cursor-pointer tracking-wider"
            >
              Sair <LogOut className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/10 bg-[#080808]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-[11px] font-mono font-black uppercase tracking-[0.25em] text-zinc-400 hidden sm:inline">
              STYFLA &bull; DECIDA CONTINUAR
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black border border-white/20 text-[10px] text-white font-mono font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-white animate-ping" />
              Sistemas Operacionais
            </div>

            <div className="w-8 h-8 bg-white text-black font-mono text-xs font-black flex items-center justify-center">
              ADM
            </div>
          </div>
        </header>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden p-4 bg-[#080808] border-b border-white/10 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-black uppercase ${
                    isActive ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
