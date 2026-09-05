import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { envs } from "../../shared/config/envs";
import { logger } from "../../shared/config/logger";
import { functions } from "./schema/function.schema";
import { genres } from "./schema/genre.schema";
import { ageRatingTypeEnum, languageTypeEnum, movies } from "./schema/movie.schema";
import { movieGenres } from "./schema/movie-genre.schema";
import { paymentProviderEnum, payments, paymentStatusEnum } from "./schema/payment.schema";
import { reservations, reservationStatusEnum } from "./schema/reservation.schema";
import { reservationSeats } from "./schema/reservation-seat.schema";
import { roomFormatEnum, rooms } from "./schema/room.schema";
import { seats, seatTierEnum } from "./schema/seat.schema";
import { userRoleEnum, users } from "./schema/user.schema";

const schema = {
  users,
  userRoleEnum,
  genres,
  movies,
  ageRatingTypeEnum,
  languageTypeEnum,
  movieGenres,
  rooms,
  roomFormatEnum,
  seats,
  seatTierEnum,
  functions,
  reservations,
  reservationStatusEnum,
  reservationSeats,
  payments,
  paymentProviderEnum,
  paymentStatusEnum,
};

const pool = new Pool({
  connectionString: envs.DATABASE_URL,
  max: 20,
});

pool.on("connect", () => {
  logger.info("New client connected to database");
});

pool.on("error", (err: Error) => {
  logger.error("Unexpected error on idle client: %s", err.message);
  process.exit(-1);
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });

export const disconnectDatabase = async (): Promise<void> => {
  await pool.end();
  logger.info("Database connection closed");
};
