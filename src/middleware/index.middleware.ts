import cors from "cors";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import router from "../routers/index.router.js";
import { errorHandler } from "./error.middleware.js";

const middleware = (app: express.Application) => {
  app.use(errorHandler);
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(router);
  app.use("*", (req: express.Request, res: express.Response) => {
    console.log("Route not found");
    
    return res.status(404).send("Route not found");
  });
};

export default middleware;
