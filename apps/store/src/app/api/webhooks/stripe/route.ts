import { NextResponse } from 'next/server';
import { StripePaymentService } from '@styfla/services';
import { prisma } from '@styfla/database';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.warn('⚠️ Webhook Stripe recebido sem assinatura ou STRIPE_WEBHOOK_SECRET configurado.');
    return NextResponse.json({ received: true, note: 'Webhook recebido em ambiente local sem verificação' });
  }

  try {
    const event = StripePaymentService.constructWebhookEvent(body, signature, webhookSecret);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      const orderId = paymentIntent.metadata?.orderId;

      console.log(`✅ Pagamento Stripe confirmado! PaymentIntent: ${paymentIntent.id}, OrderId: ${orderId}`);

      if (orderId && orderId !== 'temp-order') {
        // Atualiza o status do pedido no PostgreSQL via Prisma
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'PAID',
            payment: {
              update: {
                status: 'PAID',
                paidAt: new Date(),
              },
            },
          },
        });
        console.log(`📦 Status do Pedido #${orderId} atualizado para PAID no PostgreSQL.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`❌ Erro no processamento do Webhook da Stripe:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
