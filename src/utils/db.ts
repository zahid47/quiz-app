import config from "./config";
import mongoose from "mongoose";
import log from "./logger";

export const connectToDb = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL);
    log.info("MongoDB Connected");
  } catch {
    log.error("Could not connect to MongoDB");
    process.exit(1);
  }
};

export const disconnectFromDb = () => {
  return mongoose.connection.close(false, () => {
    log.info("MongoDB disconnected");
  });
};
