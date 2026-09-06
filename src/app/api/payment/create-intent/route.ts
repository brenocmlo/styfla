import { NextResponse } from 'next/server';
import { StripePaymentService } from '@/services';
import { prisma, PaymentMethod, OrderStatus, PaymentStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amountBrl,
      customer,
      shippingAddress,
      shipping,
      items,
      paymentMethodType = 'card',
    } = body;

    const finalAmount = Number(amountBrl);
    if (!finalAmount || finalAmount <= 0) {
      return NextResponse.json({ error: 'Valor total da compra inválido.' }, { status: 400 });
    }

    const email = customer?.email?.trim().toLowerCase() || 'atleta@styfla.com.br';
    const name = customer?.name?.trim() || 'Atleta STYFLA';
    const cpf = customer?.cpf?.replace(/\D/g, '') || '';
    const phone = customer?.phone?.replace(/\D/g, '') || '';

    // Gerador de número de pedido sequencial/aleatório para identificação
    const fallbackOrderNumber = Math.floor(100000 + Math.random() * 900000);
    let orderId = `temp-ord-${Date.now()}`;
    let orderNumber: number | string = fallbackOrderNumber;

    // Tentar persistir no PostgreSQL caso o banco esteja acessível
    try {
      // 1. Localizar ou criar usuário do cliente
      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            cpf: cpf || null,
            phone: phone || null,
          },
        });
      }

      // 2. Criar endereço de entrega
      const address = await prisma.address.create({
        data: {
          userId: user.id,
          recipient: name,
          zipCode: shippingAddress?.zipCode || '01310-200',
          street: shippingAddress?.street || 'Av. Paulista',
          number: shippingAddress?.number || '1000',
          complement: shippingAddress?.complement || null,
          neighborhood: shippingAddress?.neighborhood || 'Bela Vista',
          city: shippingAddress?.city || 'São Paulo',
          state: shippingAddress?.state || 'SP',
        },
      });

      // 3. Criar pedido com status PENDING
      const dbOrder = await prisma.order.create({
        data: {
          userId: user.id,
          addressId: address.id,
          status: OrderStatus.PENDING,
          totalAmount: finalAmount,
          subtotal: finalAmount - (shipping?.price || 0),
          shippingCost: shipping?.price || 0,
          shippingCarrier: shipping?.name || 'Melhor Envio',
          items: {
            create: (items || []).map((item: any) => ({
              productVariantId: item.variantId || 'var-default',
              productName: item.title || 'Rash Guard STYFLA',
              variantInfo: `Tamanho: ${item.size || 'M'}`,
              unitPrice: item.price || finalAmount,
              quantity: item.quantity || 1,
              totalPrice: (item.price || finalAmount) * (item.quantity || 1),
            })),
          },
          payment: {
            create: {
              method: paymentMethodType === 'pix' ? PaymentMethod.PIX : PaymentMethod.CREDIT_CARD,
              status: PaymentStatus.PENDING,
            },
          },
        },
      });

      orderId = dbOrder.id;
      orderNumber = dbOrder.orderNumber;
    } catch (dbError) {
      console.warn('⚠️ Banco PostgreSQL inacessível ou dados de teste em dev. Continuando com identificador temporário:', dbError);
    }

    // 4. Criar PaymentIntent na Stripe
    const stripeResult = await StripePaymentService.createPaymentIntent({
      amountBrl: finalAmount,
      orderId,
      orderNumber,
      customerEmail: email,
      customerName: name,
      customerCpf: cpf,
      paymentMethodType: paymentMethodType === 'pix' ? 'pix' : 'card',
      description: `Pedido #${orderNumber} - STYFLA Jiu-Jitsu No-Gi`,
      metadata: {
        orderId,
        orderNumber: String(orderNumber),
        customerPhone: phone,
        carrier: shipping?.name || 'Melhor Envio',
      },
    });

    if (!stripeResult.success) {
      return NextResponse.json({ error: stripeResult.error }, { status: 500 });
    }

    // 5. Vincular transactionId ao Payment no banco de dados se orderId for real
    if (stripeResult.paymentIntentId && !orderId.startsWith('temp-ord-')) {
      try {
        await prisma.payment.update({
          where: { orderId },
          data: {
            transactionId: stripeResult.paymentIntentId,
          },
        });
      } catch (err) {
        console.warn('⚠️ Não foi possível salvar transactionId no banco:', err);
      }
    }

    return NextResponse.json({
      success: true,
      clientSecret: stripeResult.clientSecret,
      paymentIntentId: stripeResult.paymentIntentId,
      orderId,
      orderNumber,
      isMock: stripeResult.isMock || false,
    });
  } catch (error: any) {
    console.error('❌ Erro na API /api/payment/create-intent:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao processar intenção de pagamento.' },
      { status: 500 }
    );
  }
}
