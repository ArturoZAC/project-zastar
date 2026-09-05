import { UpdateMovieInput, updateMovieSchema } from "../../../shared/schemas/movie.schema";

export class UpdateMovieDto {
  private constructor(public readonly data: UpdateMovieInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateMovieDto } {
    const result = updateMovieSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateMovieDto(result.data) };
  }
}
