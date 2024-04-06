import mongoose from "mongoose";
import dotenv from "dotenv";
import { logger } from "../app.js";

dotenv.config();
const url = process.env.DATABASE_URL;
export const database = () => {
  if (url === undefined) return;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => {
      logger.info("Database connection established");
    })
    .catch((error) => {
      console.error(error);

      logger.error(`Error connecting to database, error: ${error.message}`);
    });
};
