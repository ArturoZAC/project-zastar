import { NextFunction, Request, Response } from "express";

import { logger } from "../../shared/config/logger";
import { AppError } from "../../shared/errors/app-error";
import { ResponseHelper } from "../../shared/helpers/response";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error("Unhandled error: %s", err.message);

  if (err instanceof AppError) {
    res.status(err.statusCode).json(ResponseHelper.error(err.message));
    return;
  }

  // Don't expose internal errors to the client
  res.status(500).json(ResponseHelper.error("Internal server error"));
};
