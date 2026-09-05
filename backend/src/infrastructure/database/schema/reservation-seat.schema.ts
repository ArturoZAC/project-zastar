import { numeric, pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { reservations } from "./reservation.schema";
import { seats } from "./seat.schema";

export const reservationSeats = pgTable(
  "reservation_seats",
  {
    reservationId: uuid("reservation_id")
      .notNull()
      .references(() => reservations.id, { onDelete: "cascade" }),
    seatId: uuid("seat_id")
      .notNull()
      .references(() => seats.id, { onDelete: "restrict" }),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.reservationId, t.seatId] })],
);
