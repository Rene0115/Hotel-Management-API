import { Response } from "express";
import { Hotel, HotelRequest } from "../interfaces/hotel.interface.js";
import hotelService from "../services/hotel.service.js";
import roomService from "../services/room.service.js";

class RoomController {
  async createRooms(req: HotelRequest, res: Response) {
    if (!req.hotel?.id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const hotelId = req.hotel?.id;

    const number = parseInt(req.body.number);
    if (!number) {
      return res.status(400).send({
        success: false,
        message: "Invalid number of rooms",
      });
    }

    const rooms = await roomService.createRooms(number, hotelId);
    if (!rooms) {
      return res.status(500).send({
        success: false,
        message: "Error creating rooms",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Rooms created successfully",
      data: rooms,
    });
  }

  async getRooms(req: HotelRequest, res: Response) {
    if (!req.hotel?.id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const hotelId = req.hotel?.id;
    const status = req.query.status;
    const category = req.query.category;
    const rooms = await roomService.getAllRoomsfilter(
      hotelId,
      status as string | undefined,
      category as string | undefined
    );

    if (rooms.length < 1) {
      return res.status(404).send({
        success: false,
        message: "No rooms match this query",
      });
    }
    return res.status(200).send({
      success: true,
      data: rooms,
    });
  }
}

export default new RoomController();
