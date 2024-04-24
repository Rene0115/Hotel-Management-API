import express from "express";
import authentication from "../middleware/auth.middleware.js";
import roomController from "../controllers/room.controller.js";

const roomRouter = express.Router();

roomRouter.post("/create", authentication, roomController.createRooms);
roomRouter.get("/", authentication, roomController.getRooms);

export default roomRouter;
