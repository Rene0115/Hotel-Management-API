import Joi from "joi";
import {
  AssignCategoryToRooms,
  Booking,
  UpdateBooking,
} from "../interfaces/room.interface.js";

export const assignCategorySchema = Joi.object<AssignCategoryToRooms>({
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

export const updateBookingSchema = Joi.object<UpdateBooking>({
  bookingId: Joi.string().required(),
  name: Joi.string().optional().trim(),
  email: Joi.string().email().optional().trim(),
  phone: Joi.string().optional().trim(),
//   checkInDate: Joi.date().optional(),
  checkOutDate: Joi.date().optional(),
});
