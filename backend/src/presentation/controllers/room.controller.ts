import { Request, Response } from "express";

import { CreateRoom } from "../../application/use-cases/room/create-room.use-case";
import { DeleteRoom } from "../../application/use-cases/room/delete-room.use-case";
import { GetAllRooms, GetRoomById } from "../../application/use-cases/room/get-rooms.use-case";
import { UpdateRoom } from "../../application/use-cases/room/update-room.use-case";
import { RoomRepository } from "../../domain/repositories/room.repository";
import { SeatRepository } from "../../domain/repositories/seat.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateRoomDto } from "../dtos/room/create-room.dto";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";

export class RoomController {
  constructor(
    private readonly roomRepo: RoomRepository,
    private readonly seatRepo: SeatRepository,
  ) {}

  public create = (req: Request, res: Response) => {
    const { error, dto } = CreateRoomDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new CreateRoom(this.roomRepo, this.seatRepo)
      .execute(dto!.data)
      .then((room) => res.status(201).json(ResponseHelper.created("Room created", room)))
      .catch((err) => handleError(err, res));
  };

  public getAll = (req: Request, res: Response) => {
    new GetAllRooms(this.roomRepo)
      .execute(req.query as Record<string, string>)
      .then((rooms) => res.status(200).json(ResponseHelper.success("Rooms retrieved", rooms)))
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetRoomById(this.roomRepo)
      .execute(id)
      .then((room) => res.status(200).json(ResponseHelper.success("Room retrieved", room)))
      .catch((err) => handleError(err, res));
  };

  public update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { error, dto } = UpdateRoomDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new UpdateRoom(this.roomRepo)
      .execute(id, dto!.data)
      .then((room) => res.status(200).json(ResponseHelper.success("Room updated", room)))
      .catch((err) => handleError(err, res));
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteRoom(this.roomRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
