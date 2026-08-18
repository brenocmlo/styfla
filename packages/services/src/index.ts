import type { ShippingQuote } from '@styfla/types';

export class ShippingService {
  static async calculateQuote(zipCode: string, totalWeightG: number): Promise<ShippingQuote[]> {
    const cleanCep = zipCode.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      throw new Error('CEP inválido.');
    }

    // Mock inicial simulando cálculo via Melhor Envio / Correios
    return [
      {
        serviceId: 'sedex',
        name: 'SEDEX Express (No-Gi Pro)',
        carrier: 'Correios',
        price: 24.9,
        deliveryDays: 2,
      },
      {
        serviceId: 'pac',
        name: 'PAC Econômico',
        carrier: 'Correios',
        price: 14.5,
        deliveryDays: 5,
      },
    ];
  }
}

export class PaymentService {
  static generatePixPayload(orderNumber: number, amount: number) {
    return {
      qrCode: `00020126580014br.gov.bcb.pix0136styfla-${orderNumber}520400005303986540${amount.toFixed(2)}5802BR5910STYFLA BJJ6009SAO PAULO62070503***6304ABCD`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=styfla-pix-${orderNumber}`,
      expiresInMinutes: 30,
    };
  }
}
