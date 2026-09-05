import { NextFunction, Request, Response } from "express";

import { ResponseHelper } from "../../shared/helpers/response";
import { UserPayload } from "./auth.middleware";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as unknown as { user?: UserPayload }).user;

  if (!user) {
    res.status(401).json(ResponseHelper.error("Unauthorized"));
    return;
  }

  if (user.role !== "admin") {
    res.status(403).json(ResponseHelper.error("Forbidden - Admin access required"));
    return;
  }

  next();
};
