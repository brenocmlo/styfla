import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_mock_styfla_key_2026';

export const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2025-01-27.acacia' as any,
  appInfo: {
    name: 'STYFLA High Performance Jiu-Jitsu',
    version: '1.0.0',
  },
});

export interface CreatePaymentIntentParams {
  amountBrl: number;
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  paymentMethodType?: 'card' | 'pix' | 'all';
}

export class StripePaymentService {
  /**
   * Cria um PaymentIntent na Stripe para processar cartão de crédito ou PIX em BRL.
   */
  static async createPaymentIntent({
    amountBrl,
    orderId,
    orderNumber,
    customerEmail,
    paymentMethodType = 'all',
  }: CreatePaymentIntentParams) {
    const amountInCents = Math.round(amountBrl * 100);

    const paymentMethodTypes =
      paymentMethodType === 'card'
        ? ['card']
        : paymentMethodType === 'pix'
        ? ['pix']
        : ['card', 'pix'];

    try {
      const intent = await stripeClient.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        payment_method_types: paymentMethodTypes,
        receipt_email: customerEmail,
        metadata: {
          orderId,
          orderNumber,
          store: 'STYFLA',
        },
      });

      return {
        success: true,
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        status: intent.status,
      };
    } catch (error: any) {
      console.error('❌ Erro ao criar Stripe PaymentIntent:', error);
      return {
        success: false,
        error: error.message || 'Falha ao conectar com o gateway de pagamento Stripe.',
      };
    }
  }

  /**
   * Valida a assinatura do Webhook da Stripe.
   */
  static constructWebhookEvent(payload: string | Buffer, signature: string, secret: string) {
    return stripeClient.webhooks.constructEvent(payload, signature, secret);
  }
}
