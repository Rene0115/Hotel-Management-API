import mongoose from "mongoose";
import { RoomCategory } from "../interfaces/room.interface.js";

const roomCategorySchema = new mongoose.Schema<RoomCategory>({
  category: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
},{timestamps: true, versionKey: false});

export const roomCategoryModel = mongoose.model<RoomCategory>(
  "RoomCategory",
  roomCategorySchema
);
