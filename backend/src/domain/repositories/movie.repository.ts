import { Movie } from '../entities/movie.entity';
import { CreateMovieInput, MovieFilters, UpdateMovieInput } from '../../shared/schemas/movie.schema';

export abstract class MovieRepository {
  abstract findById(id: string): Promise<Movie | null>;
  abstract findAll(filters?: MovieFilters): Promise<Movie[]>;
  abstract create(data: CreateMovieInput): Promise<Movie>;
  abstract update(id: string, data: UpdateMovieInput): Promise<Movie>;
  abstract softDelete(id: string): Promise<void>;
}
