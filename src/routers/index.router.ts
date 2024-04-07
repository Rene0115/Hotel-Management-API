import express from "express";
import hotelRouter from "./hotel.router.js";

const router = express.Router();

router.use("/hotel", hotelRouter);

export default router;
