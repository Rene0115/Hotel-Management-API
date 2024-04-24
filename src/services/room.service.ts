import { Room } from "../interfaces/room.interface.js";
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
    const query: any = {};
    if (hotelId !== undefined) {
      query.hotelId = hotelId;
    }
    if (status !== undefined) {
      query.status = status;
    }

    if (category !== undefined) {
      query.category = category;
    }

    const rooms = await roomModel.find(query);
    return rooms;
  }
  async findByNumber(number: number, hotelId: string) {
    const room = await roomModel.findOne({ number: number, hotelId: hotelId });
    return room;
  }
}

export default new RoomServices();
