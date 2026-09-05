import { numeric, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

import { reservations } from "./reservation.schema";

export const paymentProviderEnum: PgEnum<["culqi", "izipay"]> = pgEnum("payment_provider", [
  "culqi",
  "izipay",
]);

export const paymentStatusEnum: PgEnum<["pending", "completed", "failed", "refunded"]> = pgEnum(
  "payment_status",
  ["pending", "completed", "failed", "refunded"],
);

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  reservationId: uuid("reservation_id")
    .notNull()
    .references(() => reservations.id, { onDelete: "restrict" }),
  provider: paymentProviderEnum("provider").notNull(),
  providerPaymentId: varchar("provider_payment_id", { length: 255 }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
