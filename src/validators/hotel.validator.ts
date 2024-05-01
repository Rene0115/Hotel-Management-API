import Joi from "joi";
import { Hotel, updateHotel } from "../interfaces/hotel.interface.js";
import { RoomCategory, updateCategory } from "../interfaces/room.interface.js";

export const signupSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  name: Joi.string().required().trim(),
  phone: Joi.string().optional().trim(),
  altPhone: Joi.string().optional().trim(),
  noOfRooms: Joi.number().optional(),
});

export const loginSchema = Joi.object<Hotel>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

export const updateSchema = Joi.object<updateHotel>({
  name: Joi.string().optional().trim(),
  noOfRooms: Joi.number().optional(),
  phone: Joi.string().optional().trim(),
  altPhone: Joi.string().optional().trim(),
});

export const createCategorySchema = Joi.object<RoomCategory>({
  category: Joi.string().required().trim(),
});

export const updateCategorySchema = Joi.object<updateCategory>({
  category: Joi.string().required().trim(),
  categoryId: Joi.string().required().trim(),
});
