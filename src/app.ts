import express from "express";
import * as pino from "pino";
import middleware from "./middleware/index.middleware.js";
//@ts-ignore
import cron from "cron";
import moment from "moment";

export const logger = pino.pino();

import { database } from "./config/db.config.js";
import roomService from "./services/room.service.js";
import mailer from "./config/mailer.config.js";
import hotelService from "./services/hotel.service.js";

const app: express.Application = express();

middleware(app);

const job = new cron.CronJob("0 0 0 * * *", async () => {
  // everyday at 12am
  const bookings = await roomService.getAllBookings();
  for (const booking of bookings) {
    const checkOut = moment(booking.checkOutDate);
    const hotel = await hotelService.findById(booking.hotelId);
    if (!hotel) return;
    mailer(
      hotel.email,
      "ROOM CHECKING OUT TODAY",
      `Room ${booking.roomNumber} is checking out today`
    );
    if (checkOut.isSame(moment(), "day")) {
      mailer(booking.email, "CHECKOUT DAY REACHED", "Your checkout is today");
    }
    const room = await roomService.findByNumber(
      booking.roomNumber,
      booking.hotelId
    );
    if (room) {
      room.status = "AVAILABLE";
      await room.save();
    }
    return;
  }
});

const port = process.env.PORT;

const start = () => {
  app.listen(port, (): void => {
    logger.info(`listening on port ${port}`);
  });
  database();
};

start();
job.start();
