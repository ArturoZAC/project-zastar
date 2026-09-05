import { CreateGenreInput, createGenreSchema } from "../../../shared/schemas/genre.schema";

export class CreateGenreDto {
  private constructor(public readonly data: CreateGenreInput) {}

  static create(object: unknown): { error?: string; dto?: CreateGenreDto } {
    const result = createGenreSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateGenreDto(result.data) };
  }
}
