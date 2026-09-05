import { boolean, numeric, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

import { movies } from "./movie.schema";
import { rooms } from "./room.schema";

export const languageTypeEnum: PgEnum<["subtitled", "dubbed", "original"]> = pgEnum(
  "language_type",
  ["subtitled", "dubbed", "original"],
);

export const functions = pgTable("functions", {
  id: uuid("id").defaultRandom().primaryKey(),
  movieId: uuid("movie_id")
    .notNull()
    .references(() => movies.id, { onDelete: "restrict" }),
  roomId: uuid("room_id")
    .notNull()
    .references(() => rooms.id, { onDelete: "restrict" }),
  format: varchar("format", { length: 10 }).notNull(),
  language: languageTypeEnum("language").notNull().default("original"),
  startTime: timestamp("start_time").notNull(),
  basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
  vipSurcharge: numeric("vip_surcharge", { precision: 10, scale: 2 }).notNull().default("0"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});
