import { eq } from "drizzle-orm";

import { PaymentRepository } from "../../domain/repositories/payment.repository";
import { CreatePaymentInput, UpdatePaymentInput } from "../../shared/schemas/payment.schema";
import { db } from "../database/connection";
import { payments } from "../database/schema/payment.schema";
import { toPaymentEntity } from "../mappers/payment.mapper";

export class PaymentRepositoryImpl extends PaymentRepository {
  async findById(id: string) {
    const [row] = await db.select().from(payments).where(eq(payments.id, id));
    return row ? toPaymentEntity(row) : null;
  }

  async findByReservationId(reservationId: string) {
    const [row] = await db.select().from(payments).where(eq(payments.reservationId, reservationId));
    return row ? toPaymentEntity(row) : null;
  }

  async create(data: CreatePaymentInput) {
    const dbData = { ...data, amount: String(data.amount) };
    const [row] = await db.insert(payments).values(dbData).returning();
    return toPaymentEntity(row);
  }

  async update(id: string, data: UpdatePaymentInput) {
    const [row] = await db
      .update(payments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return toPaymentEntity(row);
  }
}
