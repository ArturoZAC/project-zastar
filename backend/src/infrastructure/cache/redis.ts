import Redis from "ioredis";

import { envs } from "../../shared/config/envs";
import { logger } from "../../shared/config/logger";

const SEAT_LOCK_TTL = 300; // 5 minutes in seconds

const redis = new Redis({
  host: envs.REDIS_HOST,
  port: envs.REDIS_PORT,
  maxRetriesPerRequest: 3,
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (err: Error) => {
  logger.error("Redis error: %s", err.message);
});

// --- Seat Locking ---

export const acquireSeatLock = async (
  functionId: string,
  seatId: string,
  userId: string,
): Promise<boolean> => {
  const key = `seat:lock:${functionId}:${seatId}`;
  const result = await redis.set(key, userId, "EX", SEAT_LOCK_TTL, "NX");
  return result === "OK";
};

export const releaseSeatLock = async (functionId: string, seatId: string): Promise<void> => {
  const key = `seat:lock:${functionId}:${seatId}`;
  await redis.del(key);
};

export const isSeatLocked = async (functionId: string, seatId: string): Promise<boolean> => {
  const key = `seat:lock:${functionId}:${seatId}`;
  const exists = await redis.exists(key);
  return exists === 1;
};

export const getSeatLockOwner = async (
  functionId: string,
  seatId: string,
): Promise<string | null> => {
  const key = `seat:lock:${functionId}:${seatId}`;
  return await redis.get(key);
};

// --- Connection ---

export const disconnectRedis = async (): Promise<void> => {
  await redis.quit();
  logger.info("Redis connection closed");
};
