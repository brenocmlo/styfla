import { NextResponse } from 'next/server';
import { StripePaymentService } from '@styfla/services';
import { prisma, OrderStatus, PaymentStatus } from '@styfla/database';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  if (signature && webhookSecret) {
    try {
      event = StripePaymentService.constructWebhookEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('❌ Erro na validação da assinatura do Webhook Stripe:', err.message);
      return NextResponse.json({ error: `Webhook Signature Verification Error: ${err.message}` }, { status: 400 });
    }
  } else {
    // Modo de desenvolvimento local ou teste sem assinatura estrita
    try {
      event = JSON.parse(body);
      console.warn('⚠️ Webhook Stripe processado em modo desenvolvimento sem verificação de assinatura.');
    } catch (err: any) {
      return NextResponse.json({ error: 'Payload JSON inválido.' }, { status: 400 });
    }
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        const transactionId = paymentIntent.id;

        console.log(`✅ [Stripe Webhook] Pagamento aprovado! Intent: ${transactionId}, OrderId: ${orderId}`);

        if (orderId && !orderId.startsWith('temp-ord-')) {
          // 1. Atualiza o status do pedido e pagamento no PostgreSQL
          const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
              status: OrderStatus.PAID,
              payment: {
                update: {
                  status: PaymentStatus.PAID,
                  transactionId,
                  paidAt: new Date(),
                  rawResponse: paymentIntent,
                },
              },
            },
            include: {
              items: true,
            },
          });

          // 2. Dar baixa no estoque de cada variante comprada
          for (const item of updatedOrder.items) {
            try {
              if (item.productVariantId && item.productVariantId !== 'var-default') {
                await prisma.productVariant.update({
                  where: { id: item.productVariantId },
                  data: {
                    stock: {
                      decrement: item.quantity,
                    },
                  },
                });
                console.log(`📉 Estoque decrementado para variante ${item.productVariantId} (-${item.quantity})`);
              }
            } catch (stockErr) {
              console.warn(`⚠️ Não foi possível decrementar estoque da variante ${item.productVariantId}:`, stockErr);
            }
          }

          console.log(`📦 Pedido #${updatedOrder.orderNumber} atualizado para PAID e estoque ajustado com sucesso.`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        const lastError = paymentIntent.last_payment_error?.message || 'Falha no processamento do cartão.';

        console.warn(`❌ [Stripe Webhook] Pagamento falhou. Intent: ${paymentIntent.id}, Motivo: ${lastError}`);

        if (orderId && !orderId.startsWith('temp-ord-')) {
          await prisma.payment.update({
            where: { orderId },
            data: {
              status: PaymentStatus.REFUSED,
              rawResponse: paymentIntent,
            },
          });
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;

        console.log(`🔄 [Stripe Webhook] Reembolso processado. Charge: ${charge.id}, Intent: ${paymentIntentId}`);

        if (paymentIntentId) {
          const payment = await prisma.payment.findFirst({
            where: { transactionId: paymentIntentId },
            include: { order: true },
          });

          if (payment) {
            await prisma.order.update({
              where: { id: payment.orderId },
              data: {
                status: OrderStatus.REFUNDED,
                payment: {
                  update: {
                    status: PaymentStatus.REFUNDED,
                    rawResponse: charge,
                  },
                },
              },
            });
            console.log(`📦 Pedido #${payment.order.orderNumber} marcado como REFUNDED.`);
          }
        }
        break;
      }

      default:
        console.log(`ℹ️ [Stripe Webhook] Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('❌ Erro durante o processamento do evento do Webhook:', err);
    return NextResponse.json({ error: `Internal Webhook Error: ${err.message}` }, { status: 500 });
  }
}
