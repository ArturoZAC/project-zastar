import pino from "pino";

import { envs } from "./envs";

const transport =
  envs.NODE_ENV === "development"
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined;

export const logger = pino({
  level: envs.NODE_ENV === "production" ? "info" : "debug",
  transport,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
});
