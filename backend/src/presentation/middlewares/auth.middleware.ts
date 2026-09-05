import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";

import { auth } from "../../shared/config/auth";
import { ResponseHelper } from "../../shared/helpers/response";

export interface UserPayload {
  id: string;
  email: string;
  name: string;
  image?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers as Record<string, string | string[]>),
    });

    if (!session || !session.user) {
      res.status(401).json(ResponseHelper.error("Unauthorized - No valid session"));
      return;
    }

    const userPayload: UserPayload = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image || undefined,
      role: (session.user as Record<string, unknown>).role as string | undefined,
      firstName: (session.user as Record<string, unknown>).firstName as string | undefined,
      lastName: (session.user as Record<string, unknown>).lastName as string | undefined,
    };

    // Attach user to request using a symbol to avoid type conflicts
    Object.defineProperty(req, "user", {
      value: userPayload,
      writable: true,
      enumerable: true,
      configurable: true,
    });

    next();
  } catch {
    res.status(401).json(ResponseHelper.error("Unauthorized - Invalid token"));
  }
};
