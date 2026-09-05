import { Router } from "express";
import { z } from "zod";

import { createGenreSchema, updateGenreSchema } from "../../shared/schemas/genre.schema";
import { GenreController } from "../controllers/genre.controller";
import { validateBody, validateParams } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

router.post("/", validateBody(createGenreSchema), GenreController.create);
router.get("/", GenreController.getAll);
router.get("/:id", validateParams(idParamSchema), GenreController.getById);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateGenreSchema),
  GenreController.update,
);
router.delete("/:id", validateParams(idParamSchema), GenreController.delete);

export default router;
