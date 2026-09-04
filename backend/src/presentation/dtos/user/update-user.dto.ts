import { updateUserSchema, UpdateUserInput } from '../../../shared/schemas/user.schema';

type Result =
  | { success: true; dto: UpdateUserDto }
  | { success: false; error: string };

export class UpdateUserDto {
  private constructor(public readonly data: UpdateUserInput) {}

  static create(object: unknown): Result {
    const result = updateUserSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateUserDto(result.data) };
  }
}
