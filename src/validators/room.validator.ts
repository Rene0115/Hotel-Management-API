import Joi from "joi";
import {
  AssignCategoryToRooms,
  Booking,
} from "../interfaces/room.interface.js";

export const updateRoomCategorySchema = Joi.object<AssignCategoryToRooms>({
  category: Joi.string().required().trim(),
  roomNumbers: Joi.array().items(Joi.number().required()).required(),
});

export const bookingSchema = Joi.object<Booking>({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().required().trim(),
  roomNumber: Joi.number().required(),
  checkInDate: Joi.date().required(),
  checkOutDate: Joi.date().required(),
});
