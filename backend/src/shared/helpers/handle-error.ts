import { Response } from "express";

import { AppError } from "../errors/app-error";
import { ResponseHelper } from "./response";

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json(ResponseHelper.error(error.message));
    return;
  }

  res.status(500).json(ResponseHelper.error("Internal Server Error"));
};
