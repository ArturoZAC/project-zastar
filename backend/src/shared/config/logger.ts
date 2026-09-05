import pino from "pino";

import { envs } from "./envs";

const isDev = envs.NODE_ENV === "development";

const fileStreams = [
  { level: "error", stream: pino.destination({ dest: "./logs/error.log", mkdir: true }) },
  { level: "warn", stream: pino.destination({ dest: "./logs/warn.log", mkdir: true }) },
  { level: "info", stream: pino.destination({ dest: "./logs/app.log", mkdir: true }) },
];

const streams = isDev
  ? [
      {
        level: "debug",
        stream: pino.transport({
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        }),
      },
      ...fileStreams,
    ]
  : fileStreams;

export const logger = pino(
  {
    level: isDev ? "debug" : "info",
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
  },
  pino.multistream(streams),
);
