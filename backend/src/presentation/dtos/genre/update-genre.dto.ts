import { UpdateGenreInput, updateGenreSchema } from "../../../shared/schemas/genre.schema";

type Result = { success: true; dto: UpdateGenreDto } | { success: false; error: string };

export class UpdateGenreDto {
  private constructor(public readonly data: UpdateGenreInput) {}

  static create(object: unknown): Result {
    const result = updateGenreSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateGenreDto(result.data) };
  }
}
