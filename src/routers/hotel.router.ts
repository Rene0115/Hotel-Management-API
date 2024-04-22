import express from "express"
import hotelController from "../controllers/hotel.controller.js";
import validator from "../validators/validator.js";
import { loginSchema, signupSchema, updateSchema } from "../validators/hotel.validator.js";
import authentication from "../middleware/auth.middleware.js";
import store from "../config/multer.config.js";


const hotelRouter = express.Router();

hotelRouter.post("/signup", validator(signupSchema), hotelController.createHotel)
hotelRouter.post("/login", validator(loginSchema), hotelController.login)
hotelRouter.put("/update-logo", authentication, store.single("image"), hotelController.updateHotelLogo)
hotelRouter.put("/update", authentication, validator(updateSchema), hotelController.update)

export default hotelRouter;