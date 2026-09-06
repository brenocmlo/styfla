import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItemDTO } from '@/types';

interface CartState {
  items: CartItemDTO[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItemDTO, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  pixSubtotal: () => number;
  freeShippingThreshold: number;
  remainingForFreeShipping: () => number;
  freeShippingProgress: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      freeShippingThreshold: 299.0,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (item) => item.variantId === newItem.variantId
        );

        const quantityToAdd = newItem.quantity || 1;

        if (existingItemIndex > -1) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantityToAdd;
          set({ items: updatedItems, isOpen: true });
        } else {
          set({
            items: [...currentItems, { ...newItem, quantity: quantityToAdd }],
            isOpen: true,
          });
        }
      },

      removeItem: (variantId: string) => {
        set({
          items: get().items.filter((item) => item.variantId !== variantId),
        });
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      subtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      pixSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.pixPrice * item.quantity, 0);
      },

      remainingForFreeShipping: () => {
        const diff = get().freeShippingThreshold - get().subtotal();
        return diff > 0 ? diff : 0;
      },

      freeShippingProgress: () => {
        const sub = get().subtotal();
        const threshold = get().freeShippingThreshold;
        return Math.min(100, Math.round((sub / threshold) * 100));
      },
    }),
    {
      name: 'styfla-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
