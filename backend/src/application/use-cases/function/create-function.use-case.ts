import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { RoomRepository } from "../../../domain/repositories/room.repository";
import { SeatRepository } from "../../../domain/repositories/seat.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { CreateFunctionInput } from "../../../shared/schemas/function.schema";

export class CreateFunctionUseCase {
  constructor(
    private readonly functionRepo: FunctionRepository,
    private readonly roomRepo: RoomRepository,
    private readonly movieRepo: MovieRepository,
    private readonly seatRepo: SeatRepository,
  ) {}

  async execute(data: CreateFunctionInput) {
    const movie = await this.movieRepo.findById(data.movieId);
    if (!movie) {
      throw new NotFoundError("Movie not found");
    }

    const room = await this.roomRepo.findById(data.roomId);
    if (!room) {
      throw new NotFoundError("Room not found");
    }

    // Verify room has seats
    const seats = await this.seatRepo.findByRoomId(data.roomId);
    if (seats.length === 0) {
      throw new NotFoundError("Room has no seats configured");
    }

    const func = await this.functionRepo.create(data);
    return func;
  }
}
