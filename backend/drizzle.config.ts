import { defineConfig } from "drizzle-kit";

import { envs } from "./src/shared/config/envs";

export default defineConfig({
  schema: "./src/infrastructure/database/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: envs.DATABASE_URL,
  },
});
