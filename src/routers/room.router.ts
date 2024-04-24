import express from "express";
import authentication from "../middleware/auth.middleware.js";
import roomController from "../controllers/room.controller.js";
import validator from "../validators/validator.js";
import { updateRoomCategorySchema } from "../validators/room.validator.js";

const roomRouter = express.Router();

roomRouter.post("/create", authentication, roomController.createRooms);
roomRouter.get("/", authentication, roomController.getRooms);
roomRouter.get("/:number", authentication, roomController.getRoomByNumber);
roomRouter.post("/category", authentication, validator(updateRoomCategorySchema), roomController.assignCategoryToRoom)

export default roomRouter;
