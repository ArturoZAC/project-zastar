import { sql } from "drizzle-orm";
import { boolean, check, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    role: text("role").default("user").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (table) => [check("users_role_check", sql`${table.role} IN ('admin', 'user')`)],
);
