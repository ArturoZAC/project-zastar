import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  // Server
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Database
  DATABASE_URL: z.string().url(),

  // Redis
  REDIS_HOST: z.string().default("localhost"),
  REDIS_PORT: z.coerce.number().default(6379),

  // JWT
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1h"),

  // Izipay
  IZIPAY_MERCHANT_CODE: z.string().min(1),
  IZIPAY_API_KEY: z.string().min(1),
  IZIPAY_PUBLIC_KEY: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const envs = parsed.data;
