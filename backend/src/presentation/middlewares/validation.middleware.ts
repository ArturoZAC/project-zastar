import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

import { ResponseHelper } from "../../shared/helpers/response";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      res.status(400).json(ResponseHelper.error("Validation failed", errors));
      return;
    }

    req.body = result.data;
    next();
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      res.status(400).json(ResponseHelper.error("Invalid parameters", errors));
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.params = result.data as any;
    next();
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      res.status(400).json(ResponseHelper.error("Invalid query parameters", errors));
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.query = result.data as any;
    next();
  };
};
