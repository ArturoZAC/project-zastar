import { CreateMovieInput, createMovieSchema } from "../../../shared/schemas/movie.schema";

export class CreateMovieDto {
  private constructor(public readonly data: CreateMovieInput) {}

  static create(object: unknown): { error?: string; dto?: CreateMovieDto } {
    const result = createMovieSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateMovieDto(result.data) };
  }
}
