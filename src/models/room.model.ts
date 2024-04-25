import mongoose from "mongoose";
import { Room } from "../interfaces/room.interface.js";

const roomSchema = new mongoose.Schema<Room>(
  {
    number: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: undefined,
    },
    hotelId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED"],
      default: "AVAILABLE",
    },
    bookedBy:{
      type: String,
    },
    dateBooked:{
      type: Date
    }
  },
  { timestamps: true, versionKey: false }
);

export const roomModel = mongoose.model<Room>("Room", roomSchema);
