import { PaymentProvider } from "../../domain/enums";
import { envs } from "../../shared/config/envs";
import {
  CreatePaymentParams,
  PaymentGateway,
  PaymentGatewayResponse,
} from "./payment-gateway.interface";

interface IzipayCreatePaymentResponse {
  status: string;
  answer?: {
    formToken: string;
  };
}

interface IzipayGetOrderResponse {
  orderStatus: string;
  orderNumber: string;
}

export class IzipayGateway implements PaymentGateway {
  readonly provider = PaymentProvider.IZIPAY;

  private readonly baseUrl = "https://api.micuentaweb.pe";
  private readonly username: string;
  private readonly password: string;
  private readonly merchantCode: string;

  constructor() {
    this.username = envs.IZIPAY_MERCHANT_CODE;
    this.password = envs.IZIPAY_API_KEY;
    this.merchantCode = envs.IZIPAY_MERCHANT_CODE;
  }

  private getAuthHeader(): string {
    const credentials = Buffer.from(`${this.username}:${this.password}`).toString("base64");
    return `Basic ${credentials}`;
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentGatewayResponse> {
    const body = {
      amount: Math.round(params.amount * 100), // Soles → céntimos
      currency: params.currencyCode ?? "PEN",
      orderId: params.description.slice(0, 30),
      customer: {
        email: params.email,
      },
    };

    const response = await fetch(`${this.baseUrl}/api-payment/V4/Charge/CreatePayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthHeader(),
      },
      body: JSON.stringify(body),
    });

    const data: IzipayCreatePaymentResponse = await response.json();

    if (data.status !== "SUCCESS") {
      throw new Error("Izipay payment creation failed");
    }

    return {
      providerPaymentId: data.answer?.formToken ?? "",
      status: "pending",
      formToken: data.answer?.formToken,
    };
  }

  async getPaymentStatus(orderNumber: string): Promise<PaymentGatewayResponse> {
    const response = await fetch(
      `${this.baseUrl}/api-payment/V4/Charge/GetOrder?orderNumber=${orderNumber}`,
      {
        method: "GET",
        headers: {
          Authorization: this.getAuthHeader(),
        },
      },
    );

    const data: IzipayGetOrderResponse = await response.json();

    return {
      providerPaymentId: orderNumber,
      status: this.mapStatus(data.orderStatus),
    };
  }

  private mapStatus(orderStatus: string): PaymentGatewayResponse["status"] {
    if (orderStatus === "PAID") return "completed";
    if (orderStatus === "UNPAID" || orderStatus === "CANCELLED") return "failed";
    return "pending";
  }
}
