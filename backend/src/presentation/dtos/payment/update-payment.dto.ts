import { UpdatePaymentInput, updatePaymentSchema } from "../../../shared/schemas/payment.schema";

export class UpdatePaymentDto {
  private constructor(public readonly data: UpdatePaymentInput) {}

  static create(object: unknown): { error?: string; dto?: UpdatePaymentDto } {
    const result = updatePaymentSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdatePaymentDto(result.data) };
  }
}
