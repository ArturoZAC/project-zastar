import { Genre } from '../entities/genre.entity';
import { CreateGenreInput, UpdateGenreInput } from '../../shared/schemas/genre.schema';

export abstract class GenreRepository {
  abstract findById(id: string): Promise<Genre | null>;
  abstract findByName(name: string): Promise<Genre | null>;
  abstract findAll(): Promise<Genre[]>;
  abstract create(data: CreateGenreInput): Promise<Genre>;
  abstract update(id: string, data: UpdateGenreInput): Promise<Genre>;
  abstract delete(id: string): Promise<void>;
}
