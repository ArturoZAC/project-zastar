import { boolean, integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

import { rooms } from "./room.schema";

export const seatTierEnum: PgEnum<["standard", "vip", "premium"]> = pgEnum("seat_tier", [
  "standard",
  "vip",
  "premium",
]);

export const seats = pgTable("seats", {
  id: uuid("id").defaultRandom().primaryKey(),
  roomId: uuid("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "cascade" }),
  row: varchar("row", { length: 5 }).notNull(),
  number: integer("number").notNull(),
  tier: seatTierEnum("tier").notNull().default("standard"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
