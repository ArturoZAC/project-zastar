import { PaymentProvider, PaymentStatus } from "../enums";

//prettier-ignore
export interface Payment {
  id                   : string;
  reservationId        : string;
  provider             : PaymentProvider;
  providerPaymentId?   : string;
  amount               : number;
  status               : PaymentStatus;
  createdAt            : Date;
  updatedAt            : Date;
}
