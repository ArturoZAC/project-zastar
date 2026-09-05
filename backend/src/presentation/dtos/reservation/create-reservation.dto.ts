import {
  CreateReservationInput,
  createReservationSchema,
} from "../../../shared/schemas/reservation.schema";

export class CreateReservationDto {
  private constructor(public readonly data: CreateReservationInput) {}

  static create(object: unknown): { error?: string; dto?: CreateReservationDto } {
    const result = createReservationSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateReservationDto(result.data) };
  }
}
