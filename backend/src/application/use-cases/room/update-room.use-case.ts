import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateRoomInput } from "../../../shared/schemas/room.schema";

export class UpdateRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(id: string, data: UpdateRoomInput) {
    const existing = await this.roomRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Room not found");
    }

    const room = await this.roomRepo.update(id, data);
    return room;
  }
}
