import { updateFunctionSchema, UpdateFunctionInput } from '../../../shared/schemas/function.schema';

type Result =
  | { success: true; dto: UpdateFunctionDto }
  | { success: false; error: string };

export class UpdateFunctionDto {
  private constructor(public readonly data: UpdateFunctionInput) {}

  static create(object: unknown): Result {
    const result = updateFunctionSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateFunctionDto(result.data) };
  }
}
