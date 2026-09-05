import {
  UpdateReservationInput,
  updateReservationSchema,
} from "../../../shared/schemas/reservation.schema";

export class UpdateReservationDto {
  private constructor(public readonly data: UpdateReservationInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateReservationDto } {
    const result = updateReservationSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateReservationDto(result.data) };
  }
}
