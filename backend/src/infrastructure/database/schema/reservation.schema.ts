import { numeric, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

import { functions } from "./function.schema";

export const reservationStatusEnum: PgEnum<["pending", "confirmed", "cancelled", "expired"]> =
  pgEnum("reservation_status", ["pending", "confirmed", "cancelled", "expired"]);

export const reservations = pgTable("reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  functionId: uuid("function_id")
    .notNull()
    .references(() => functions.id, { onDelete: "restrict" }),
  guestEmail: varchar("guest_email", { length: 255 }),
  guestName: varchar("guest_name", { length: 255 }),
  guestPhone: varchar("guest_phone", { length: 20 }),
  ticketCode: varchar("ticket_code", { length: 20 }).notNull().unique(),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  status: reservationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
});
