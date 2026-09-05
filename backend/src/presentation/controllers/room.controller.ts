import { Request, Response } from "express";

import { CreateRoomUseCase } from "../../application/use-cases/room/create-room.use-case";
import { DeleteRoomUseCase } from "../../application/use-cases/room/delete-room.use-case";
import {
  GetAllRoomsUseCase,
  GetRoomByIdUseCase,
} from "../../application/use-cases/room/get-rooms.use-case";
import { UpdateRoomUseCase } from "../../application/use-cases/room/update-room.use-case";
import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const roomRepo = new RoomRepositoryImpl();
const seatRepo = new SeatRepositoryImpl();

export class RoomController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateRoomUseCase(roomRepo, seatRepo);
    const room = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("Room created", room));
  }

  static async getAll(req: Request, res: Response) {
    const useCase = new GetAllRoomsUseCase(roomRepo);
    const rooms = await useCase.execute(req.query);
    res.status(200).json(ResponseHelper.success("Rooms retrieved", rooms));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetRoomByIdUseCase(roomRepo);
    const room = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("Room retrieved", room));
  }

  static async update(req: Request, res: Response) {
    const useCase = new UpdateRoomUseCase(roomRepo);
    const room = await useCase.execute(req.params.id as string, req.body);
    res.status(200).json(ResponseHelper.success("Room updated", room));
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteRoomUseCase(roomRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
