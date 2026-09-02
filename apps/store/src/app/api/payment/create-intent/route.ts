import { NextResponse } from 'next/server';
import { StripePaymentService } from '@styfla/services';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amountBrl, orderId, orderNumber, customerEmail, paymentMethodType } = body;

    if (!amountBrl || amountBrl <= 0) {
      return NextResponse.json({ error: 'Valor da compra inválido.' }, { status: 400 });
    }

    const result = await StripePaymentService.createPaymentIntent({
      amountBrl: Number(amountBrl),
      orderId: orderId || 'temp-order',
      orderNumber: orderNumber || '0000',
      customerEmail: customerEmail || 'atleta@styfla.com.br',
      paymentMethodType: paymentMethodType || 'all',
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erro ao comunicar com a Stripe.' },
      { status: 500 }
    );
  }
}
