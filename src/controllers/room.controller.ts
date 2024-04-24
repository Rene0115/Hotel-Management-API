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
    const hotel = await hotelService.findById(hotelId);
    if (!hotel) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }
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

    hotel.noOfRooms = hotel.noOfRooms + number;
    await hotel.save();

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

    const hotel = await hotelService.findById(hotelId);
    if (!hotel) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const status = req.query.status;
    const category = req.query.category;
    const rooms = await roomService.getAllRoomsfilter(
      hotelId,
      status as string | undefined,
      category as string | undefined
    );

    hotel.noOfRooms = rooms.length;
    await hotel.save();
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
  async getRoomByNumber(req: HotelRequest, res: Response) {
    const number = parseInt(req.params.number);

    if (!number) {
      return res.status(400).send({
        success: false,
        message: "Invalid number",
      });
    }

    if (!req.hotel?.id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const hotelId = req.hotel?.id;

    const room = await roomService.findByNumber(number, hotelId);
    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: room,
    });
  }

  
}

export default new RoomController();
