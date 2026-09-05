import { Router } from "express";
import { z } from "zod";

import {
  createMovieSchema,
  movieFiltersSchema,
  updateMovieSchema,
} from "../../shared/schemas/movie.schema";
import { MovieController } from "../controllers/movie.controller";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

router.post("/", validateBody(createMovieSchema), MovieController.create);
router.get("/", validateQuery(movieFiltersSchema), MovieController.getAll);
router.get("/:id", validateParams(idParamSchema), MovieController.getById);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateMovieSchema),
  MovieController.update,
);
router.delete("/:id", validateParams(idParamSchema), MovieController.delete);

export default router;
