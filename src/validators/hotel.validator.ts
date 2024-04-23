import Joi from "joi";
import { Hotel, updateHotel } from "../interfaces/hotel.interface.js";

export const signupSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().required().trim(),
  phone: Joi.number().optional(),
  altPhone: Joi.number().optional(),
  noOfRooms: Joi.number().optional(),
});

export const loginSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const updateSchema = Joi.object<updateHotel>({
  name: Joi.string().optional().trim(),
  logo: Joi.string().optional().trim(),
  noOfRooms: Joi.number().optional(),
  phone: Joi.number().optional(),
  altPhone: Joi.number().optional(),
});
