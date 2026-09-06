import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../../infrastructure/database/connection";
import { accounts } from "../../infrastructure/database/schema/account.schema";
import { sessions } from "../../infrastructure/database/schema/session.schema";
import { users } from "../../infrastructure/database/schema/user.schema";
import { verifications } from "../../infrastructure/database/schema/verification.schema";
import { envs } from "./envs";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  baseURL: envs.BETTER_AUTH_URL,
  basePath: "/api/auth",
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      lastName: {
        type: "string",
        required: false,
        defaultValue: "",
        input: true,
      },
      role: {
        type: ["admin", "user"],
        required: false,
        defaultValue: "user",
        input: false, // solo el backend puede cambiar el role
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: envs.GOOGLE_CLIENT_ID,
      clientSecret: envs.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  trustedOrigins: [envs.FRONTEND_URL],
});
