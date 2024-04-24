import { Schema, model, Document } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Hotel, HotelPublicData } from "../interfaces/hotel.interface.js";

dotenv.config();

interface HotelDocument extends Hotel, Document {
  generateToken: () => string;
  getPublicData: () => HotelPublicData;
}

const hotelSchema = new Schema<HotelDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    noOfRooms: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
    },
    altPhone: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

hotelSchema.methods.getPublicData = function (): HotelPublicData {
  return {
    id: this._id,
    name: this.name,
    logo: this.logo,
    noOfRooms: this.noOfRooms,
    email: this.email,
    phone: this.phone,
    altPhone: this.altPhone,
  };
};

hotelSchema.methods.generateToken = function (): string {
  if (!process.env.TOKEN_SECRET) {
    throw new Error(
      "TOKEN_SECRET is not defined in your environment variables."
    );
  }
  const token = jwt.sign(this.getPublicData(), process.env.TOKEN_SECRET, {
    expiresIn: "10d",
  });
  return token;
};

export const HotelModel = model<HotelDocument>("Hotel", hotelSchema);
