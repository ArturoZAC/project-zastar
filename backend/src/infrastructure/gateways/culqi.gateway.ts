import { PaymentProvider } from "../../domain/enums";
import { envs } from "../../shared/config/envs";
import {
  CreatePaymentParams,
  PaymentGateway,
  PaymentGatewayResponse,
} from "./payment-gateway.interface";

export class CulqiGateway implements PaymentGateway {
  readonly provider = PaymentProvider.CULQI;

  private readonly baseUrl = "https://api.culqi.com/v2";
  private readonly secretKey: string;

  constructor() {
    this.secretKey = envs.CULQI_SECRET_KEY;
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentGatewayResponse> {
    const body = {
      amount: Math.round(params.amount * 100),
      currency_code: params.currencyCode ?? "PEN",
      email: params.email,
      source_id: params.sourceId,
      description: params.description.slice(0, 80),
    };

    const response = await fetch(`${this.baseUrl}/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secretKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const merchantMessage = data?.merchant_message || data?.user_message || "Culqi charge failed";
      throw new Error(merchantMessage);
    }

    return {
      providerPaymentId: data.id,
      status: this.mapStatus(data.outcome?.code),
    };
  }

  async getPaymentStatus(providerPaymentId: string): Promise<PaymentGatewayResponse> {
    const response = await fetch(`${this.baseUrl}/charges/${providerPaymentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.merchant_message || "Failed to retrieve Culqi charge");
    }

    return {
      providerPaymentId: data.id,
      status: this.mapStatus(data.outcome?.code),
    };
  }

  private mapStatus(outcomeCode?: string): PaymentGatewayResponse["status"] {
    if (!outcomeCode) return "pending";

    // Culqi outcome codes: "000" = authorized
    if (outcomeCode === "000") return "completed";
    return "failed";
  }
}
