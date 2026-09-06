import { NextResponse } from 'next/server';
import { MelhorEnvioService } from '@/services';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zipCode, weightG, heightCm, widthCm, lengthCm } = body;

    if (!zipCode) {
      return NextResponse.json({ error: 'CEP de destino é obrigatório.' }, { status: 400 });
    }

    const quotes = await MelhorEnvioService.calculateShippingQuotes({
      destinationZipCode: zipCode,
      weightG,
      heightCm,
      widthCm,
      lengthCm,
    });

    return NextResponse.json({ success: true, quotes });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Falha ao calcular a cotação de frete.' },
      { status: 500 }
    );
  }
}
