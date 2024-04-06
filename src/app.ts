import express from "express";
import * as pino from "pino";
import middleware from "./middleware/index.middleware.js";

export const logger = pino.pino();

import { database } from "./config/db.config.js";

const app: express.Application = express();

middleware(app);
const port = process.env.PORT;

const start = () => {
  app.listen(port, (): void => {
    logger.info("listening on port 4000");
  });
  database();
};

start();