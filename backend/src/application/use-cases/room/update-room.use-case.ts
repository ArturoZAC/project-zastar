import { Room } from "../../../domain/entities/room.entity";
import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateRoomInput } from "../../../shared/schemas/room.schema";

export interface UpdateRoomUseCase {
  execute(id: string, data: UpdateRoomInput): Promise<Room>;
}

export class UpdateRoom implements UpdateRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  execute = async (id: string, data: UpdateRoomInput): Promise<Room> => {
    const existing = await this.roomRepo.findById(id);
    if (!existing) throw new NotFoundError("Room not found");
    return this.roomRepo.update(id, data);
  };
}
