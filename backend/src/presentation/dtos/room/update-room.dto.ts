import { UpdateRoomInput, updateRoomSchema } from "../../../shared/schemas/room.schema";

export class UpdateRoomDto {
  private constructor(public readonly data: UpdateRoomInput) {}

  static create(object: unknown): { error?: string; dto?: UpdateRoomDto } {
    const result = updateRoomSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new UpdateRoomDto(result.data) };
  }
}
