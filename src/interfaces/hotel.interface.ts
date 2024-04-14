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
    id: string;
    name: string;
    logo: string;
    noOfRooms: number;
    email: string;
    phone: number;
    altPhone: number;
  };
}

export interface HotelPublicData {
  id: string;
  name: string;
  logo: string;
  noOfRooms: number;
  email: string;
  phone: number;
  altPhone: number;
}

export interface IHotelUpdate {
  noOfRooms: number;
  phone: number;
  altPhone: number;
}
