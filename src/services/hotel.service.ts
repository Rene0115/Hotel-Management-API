import { Hotel } from "../interfaces/hotel.interface.js";
import { HotelModel } from "../models/hotel.model.js";

class HotelServices {
  async create(data: Hotel) {
    const hotel = await HotelModel.create(data);
    return hotel;
  }

  async find(data: object) {
    const hotels = await HotelModel.find(data);
    return hotels;
  }

  async findOne(data: object) {
    const hotel = await HotelModel.findOne(data);
    return hotel;
  }

  async update(data: Record<any, any>) {
    const hotel = await HotelModel.findOneAndUpdate({ _id: data.id }, data, {
      new: true,
    });
    return hotel;
  }

  async findByEmail(email: string) {
    const hotel = await HotelModel.findOne({ email: email });
    return hotel;
  }
  async findById(id: string) {
    const hotel = await HotelModel.findById(id);
    return hotel;
  }

  async delete(data: object) {
    const hotel = await HotelModel.deleteOne(data);
    return hotel;
  }
  async findHotels(hotelId: string, type?: string) {
    const query: any = {};

    if (type !== undefined) {
      query.type = status;
    }

    if (hotelId !== undefined) {
      query.hotelId = hotelId;
    }
    console.log(query);

    const hotels = await HotelModel.find(query);
    return hotels;
  }
}

export default new HotelServices();
