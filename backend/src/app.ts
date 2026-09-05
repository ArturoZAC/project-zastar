import cors from "cors";
import express from "express";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./shared/config/auth";
import { envs } from "./shared/config/envs";
import { errorHandler } from "./presentation/middlewares/error-handler.middleware";
import { apiLimiter, authLimiter } from "./presentation/middlewares/rate-limit.middleware";
import routes from "./presentation/routes";

const app: ReturnType<typeof express> = express();

// Better Auth handler (MUST be before express.json())
app.all("/api/auth/{*any}", authLimiter, toNodeHandler(auth));

// Body parsing (AFTER Better Auth handler)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: envs.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// Rate limiting for all API routes
app.use("/api/v1", apiLimiter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1", routes);

// Error handling (must be last)
app.use(errorHandler);

export default app;
