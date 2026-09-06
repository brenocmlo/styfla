import Stripe from 'stripe';

const rawStripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const isRealKey = rawStripeSecretKey.startsWith('sk_test_') || rawStripeSecretKey.startsWith('sk_live_');

export const isStripeConfigured = isRealKey;

export const stripeClient = isRealKey
  ? new Stripe(rawStripeSecretKey, {
      apiVersion: '2025-01-27.acacia' as any,
      appInfo: {
        name: 'STYFLA High Performance Jiu-Jitsu',
        version: '1.0.0',
      },
    })
  : null;

export interface CreatePaymentIntentParams {
  amountBrl: number;
  orderId: string;
  orderNumber: string | number;
  customerEmail: string;
  customerName?: string;
  customerCpf?: string;
  paymentMethodType?: 'card' | 'pix' | 'all';
  description?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResult {
  success: boolean;
  clientSecret?: string | null;
  paymentIntentId?: string;
  status?: string;
  error?: string;
  isMock?: boolean;
}

export class StripePaymentService {
  /**
   * Verifica se a Stripe possui credenciais válidas configuradas nas variáveis de ambiente.
   */
  static isConfigured(): boolean {
    return isStripeConfigured;
  }

  /**
   * Cria um PaymentIntent na Stripe para processar cartão de crédito ou PIX em BRL.
   */
  static async createPaymentIntent({
    amountBrl,
    orderId,
    orderNumber,
    customerEmail,
    customerName,
    customerCpf,
    paymentMethodType = 'card',
    description,
    metadata = {},
  }: CreatePaymentIntentParams): Promise<PaymentIntentResult> {
    const amountInCents = Math.max(100, Math.round(amountBrl * 100)); // Mínimo de 1 real (100 centavos)

    // Fallback gracioso para ambiente de desenvolvimento local sem chaves configuradas
    if (!stripeClient || !isRealKey) {
      const mockId = `pi_mock_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const mockSecret = `${mockId}_secret_${Math.random().toString(36).substring(2, 15)}`;

      console.warn('⚠️ Stripe rodando em modo DEMO/MOCK (STRIPE_SECRET_KEY não configurada ou inválida).');

      return {
        success: true,
        clientSecret: mockSecret,
        paymentIntentId: mockId,
        status: 'requires_payment_method',
        isMock: true,
      };
    }

    try {
      const paymentMethodTypes =
        paymentMethodType === 'card'
          ? ['card']
          : paymentMethodType === 'pix'
          ? ['pix']
          : ['card', 'pix'];

      const intent = await stripeClient.paymentIntents.create({
        amount: amountInCents,
        currency: 'brl',
        payment_method_types: paymentMethodTypes,
        receipt_email: customerEmail,
        description: description || `Pedido #${orderNumber} - STYFLA Jiu-Jitsu`,
        metadata: {
          orderId,
          orderNumber: String(orderNumber),
          customerName: customerName || 'Atleta STYFLA',
          customerCpf: customerCpf || '',
          store: 'STYFLA',
          ...metadata,
        },
      });

      return {
        success: true,
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        status: intent.status,
        isMock: false,
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
   * Recupera os detalhes de um PaymentIntent existente pelo ID.
   */
  static async getPaymentIntent(paymentIntentId: string) {
    if (!stripeClient || !isRealKey) {
      return {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 19990,
        currency: 'brl',
      };
    }

    try {
      return await stripeClient.paymentIntents.retrieve(paymentIntentId);
    } catch (error: any) {
      console.error(`❌ Erro ao buscar PaymentIntent ${paymentIntentId}:`, error);
      return null;
    }
  }

  /**
   * Cria um estorno / reembolso de pagamento.
   */
  static async createRefund(paymentIntentId: string, amountBrl?: number) {
    if (!stripeClient || !isRealKey) {
      return { success: true, id: `re_mock_${Date.now()}` };
    }

    try {
      const params: Stripe.RefundCreateParams = {
        payment_intent: paymentIntentId,
      };
      if (amountBrl) {
        params.amount = Math.round(amountBrl * 100);
      }
      const refund = await stripeClient.refunds.create(params);
      return { success: true, refund };
    } catch (error: any) {
      console.error(`❌ Erro ao realizar reembolso do PaymentIntent ${paymentIntentId}:`, error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Valida a assinatura do Webhook da Stripe.
   */
  static constructWebhookEvent(payload: string | Buffer, signature: string, secret: string) {
    if (!stripeClient) {
      throw new Error('Stripe client não está inicializado.');
    }
    return stripeClient.webhooks.constructEvent(payload, signature, secret);
  }
}
