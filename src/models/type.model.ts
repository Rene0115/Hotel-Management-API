import mongoose from "mongoose";
import { RoomType } from "../interfaces/room.interface.js";

const roomTypeSchema = new mongoose.Schema<RoomType>({
  type: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
  },
});

export const roomTypeModel = mongoose.model<RoomType>("RoomType", roomTypeSchema);
