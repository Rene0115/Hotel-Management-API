import mongoose from "mongoose";
import { RoomCategory } from "../interfaces/room.interface.js";

const roomCategorySchema = new mongoose.Schema<RoomCategory>(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    hotelId: {
      type: String,
      required: true,
    },
    noOfRooms: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export const roomCategoryModel = mongoose.model<RoomCategory>(
  "RoomCategory",
  roomCategorySchema
);
