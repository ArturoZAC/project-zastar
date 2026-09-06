import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { PgEnum } from "drizzle-orm/pg-core/columns/enum";

export const ageRatingTypeEnum: PgEnum<["G", "PG", "PG13", "R", "NC17"]> = pgEnum(
  "age_rating_type",
  ["G", "PG", "PG13", "R", "NC17"],
);

export const languageTypeEnum: PgEnum<["subtitled", "dubbed", "original"]> = pgEnum(
  "language_type",
  ["subtitled", "dubbed", "original"],
);

export const movies = pgTable(
  "movies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    synopsis: text("synopsis"),
    durationMinutes: integer("duration_minutes").notNull(),
    posterKey: varchar("poster_key", { length: 500 }),
    trailerUrl: varchar("trailer_url", { length: 500 }),
    ageRating: ageRatingTypeEnum("age_rating").notNull(),
    language: languageTypeEnum("language").notNull().default("original"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    check("title_not_empty", sql`length(${table.title}) > 0`),
    check("duration_positive", sql`${table.durationMinutes} > 0`),
  ],
);
