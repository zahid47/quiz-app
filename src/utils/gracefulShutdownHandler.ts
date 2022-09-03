import { disconnectFromDb } from "../utils/db";
import log from "./logger";
import server from "../server";

const gracefulShutdownHandler = (signal: "SIGINT" | "SIGTERM" | "SIGHUP") => {
  log.info(`${signal} received. Exiting...`);

  server.close(() => {
    log.info("Server closed");
    disconnectFromDb();
  });
};

export default gracefulShutdownHandler;
