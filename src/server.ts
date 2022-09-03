import { connectToDb } from "./utils/db";
import app from "./utils/app";
import log from "./utils/logger";
import gracefulShutdownHandler from "./utils/gracefulShutdownHandler";
import config from "./utils/config";

const host: string = config.HOST;
const port: number = config.PORT;

const server = app.listen(port, async () => {
  await connectToDb();
  log.info(`server running on ${host}:${port} & process id is ${process.pid}`);
  log.info(`docs available at ${host}:${port}/api/v1/docs`);
});

process.on("SIGINT", gracefulShutdownHandler);
process.on("SIGTERM", gracefulShutdownHandler);

export default server;
