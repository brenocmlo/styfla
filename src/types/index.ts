export type Size = 'PP' | 'P' | 'M' | 'G' | 'GG' | '2XG' | '3XG' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4';

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

export interface MelhorEnvioAddress {
  name: string;
  phone: string;
  email: string;
  document: string;
  company_document?: string | null;
  state_register?: string | null;
  address: string;
  complement?: string | null;
  number: string;
  district: string;
  city: string;
  state_abbr: string;
  country_id?: string;
  postal_code: string;
  note?: string;
}

export interface MelhorEnvioProductItem {
  name: string;
  quantity: number;
  unitary_value: number;
  weight?: number;
}

export interface MelhorEnvioPackage {
  weight: number; // em kg (ex: 0.3)
  width: number;  // em cm (ex: 20)
  height: number; // em cm (ex: 4)
  length: number; // em cm (ex: 25)
}

export interface MelhorEnvioCreateOrderPayload {
  service: number;
  agency?: number | null;
  from: MelhorEnvioAddress;
  to: MelhorEnvioAddress;
  products: MelhorEnvioProductItem[];
  package: MelhorEnvioPackage;
  options?: {
    insurance_value?: number;
    receipt?: boolean;
    own_hand?: boolean;
    reverse?: boolean;
    non_commercial?: boolean;
    platform?: string;
  };
}

export interface MelhorEnvioCartResponse {
  id: string;
  protocol: string;
  service_id: number;
  agency_id: number | null;
  contract: string | null;
  service_code: string | null;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MelhorEnvioCheckoutResponse {
  purchase: {
    id: string;
    protocol: string;
    total: number;
    discount: number;
    status: string;
    paid_at: string | null;
    canceled_at: string | null;
    created_at: string;
    updated_at: string;
    orders: Array<{
      id: string;
      protocol: string;
      status: string;
      price: number;
      discount: number;
      delivery_min: number;
      delivery_max: number;
    }>;
  };
}

export interface MelhorEnvioGenerateResponse {
  [orderId: string]: {
    status: boolean;
    message?: string;
  };
}

export interface MelhorEnvioPrintResponse {
  url: string;
}

export interface MelhorEnvioTrackingItem {
  id: string;
  protocol: string;
  status: string;
  tracking?: string | null;
  created_at: string;
  updated_at: string;
  paid_at?: string | null;
  generated_at?: string | null;
  posted_at?: string | null;
  delivered_at?: string | null;
  canceled_at?: string | null;
}

