import { StripePaymentService } from './payment/stripe';
import { MelhorEnvioService } from './shipping/melhorenvio';

export * from './payment/stripe';
export * from './shipping/melhorenvio';

// Aliases para compatibilidade estrita
export { StripePaymentService as PaymentService };
export { MelhorEnvioService as ShippingService };
