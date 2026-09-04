import { CreatePaymentInput, UpdatePaymentInput } from "../../shared/schemas/payment.schema";
import { Payment } from "../entities/payment.entity";

export abstract class PaymentRepository {
  abstract findById(id: string): Promise<Payment | null>;
  abstract findByReservationId(reservationId: string): Promise<Payment | null>;
  abstract create(data: CreatePaymentInput): Promise<Payment>;
  abstract update(id: string, data: UpdatePaymentInput): Promise<Payment>;
}
