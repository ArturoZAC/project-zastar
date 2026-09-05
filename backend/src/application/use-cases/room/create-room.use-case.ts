import { RoomRepository } from "../../../domain/repositories/room.repository";
import { SeatRepository } from "../../../domain/repositories/seat.repository";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { CreateRoomInput } from "../../../shared/schemas/room.schema";
import { CreateSeatInput } from "../../../shared/schemas/seat.schema";

export class CreateRoomUseCase {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly seatRepo: SeatRepository,
  ) {}

  async execute(data: CreateRoomInput) {
    const existing = await this.roomRepo.findByName(data.name);
    if (existing) {
      throw new ConflictError("Room name already exists");
    }

    const room = await this.roomRepo.create(data);

    // Auto-generate seats based on totalSeats
    const seatData: CreateSeatInput[] = [];
    const rows = Math.ceil(data.totalSeats / 10); // 10 seats per row

    for (let i = 0; i < rows; i++) {
      const seatsInRow = Math.min(10, data.totalSeats - i * 10);
      for (let j = 0; j < seatsInRow; j++) {
        const rowNum = i + 1;
        const seatNum = j + 1;
        seatData.push({
          roomId: room.id,
          row: String.fromCharCode(64 + rowNum), // A, B, C...
          number: seatNum,
          tier: rowNum <= 3 ? "vip" : "standard", // First 3 rows are VIP
        });
      }
    }

    if (seatData.length > 0) {
      await this.seatRepo.createMany(seatData);
    }

    return room;
  }
}
