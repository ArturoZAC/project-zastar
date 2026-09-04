import { updatePaymentSchema, UpdatePaymentInput } from '../../../shared/schemas/payment.schema';

type Result =
  | { success: true; dto: UpdatePaymentDto }
  | { success: false; error: string };

export class UpdatePaymentDto {
  private constructor(public readonly data: UpdatePaymentInput) {}

  static create(object: unknown): Result {
    const result = updatePaymentSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdatePaymentDto(result.data) };
  }
}
