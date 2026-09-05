import { UpdateUserInput, updateUserSchema } from "../../../shared/schemas/user.schema";

export class UpdateUserDto {
  private constructor(public readonly data: UpdateUserInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateUserDto } {
    const result = updateUserSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateUserDto(result.data) };
  }
}
