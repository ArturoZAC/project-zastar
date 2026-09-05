import { sql } from "drizzle-orm";
import { boolean, check, integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

export const roomFormatEnum: PgEnum<["2D", "3D", "IMAX", "4DX"]> = pgEnum("room_format", [
  "2D",
  "3D",
  "IMAX",
  "4DX",
]);

export const rooms = pgTable(
  "rooms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    format: roomFormatEnum("format").notNull().default("2D"),
    totalSeats: integer("total_seats").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [check("total_seats_positive", sql`${table.totalSeats} > 0`)],
);
