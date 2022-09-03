import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  // defaultMeta: { service: "your-service-name" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
  const customConsoleFormat = format.printf(({ level, message, stack }) => {
    if (stack) return `[${level}]: ${stack}`;
    return `[${level}]: ${message}`;
  });
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), customConsoleFormat),
    })
  );
}

export default logger;
