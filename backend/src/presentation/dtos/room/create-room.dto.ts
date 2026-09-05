import { CreateRoomInput, createRoomSchema } from "../../../shared/schemas/room.schema";

export class CreateRoomDto {
  private constructor(public readonly data: CreateRoomInput) {}

  static create(object: unknown): { error?: string; dto?: CreateRoomDto } {
    const result = createRoomSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateRoomDto(result.data) };
  }
}
