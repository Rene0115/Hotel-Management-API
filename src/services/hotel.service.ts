import { Hotel } from "../interfaces/hotel.interface.js";
import { HotelModel } from "../models/hotel.model.js";
import { roomCategoryModel } from "../models/category.model.js";
import { RoomCategory } from "../interfaces/room.interface.js";

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
      query.type = type;
    }

    if (hotelId !== undefined) {
      query.hotelId = hotelId;
    }
    console.log(query);

    const hotels = await HotelModel.find(query);
    return hotels;
  }

  async createCategory(data: RoomCategory) {
    const category = await roomCategoryModel.create(data);
    return category;
  }

  async deleteCategory(id: string) {
    const categoryToDelete = await roomCategoryModel.findByIdAndDelete(id);
    if (categoryToDelete) return true;
    else return false;
  }

  async getHotelCategories(hotelId: string) {
    const categories = await roomCategoryModel.find({ hotelId: hotelId });
    return categories;
  }

  async getCategoryById(id: string) {
    const category = await roomCategoryModel.findById(id);
    return category;
  }

  async getCategoryByName(name: string, hotelId: string) {
    const category = await roomCategoryModel.findOne({
      category: name,
      hotelId: hotelId,
    });
    return category;
  }

  async updateCategoryName(name: string, categoryId: string, hotelId: string) {
    const category = await roomCategoryModel.findOneAndUpdate(
      { _id: categoryId, hotelId: hotelId },
      { category: name },
      { new: true }
    );
    return category;
  }
}

export default new HotelServices();
