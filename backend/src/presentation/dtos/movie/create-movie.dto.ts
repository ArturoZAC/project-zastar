import { createMovieSchema, CreateMovieInput } from '../../../shared/schemas/movie.schema';

type Result =
  | { success: true; dto: CreateMovieDto }
  | { success: false; error: string };

export class CreateMovieDto {
  private constructor(public readonly data: CreateMovieInput) {}

  static create(object: unknown): Result {
    const result = createMovieSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateMovieDto(result.data) };
  }
}
