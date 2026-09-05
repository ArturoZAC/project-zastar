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

  // Better Auth
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),

  // Google OAuth (optional)
  GOOGLE_CLIENT_ID: z.string().optional().default(""),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(""),

  // JWT (legacy)
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().default("1h"),

  // Izipay
  IZIPAY_MERCHANT_CODE: z.string().min(1),
  IZIPAY_API_KEY: z.string().min(1),
  IZIPAY_PUBLIC_KEY: z.string().min(1),

  // Culqi
  CULQI_PUBLIC_KEY: z.string().min(1),
  CULQI_SECRET_KEY: z.string().min(1),

  // Payment provider selection
  ACTIVE_PAYMENT_PROVIDER: z.enum(["culqi", "izipay"]).default("culqi"),

  // Cloudflare R2
  R2_ACCOUNT_ID: z.string().optional().default(""),
  R2_ACCESS_KEY_ID: z.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z.string().optional().default(""),
  R2_BUCKET_NAME: z.string().optional().default(""),
  R2_PUBLIC_URL: z.string().optional().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const envs = parsed.data;
