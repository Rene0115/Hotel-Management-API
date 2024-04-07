import express from "express"
import hotelController from "../controllers/hotel.controller.js";
import validator from "../validators/validator.js";
import { loginSchema, signupSchema } from "../validators/hotel.validator.js";


const hotelRouter = express.Router();

hotelRouter.post("/signup", validator(signupSchema), hotelController.createHotel)
hotelRouter.post("/login", validator(loginSchema), hotelController.login)

export default hotelRouter;