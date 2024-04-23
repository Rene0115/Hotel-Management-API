import { Request } from "express";

export interface Hotel {
  name: string;
  logo?: string;
  noOfRooms: number;
  email: string;
  password: string;
  phone?: string;
  altPhone?: string;
}

export interface HotelRequest extends Request {
  hotel?: {
    id: string;
    name: string;
    logo: string;
    noOfRooms: number;
    email: string;
    phone: string;
    altPhone: string;
  };
}

export interface HotelPublicData {
  id: string;
  name: string;
  logo: string;
  noOfRooms: number;
  email: string;
  phone: string;
  altPhone: string;
}

export interface IHotelUpdate {
  noOfRooms: number;
  phone: string;
  altPhone: string;
}

export interface updateHotel {
  name: string;
  logo: string;
  noOfRooms: number;
  phone: string;
  altPhone: string;
}
