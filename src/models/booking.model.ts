import mongoose from "mongoose";
import { Booking } from "../interfaces/room.interface.js";
import { roomTypeModel } from "./type.model.js";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  roomType: roomTypeModel,
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
});

export const bookingModel = mongoose.model<Booking>("Booking", bookingSchema);
