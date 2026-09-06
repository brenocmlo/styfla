import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
export const isStripeClientConfigured = publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_');

/**
 * Retorna uma promessa singleton do Stripe no frontend.
 * Garante que o SDK do Stripe.js seja carregado apenas uma vez.
 */
export function getStripePromise(): Promise<Stripe | null> {
  if (!stripePromise) {
    if (isStripeClientConfigured) {
      stripePromise = loadStripe(publishableKey);
    } else {
      // Retorna null caso não haja chave pública válida em ambiente dev
      stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
}
