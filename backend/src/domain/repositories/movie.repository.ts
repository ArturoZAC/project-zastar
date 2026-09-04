import {
  CreateMovieInput,
  MovieFilters,
  UpdateMovieInput,
} from "../../shared/schemas/movie.schema";
import { Movie } from "../entities/movie.entity";

export abstract class MovieRepository {
  abstract findById(id: string): Promise<Movie | null>;
  abstract findAll(filters?: MovieFilters): Promise<Movie[]>;
  abstract create(data: CreateMovieInput): Promise<Movie>;
  abstract update(id: string, data: UpdateMovieInput): Promise<Movie>;
  abstract softDelete(id: string): Promise<void>;
}
