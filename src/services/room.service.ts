import { Booking, Room, UpdateBooking } from "../interfaces/room.interface.js";
import { bookingModel } from "../models/booking.model.js";
import { roomModel } from "../models/room.model.js";

class RoomServices {
  async createRooms(x: number, hotelId: string): Promise<Room[]> {
    const existingRooms = await roomModel.find({ hotelId: hotelId });
    const lastRoomNumber =
      existingRooms.length > 0
        ? Math.max(...existingRooms.map((room) => room.number))
        : 0;
    const rooms = [];
    for (let i = lastRoomNumber + 1; i <= lastRoomNumber + x; i++) {
      const room = await roomModel.create({
        number: i,
        hotelId: hotelId,
      });
      rooms.push(room);
    }
    return rooms;
  }

  async getAllRoomsfilter(hotelId: string, status?: string, category?: string) {
    const query = {
      ...(hotelId ? { hotelId } : {}),
      ...(status ? { status } : {}),
      ...(category ? { category } : {}),
    };
    return await roomModel.find(query);
  }

  async findByNumber(number: number, hotelId: string) {
    const room = await roomModel.findOne({ number: number, hotelId: hotelId });
    return room;
  }

  async createBooking(data: Booking) {
    const booking = await bookingModel.create(data);
    return booking;
  }

  async getAllBookings(
    hotelId?: string,
    checkInDate?: Date,
    checkOutDate?: Date
  ) {
    const query = {
      ...(hotelId ? { hotelId } : {}),
      ...(checkInDate ? { checkInDate } : {}),
      ...(checkOutDate ? { checkOutDate } : {}),
    };
    return await bookingModel.find(query);
  }

  async updateBooking(bookingId: string, data: UpdateBooking) {
    const booking = await bookingModel.findByIdAndUpdate(bookingId, data, {
      new: true,
    });
    return booking;
  }

  async cancelBooking(id: string) {
    const booking = await bookingModel.findByIdAndDelete(id);
    if (booking) return true;
    else return false;
  }

  async findBookingById(id: string) {
    const booking = await bookingModel.findById(id);
    return booking;
  }
}

export default new RoomServices();
