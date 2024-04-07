import Joi from "joi";
import { Hotel } from "../interfaces/hotel.interface.js";

export const signupSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().required(),
  phone: Joi.number().optional(),
  altPhone: Joi.number().optional(),
  noOfRooms: Joi.number().required(),
});

export const loginSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
