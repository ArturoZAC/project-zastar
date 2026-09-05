import { Router } from "express";
import { z } from "zod";

import {
  createRoomSchema,
  roomFiltersSchema,
  updateRoomSchema,
} from "../../shared/schemas/room.schema";
import { RoomController } from "../controllers/room.controller";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

router.post("/", validateBody(createRoomSchema), RoomController.create);
router.get("/", validateQuery(roomFiltersSchema), RoomController.getAll);
router.get("/:id", validateParams(idParamSchema), RoomController.getById);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateRoomSchema),
  RoomController.update,
);
router.delete("/:id", validateParams(idParamSchema), RoomController.delete);

export default router;
