import Joi from "joi";
import { AssignCategoryToRooms } from "../interfaces/room.interface.js";

export const updateRoomCategorySchema = Joi.object<AssignCategoryToRooms>({
    category: Joi.string().required(),
    roomNumbers: Joi.array().items(Joi.number().required()).required(),
})