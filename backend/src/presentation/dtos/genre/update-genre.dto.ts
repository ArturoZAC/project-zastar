import { UpdateGenreInput, updateGenreSchema } from "../../../shared/schemas/genre.schema";

export class UpdateGenreDto {
  private constructor(public readonly data: UpdateGenreInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateGenreDto } {
    const result = updateGenreSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateGenreDto(result.data) };
  }
}
