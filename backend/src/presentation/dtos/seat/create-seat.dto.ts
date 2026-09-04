import {
  createSeatSchema,
  CreateSeatInput,
} from "../../../shared/schemas/seat.schema";

type Result =
  | { success: true; dto: CreateSeatDto }
  | { success: false; error: string };

export class CreateSeatDto {
  private constructor(public readonly data: CreateSeatInput) {}

  static create(object: unknown): Result {
    const result = createSeatSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateSeatDto(result.data) };
  }
}
