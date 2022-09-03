import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "../middlewares/errorHandler";
import limiter from "../middlewares/rateLimit";
import config from "./config";

const app: Express = express();

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: config.CLIENT_URL }));
app.use(limiter);
app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  return res.sendStatus(200);
});

app.use(errorHandler);

export default app;
