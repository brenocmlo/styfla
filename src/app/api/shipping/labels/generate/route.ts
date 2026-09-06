import { NextResponse } from 'next/server';
import { MelhorEnvioService } from '@/services';
import { prisma, OrderStatus } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, fallbackData } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'ID do pedido é obrigatório.' }, { status: 400 });
    }

    let order: any = null;

    try {
      order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          address: true,
          user: true,
          items: {
            include: {
              variant: true,
            },
          },
        },
      });
    } catch (dbErr) {
      console.warn('⚠️ Banco de dados não acessível para consulta do pedido. Utilizando dados de fallback:', dbErr);
    }

    // Se o pedido não estiver no banco (ex: mock ou dev mode), utiliza fallbackData
    const recipientName = order?.user?.name || fallbackData?.customerName || 'Atleta STYFLA';
    const recipientPhone = order?.user?.phone || fallbackData?.customerPhone || '11988887777';
    const recipientEmail = order?.user?.email || fallbackData?.customerEmail || 'atleta@styfla.com.br';
    const recipientCpf = order?.user?.cpf || fallbackData?.cpf || '12345678900';
    const recipientAddress = order?.address?.street || fallbackData?.street || 'Av. Paulista';
    const recipientNumber = order?.address?.number || fallbackData?.number || '1000';
    const recipientComplement = order?.address?.complement || fallbackData?.complement || '';
    const recipientDistrict = order?.address?.neighborhood || fallbackData?.neighborhood || 'Bela Vista';
    const recipientCity = order?.address?.city || fallbackData?.city || 'São Paulo';
    const recipientState = order?.address?.state || fallbackData?.state || 'SP';
    const recipientPostalCode = order?.address?.zipCode || fallbackData?.zipCode || '01310-200';

    const products = order?.items?.length
      ? order.items.map((it: any) => ({
          name: it.productName || 'Rash Guard STYFLA',
          quantity: it.quantity || 1,
          unitaryValue: Number(it.unitPrice) || 199.9,
        }))
      : fallbackData?.items?.length
      ? fallbackData.items.map((name: string) => ({
          name,
          quantity: 1,
          unitaryValue: 199.9,
        }))
      : [
          {
            name: 'Rash Guard No-Gi STYFLA',
            quantity: 1,
            unitaryValue: 199.9,
          },
        ];

    // Orquestra o envio no Melhor Envio (carrinho, checkout, geração e impressão)
    const result = await MelhorEnvioService.createAndProcessOrderLabel({
      orderId,
      orderNumber: order?.orderNumber || fallbackData?.orderNumber || `STY-${Math.floor(10000 + Math.random() * 90000)}`,
      recipient: {
        name: recipientName,
        phone: recipientPhone,
        email: recipientEmail,
        document: recipientCpf,
        address: recipientAddress,
        number: recipientNumber,
        complement: recipientComplement,
        district: recipientDistrict,
        city: recipientCity,
        state: recipientState,
        postalCode: recipientPostalCode,
      },
      products,
      package: {
        weightG: 300 * Math.max(1, products.length),
        heightCm: 4 * Math.max(1, products.length),
        widthCm: 20,
        lengthCm: 25,
      },
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Falha ao processar etiqueta de envio.' }, { status: 500 });
    }

    // Atualiza status e código de rastreamento no PostgreSQL caso o pedido exista
    if (order && result.trackingCode) {
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            trackingCode: result.trackingCode,
            status: OrderStatus.SHIPPED,
          },
        });
      } catch (dbUpdateErr) {
        console.warn('⚠️ Não foi possível atualizar Order no PostgreSQL:', dbUpdateErr);
      }
    }

    return NextResponse.json({
      success: true,
      melhorEnvioId: result.melhorEnvioId,
      protocol: result.protocol,
      trackingCode: result.trackingCode,
      printUrl: result.printUrl,
      isMock: result.isMock,
    });
  } catch (error: any) {
    console.error('❌ Erro na API /api/shipping/labels/generate:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao emitir etiqueta de envio.' },
      { status: 500 }
    );
  }
}
