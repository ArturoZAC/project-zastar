import { UpdateFunctionInput, updateFunctionSchema } from "../../../shared/schemas/function.schema";

export class UpdateFunctionDto {
  private constructor(public readonly data: UpdateFunctionInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateFunctionDto } {
    const result = updateFunctionSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateFunctionDto(result.data) };
  }
}
