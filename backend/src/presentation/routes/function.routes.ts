import { Router } from "express";
import { z } from "zod";

import {
  createFunctionSchema,
  functionFiltersSchema,
  updateFunctionSchema,
} from "../../shared/schemas/function.schema";
import { FunctionController } from "../controllers/function.controller";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

router.post("/", validateBody(createFunctionSchema), FunctionController.create);
router.get("/", validateQuery(functionFiltersSchema), FunctionController.getAll);
router.get("/:id", validateParams(idParamSchema), FunctionController.getById);
router.patch(
  "/:id",
  validateParams(idParamSchema),
  validateBody(updateFunctionSchema),
  FunctionController.update,
);
router.delete("/:id", validateParams(idParamSchema), FunctionController.delete);

export default router;
