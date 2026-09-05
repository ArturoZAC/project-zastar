import { sql } from "drizzle-orm";
import { boolean, check, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

export const userRoleEnum: PgEnum<["admin", "cashier", "user"]> = pgEnum("user_role", [
  "admin",
  "cashier",
  "user",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    role: userRoleEnum("role").notNull().default("user"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    check("first_name_not_empty", sql`length(${table.firstName}) > 0`),
    check("last_name_not_empty", sql`length(${table.lastName}) > 0`),
  ],
);
