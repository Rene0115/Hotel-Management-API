import cors from "cors";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "../routers/index.router.js";
import { errorHandler } from "./error.middleware.js";

const middleware = (app: express.Application) => {
  app.use(errorHandler);
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(
    "/room/bookings",
    (req: Request, res: Response, next: NextFunction) => {
      const queryString = req.query.checkInDate;
      console.log(queryString);

      console.log("here1");
      console.log(typeof queryString);
      if (typeof queryString === "string") {
        console.log("here");

        console.log(typeof queryString);

        const decodedQueryString = queryString.replace(/%2B/g, "+");
        req.query.checkInDate = decodedQueryString;
      }
      next();
    }
  );

  app.use(helmet());
  app.use(router);
  app.use("*", (req: express.Request, res: express.Response) => {
    console.log("Route not found");

    return res.status(404).send("Route not found");
  });
};

export default middleware;
