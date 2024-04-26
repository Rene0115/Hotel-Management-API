import { Response } from "express";
import { Hotel, HotelRequest } from "../interfaces/hotel.interface.js";
import hotelService from "../services/hotel.service.js";
import roomService from "../services/room.service.js";
import { convertArrayToString } from "../utils/functions.js";
import moment from "moment";
import { Booking } from "../interfaces/room.interface.js";
import { UpdateBooking } from "../interfaces/room.interface.js";

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

  async assignCategoryToRoom(req: HotelRequest, res: Response) {
    try {
      if (!req.hotel?.id) {
        return res.status(400).send({
          success: false,
          message: "Invalid Token",
        });
      }

      const category = req.body.category;
      if (!category) {
        return res.status(400).send({
          success: false,
          message: "Must provide a category",
        });
      }

      const selectedRooms: number[] = req.body.roomNumbers;

      if (selectedRooms.length < 1) {
        return res.status(400).send({
          success: false,
          message: "Must select at least one room",
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
      const validCategory = await hotelService.getCategoryByName(
        category,
        hotelId
      );
      if (!validCategory) {
        return res.status(400).send({
          success: false,
          message: "Category does not exist",
        });
      }

      const availableRooms = await roomService.getAllRoomsfilter(
        hotelId,
        "AVAILABLE",
        undefined
      );
      const availableRoomNumbers = availableRooms.map((room) => room.number);
      console.log(availableRoomNumbers);

      const unavailableRooms = selectedRooms.filter(
        (number) => !availableRoomNumbers.includes(number)
      );

      console.log(unavailableRooms);

      if (unavailableRooms.length > 0) {
        const rooms = convertArrayToString(unavailableRooms);
        return res.status(400).send({
          success: false,
          message: `Room(s) ${rooms} are unavailable`,
        });
      }
      const updatedRooms = [];
      for (const number of selectedRooms) {
        const room = await roomService.findByNumber(number, hotelId);
        if (!room) return;
        if (room.category !== undefined) {
          const prevCategory = await hotelService.getCategoryByName(
            room.category,
            hotelId
          );
          if (prevCategory) {
            prevCategory.noOfRooms = (prevCategory.noOfRooms as number) - 1;
            await prevCategory.save();
          }
        }

        room.category = category;
        await room.save();

        updatedRooms.push(room);
      }
      const rooms = await roomService.getAllRoomsfilter(
        hotelId,
        undefined,
        category
      );
      validCategory.noOfRooms = rooms.length;
      await validCategory.save();

      return res.status(200).send({
        success: true,
        message: "Rooms updated successfully",
        data: updatedRooms,
      });
    } catch (error: any) {
      console.log(error);

      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }
  async createBooking(req: HotelRequest, res: Response) {
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
    const roomNumber = req.body.roomNumber;
    const room = await roomService.findByNumber(roomNumber, hotelId);
    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }
    if (room.status === "BOOKED") {
      return res.status(400).send({
        success: false,
        message: "Room is already booked",
      });
    }
    if (!room.category) {
      return res.status(400).send({
        success: false,
        message: "Room has no category",
      });
    }
    const data: Booking = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      roomCategory: room.category,
      roomNumber: roomNumber,
      checkInDate: req.body.checkInDate,
      checkOutDate: req.body.checkOutDate,
      hotelId: hotelId,
    };
    const now: moment.Moment = moment(new Date());
    const checkInDate = moment(data.checkInDate);
    const checkOutDate = moment(data.checkOutDate);
    if (checkInDate.isBefore(now) || checkOutDate.isBefore(now)) {
      return res.status(400).send({
        success: false,
        message: "Check in date and check out date must be in the future",
      });
    }
    if (checkInDate.isAfter(checkOutDate)) {
      return res.status(400).send({
        success: false,
        message: "Check in date must be before check out date",
      });
    }

    room.status = "BOOKED";
    await room.save();

    data.checkInDate = checkInDate.toDate();
    data.checkOutDate = checkOutDate.toDate();
    const booking = await roomService.createBooking(data);
    return res.status(200).send({
      success: true,
      message: `Room ${roomNumber} has been booked by ${data.name}`,
      data: booking,
    });
  }

  async updateBooking(req: HotelRequest, res: Response) {
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
    const data = req.body as UpdateBooking;
    if (!data.bookingId) {
      return res.status(400).send({
        success: false,
        message: "Must provide a booking id",
      });
    }
    const booking = await roomService.findBookingById(data.bookingId);
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }
    if (booking.hotelId !== hotelId) {
      return res.status(400).send({
        success: false,
        message: "This booking does not belong to you",
      });
    }
    const now: moment.Moment = moment(new Date());
    if (data.checkOutDate) {
      const checkInDate = moment(booking.checkInDate);
      const checkOutDate = moment(data.checkOutDate);
      if (checkOutDate.isBefore(now)) {
        return res.status(400).send({
          success: false,
          message: "Check out date must be in the future",
        });
      }
      if (checkInDate.isAfter(checkOutDate)) {
        return res.status(400).send({
          success: false,
          message: `Selected check out date is before check in date: ${moment(
            booking.checkInDate
          ).format("MMMM Do YYYY, h:mm:ss a")} `,
        });
      }
      data.checkOutDate = checkOutDate.toDate();
    }

    const updatedBooking = await roomService.updateBooking(booking.id, data);
    return res.status(200).send({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  }

  async cancelBooking() {}
}

export default new RoomController();
