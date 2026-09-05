import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";

import { genres } from "./genre.schema";
import { movies } from "./movie.schema";

export const movieGenres = pgTable(
  "movie_genres",
  {
    movieId: uuid("movie_id")
      .notNull()
      .references(() => movies.id, { onDelete: "cascade" }),
    genreId: uuid("genre_id")
      .notNull()
      .references(() => genres.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.movieId, t.genreId] })],
);
