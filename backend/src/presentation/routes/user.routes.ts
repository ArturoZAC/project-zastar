import { Router } from "express";
import { z } from "zod";

import { createUserSchema, updateUserSchema } from "../../shared/schemas/user.schema";
import { UserController } from "../controllers/user.controller";
import { validateBody, validateParams } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

router.post("/", validateBody(createUserSchema), UserController.create);
router.get("/", UserController.getAll);
router.get("/:id", validateParams(idParamSchema), UserController.getById);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateUserSchema),
  UserController.update,
);
router.delete("/:id", validateParams(idParamSchema), UserController.delete);

export default router;
