import express from "express";
import hotelRouter from "./hotel.router.js";
import roomRouter from "./room.router.js";

const router = express.Router();

router.use("/hotel", hotelRouter);
router.use("/room", roomRouter);

export default router;
