import express from "express"
import hotelController from "../controllers/hotel.controller.js";
import validator from "../validators/validator.js";
import { createCategorySchema, loginSchema, signupSchema, updateCategorySchema, updateSchema } from "../validators/hotel.validator.js";
import authentication from "../middleware/auth.middleware.js";
import store from "../config/multer.config.js";


const hotelRouter = express.Router();

hotelRouter.post("/signup", validator(signupSchema), hotelController.createHotel)
hotelRouter.post("/login", validator(loginSchema), hotelController.login)
hotelRouter.put("/update-logo", authentication, store.single("image"), hotelController.updateHotelLogo)
hotelRouter.put("/update", authentication, validator(updateSchema), hotelController.update)
hotelRouter.post("/create-category", authentication, validator(createCategorySchema), hotelController.createCategory)
hotelRouter.delete("/delete-category/:id", authentication, hotelController.deleteCategory)
hotelRouter.get("/categories", authentication, hotelController.getCategories)
hotelRouter.put("/update-category", authentication, validator(updateCategorySchema), hotelController.updateCategories)

export default hotelRouter;