import { PaymentProvider } from "../../domain/enums";

export interface CreatePaymentParams {
  amount: number;
  currencyCode?: string;
  email: string;
  description: string;
  sourceId: string;
}

export interface PaymentGatewayResponse {
  providerPaymentId: string;
  status: "pending" | "completed" | "failed";
  redirectUrl?: string;
  formToken?: string;
}

export interface PaymentGateway {
  readonly provider: PaymentProvider;
  createPayment(params: CreatePaymentParams): Promise<PaymentGatewayResponse>;
  getPaymentStatus(providerPaymentId: string): Promise<PaymentGatewayResponse>;
}
