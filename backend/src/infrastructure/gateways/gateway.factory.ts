import { PaymentProvider } from "../../domain/enums";
import { envs } from "../../shared/config/envs";
import { CulqiGateway } from "./culqi.gateway";
import { IzipayGateway } from "./izipay.gateway";
import { PaymentGateway } from "./payment-gateway.interface";

let gatewayInstance: PaymentGateway | null = null;

export const getPaymentGateway = (): PaymentGateway => {
  if (gatewayInstance) return gatewayInstance;

  const provider = envs.ACTIVE_PAYMENT_PROVIDER;

  switch (provider) {
    case PaymentProvider.CULQI:
      gatewayInstance = new CulqiGateway();
      break;
    case PaymentProvider.IZIPAY:
      gatewayInstance = new IzipayGateway();
      break;
    default:
      gatewayInstance = new CulqiGateway();
  }

  return gatewayInstance;
};
