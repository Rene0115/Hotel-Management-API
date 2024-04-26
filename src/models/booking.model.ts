import mongoose from "mongoose";
import { Booking } from "../interfaces/room.interface.js";

const bookingSchema = new mongoose.Schema<Booking>(
  {
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
    roomCategory: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    hotelId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const bookingModel = mongoose.model<Booking>("Booking", bookingSchema);
