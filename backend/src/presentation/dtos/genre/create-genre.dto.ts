import { CreateGenreInput, createGenreSchema } from "../../../shared/schemas/genre.schema";

type Result = { success: true; dto: CreateGenreDto } | { success: false; error: string };

export class CreateGenreDto {
  private constructor(public readonly data: CreateGenreInput) {}

  static create(object: unknown): Result {
    const result = createGenreSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateGenreDto(result.data) };
  }
}
