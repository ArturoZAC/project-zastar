import express from "express";

import { errorHandler } from "./presentation/middlewares/error-handler.middleware";
import routes from "./presentation/routes";

const app: ReturnType<typeof express> = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API routes
app.use("/api/v1", routes);

// Error handling (must be last)
app.use(errorHandler);

export default app;
