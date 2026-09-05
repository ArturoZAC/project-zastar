import { Room } from "../../../domain/entities/room.entity";
import { RoomRepository } from "../../../domain/repositories/room.repository";
import { SeatRepository } from "../../../domain/repositories/seat.repository";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { CreateRoomInput } from "../../../shared/schemas/room.schema";
import { CreateSeatInput } from "../../../shared/schemas/seat.schema";

export interface CreateRoomUseCase {
  execute(data: CreateRoomInput): Promise<Room>;
}

export class CreateRoom implements CreateRoomUseCase {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly seatRepo: SeatRepository,
  ) {}

  execute = async (data: CreateRoomInput): Promise<Room> => {
    const existing = await this.roomRepo.findByName(data.name);
    if (existing) throw new ConflictError("Room name already exists");

    const room = await this.roomRepo.create(data);

    const seatData: CreateSeatInput[] = [];
    const rows = Math.ceil(data.totalSeats / 10);

    for (let i = 0; i < rows; i++) {
      const seatsInRow = Math.min(10, data.totalSeats - i * 10);
      for (let j = 0; j < seatsInRow; j++) {
        const rowNum = i + 1;
        const seatNum = j + 1;
        seatData.push({
          roomId: room.id,
          row: String.fromCharCode(64 + rowNum),
          number: seatNum,
          tier: rowNum <= 3 ? "vip" : "standard",
        });
      }
    }

    if (seatData.length > 0) {
      await this.seatRepo.createMany(seatData);
    }

    return room;
  };
}
