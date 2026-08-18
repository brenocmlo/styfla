'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from '@styfla/ui';
import { useRouter } from 'next/navigation';

export function GlobalCart() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    pixSubtotal,
    freeShippingProgress,
    remainingForFreeShipping,
  } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <CartDrawer
      isOpen={isOpen}
      onClose={closeCart}
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      subtotal={subtotal()}
      pixSubtotal={pixSubtotal()}
      freeShippingProgress={freeShippingProgress()}
      remainingForFreeShipping={remainingForFreeShipping()}
      onCheckout={handleCheckout}
    />
  );
}
