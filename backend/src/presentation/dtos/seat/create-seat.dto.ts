import { CreateSeatInput, createSeatSchema } from "../../../shared/schemas/seat.schema";

export class CreateSeatDto {
  private constructor(public readonly data: CreateSeatInput) {}

  static create(object: unknown): { error?: string; dto?: CreateSeatDto } {
    const result = createSeatSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateSeatDto(result.data) };
  }
}
