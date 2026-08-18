export type Size = 'PP' | 'P' | 'M' | 'G' | 'GG' | '2XG' | '3XG';

export type IbjjfBelt = 'WHITE' | 'BLUE' | 'PURPLE' | 'BROWN' | 'BLACK' | 'NONE';

export interface CartItemDTO {
  variantId: string;
  productId: string;
  title: string;
  size: Size;
  color?: string;
  price: number;
  pixPrice: number;
  imageUrl: string;
  quantity: number;
  ibjjfRank?: IbjjfBelt;
}

export interface ShippingQuote {
  serviceId: string;
  name: string;
  carrier: string;
  price: number;
  deliveryDays: number;
}

export interface CheckoutPayload {
  customer: {
    name: string;
    email: string;
    cpf: string;
    phone: string;
  };
  shippingAddress: {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  shippingServiceId: string;
  paymentMethod: 'PIX' | 'CREDIT_CARD' | 'BOLETO';
  items: Array<{
    variantId: string;
    quantity: number;
  }>;
}
