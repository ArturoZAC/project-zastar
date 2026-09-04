import { PaymentProvider, PaymentStatus } from "../enums";

export interface Payment {
  id: string;
  reservationId: string;
  provider: PaymentProvider;
  providerTransactionId?: string;
  amount: number;
  status: PaymentStatus;
  rawResponse?: string;
  createdAt: Date;
}
