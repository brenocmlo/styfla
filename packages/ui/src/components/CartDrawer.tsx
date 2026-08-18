'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';
import type { CartItemDTO } from '@styfla/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemDTO[];
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveItem: (variantId: string) => void;
  subtotal: number;
  pixSubtotal: number;
  freeShippingProgress: number;
  remainingForFreeShipping: number;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  pixSubtotal,
  freeShippingProgress,
  remainingForFreeShipping,
  onCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#000000] border-l border-white/15 text-[#FFFFFF] flex flex-col shadow-2xl animate-slide-left">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#080808]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-sm font-black uppercase tracking-widest text-white font-mono">
                Sua Sacola ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="p-4 bg-zinc-950 border-b border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-zinc-300">
                <Truck className="w-3.5 h-3.5 text-white" />
                {remainingForFreeShipping > 0 ? (
                  <>Faltam <strong className="text-white font-black">R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}</strong> para Frete Grátis</>
                ) : (
                  <strong className="text-white font-black tracking-wider">FRETE GRÁTIS DESBLOQUEADO</strong>
                )}
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-none overflow-hidden border border-white/10">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-none bg-zinc-950 border border-white/10 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest">Sua sacola está vazia</h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-[220px]">
                    Decida continuar. Escolha sua armadura para o tatame.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={onClose}>
                  Ver Coleção
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="p-3.5 bg-zinc-950 border border-white/10 flex gap-3.5 items-center justify-between"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-20 object-cover bg-zinc-900 border border-white/10 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate uppercase tracking-tight">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-zinc-900 text-zinc-300 border border-white/10">
                        TAM: {item.size}
                      </span>
                      {item.ibjjfRank && item.ibjjfRank !== 'NONE' && (
                        <Badge variant="outline" className="text-[8px] py-0 px-1">
                          IBJJF
                        </Badge>
                      )}
                    </div>

                    <div className="mt-2 flex items-baseline gap-1.5">
                      <span className="text-xs font-black text-white font-mono">
                        R$ {(item.pixPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase">no PIX</span>
                    </div>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-2.5 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.variantId)}
                      className="text-zinc-500 hover:text-white p-1 transition-colors cursor-pointer"
                      title="Remover item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-white/20 bg-black">
                      <button
                        onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-white/15 bg-[#080808] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-white pt-1 border-t border-white/10">
                  <span className="text-xs uppercase tracking-wider">Total à Vista (PIX):</span>
                  <div className="text-right">
                    <span className="text-lg font-black text-white font-mono">
                      R$ {pixSubtotal.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="block text-[10px] text-zinc-400 font-normal">
                      ou R$ {subtotal.toFixed(2).replace('.', ',')} em até 3x sem juros
                    </span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={onCheckout}
                className="w-full flex items-center justify-center gap-2 mt-2 font-black tracking-widest text-xs py-4"
              >
                Finalizar Compra <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
