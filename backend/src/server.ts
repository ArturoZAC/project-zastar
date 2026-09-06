import app from "./app";
import { disconnectRedis } from "./infrastructure/cache/redis";
import { envs } from "./shared/config/envs";
import { logger } from "./shared/config/logger";

const server = app.listen(envs.PORT, () => {
  logger.info(`🚀 ZASTAR API running on http://localhost:${envs.PORT}`);
  // console.log(`🚀 ZASTAR API running on http://localhost:${envs.PORT}`);
  logger.info(`📋 Environment: ${envs.NODE_ENV}`);
});

// Graceful shutdown
const shutdown = async (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    await disconnectRedis();
    logger.info("Server closed");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10_000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
