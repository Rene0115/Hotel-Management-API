import { Hotel } from "../interfaces/hotel.interface.js";
import { HotelModel } from "../models/hotel.model.js";

class HotelServices {
  async createHotel(data: Hotel): Promise<Hotel> {
    const hotel = await HotelModel.create(data);
    return hotel;
  }

  async find(data: object) {
    const hotels = await HotelModel.find(data);
    return hotels;
  }
  async findById(id: string) {
    const hotel = await HotelModel.findById(id);
    return hotel;
  }

  async delete(data: object) {
    const hotel = await HotelModel.deleteOne(data);
    return hotel;
  }
}

export default new HotelServices();
