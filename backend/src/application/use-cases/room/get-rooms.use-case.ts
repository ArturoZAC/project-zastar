import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { RoomFilters } from "../../../shared/schemas/room.schema";

export class GetAllRoomsUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(filters?: RoomFilters) {
    const rooms = await this.roomRepo.findAll(filters);
    return rooms;
  }
}

export class GetRoomByIdUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(id: string) {
    const room = await this.roomRepo.findById(id);
    if (!room) {
      throw new NotFoundError("Room not found");
    }
    return room;
  }
}
