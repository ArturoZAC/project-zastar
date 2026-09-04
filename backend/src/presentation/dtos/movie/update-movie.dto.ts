import { UpdateMovieInput, updateMovieSchema } from "../../../shared/schemas/movie.schema";

type Result = { success: true; dto: UpdateMovieDto } | { success: false; error: string };

export class UpdateMovieDto {
  private constructor(public readonly data: UpdateMovieInput) {}

  static create(object: unknown): Result {
    const result = updateMovieSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateMovieDto(result.data) };
  }
}
