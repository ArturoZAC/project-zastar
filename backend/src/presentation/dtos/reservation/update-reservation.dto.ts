import { updateReservationSchema, UpdateReservationInput } from '../../../shared/schemas/reservation.schema';

type Result =
  | { success: true; dto: UpdateReservationDto }
  | { success: false; error: string };

export class UpdateReservationDto {
  private constructor(public readonly data: UpdateReservationInput) {}

  static create(object: unknown): Result {
    const result = updateReservationSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateReservationDto(result.data) };
  }
}
