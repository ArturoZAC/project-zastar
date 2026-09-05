import { Payment } from "../../domain/entities/payment.entity";
import { payments } from "../database/schema/payment.schema";

type DbRow = typeof payments.$inferSelect;

export const toPaymentEntity = (row: DbRow): Payment => ({
  id: row.id,
  reservationId: row.reservationId,
  provider: row.provider as Payment["provider"],
  providerPaymentId: row.providerPaymentId ?? undefined,
  amount: Number(row.amount),
  status: row.status as Payment["status"],
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
