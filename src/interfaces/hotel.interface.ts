import { Request } from "express";

export interface Hotel {
  name: string;
  logo?: string;
  noOfRooms: number;
  email: string;
  password: string;
  phone?: number;
  altPhone?: number;
}

export interface HotelRequest extends Request {
  hotel?: {
    name: string;
    logo: string;
    noOfRooms: number;
    email: string;
    phone: number;
    altPhone: number;
  };
}

export interface HotelPublicData {
  name: string;
  logo: string;
  noOfRooms: number;
  email: string;
  phone: number;
  altPhone: number;
}
