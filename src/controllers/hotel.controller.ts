import { Response } from "express";
import { Hotel, HotelRequest } from "../interfaces/hotel.interface.js";
import hotelService from "../services/hotel.service.js";
import bcrypt from "bcrypt";
import { uploadImage } from "../config/cloudinary.config.js";
import { logger } from "../app.js";
import { RoomCategory } from "../interfaces/room.interface.js";
import roomService from "../services/room.service.js";

class HotelController {
  async createHotel(req: HotelRequest, res: Response) {
    try {
      const data: Hotel = {
        email: req.body.email,
        phone: req.body.phone,
        altPhone: req.body.altPhone,
        name: req.body.name,
        noOfRooms: req.body.noOfRooms,
        password: bcrypt.hashSync(req.body.password, 10),
      };

      const emailExists = await hotelService.findByEmail(data.email);
      if (emailExists) {
        return res.status(409).send({
          success: false,
          message: "Hotel with this email already exists",
        });
      }

      const nameExists = await hotelService.findOne({ name: data.name });
      if (nameExists) {
        return res.status(409).send({
          success: false,
          message: "Hotel with this name already exists",
        });
      }

      const hotel = await hotelService.create(data);
      return res.status(201).send({
        success: true,
        message: "Hotel created successfully",
        data: hotel.getPublicData(),
      });
    } catch (error: any) {
      console.error(error);
      return res.status(400).send({ sucess: false, message: error.message });
    }
  }

  async updateHotelLogo(req: HotelRequest, res: Response) {
    try {
      const hotelId = req.hotel?.id;
      if (!hotelId) {
        return res.status(400).send({
          success: false,
          message: "Invalid Token",
        });
      }
      const hotel = await hotelService.findById(hotelId);
      if (!hotel) {
        return res.status(400).send({
          success: false,
          message: "Account may have beeen deleted",
        });
      }
      if (!("file" in req)) {
        return res.status(400).send({
          success: false,
          message: "please provide an image file",
        });
      }
      const upload = await uploadImage(req.file?.path);
      hotel.logo = upload.url;
      await hotel.save();
      return res.status(200).send({
        success: true,
        message: "Logo updated successfully",
        data: hotel.getPublicData(),
      });
    } catch (error: any) {
      logger.error(error);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }
  async login(req: HotelRequest, res: Response) {
    try {
      const data = {
        email: req.body.email,
        password: req.body.password,
      };

      const hotelExists = await hotelService.findByEmail(data.email);
      if (!hotelExists) {
        return res
          .status(404)
          .send({ success: false, message: "Email does not exist" });
      }
      const isMatch = bcrypt.compareSync(data.password, hotelExists.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ success: false, message: "Incorrect Credentials" });
      }
      const rooms = await roomService.getAllRoomsfilter(hotelExists.id);
      hotelExists.noOfRooms = rooms.length;
      await hotelExists.save();
      const hotelPublicData = hotelExists.getPublicData();
      return res.status(200).send({
        success: true,
        message: "Login successful",
        data: {
          token: hotelExists.generateToken(),
          ...hotelPublicData,
        },
      });
    } catch (error: any) {
      console.error(error);
      return res.status(400).send({ sucess: false, message: error.message });
    }
  }

  async update(req: HotelRequest, res: Response) {
    if (!req.hotel?.id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }
    const data = req.body;
    data.id = req.hotel.id;
    const updateHotel = await hotelService.update(data);
    if (!updateHotel) {
      return res.status(400).send({
        success: false,
        message: "Update Failed",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Hotel updated successfully",
      data: updateHotel.getPublicData(),
    });
  }

  async createCategory(req: HotelRequest, res: Response) {
    try {
      if (!req.hotel?.id) {
        return res.status(400).send({
          success: false,
          message: "Invalid Token",
        });
      }

      const id = req.hotel?.id;

      const data: RoomCategory = {
        category: req.body.category.trim().toLowerCase(),
        hotelId: id,
      };

      const hotelCategories = await hotelService.getHotelCategories(id);
      if (
        hotelCategories.some((category) => category.category === data.category)
      ) {
        return res.status(409).send({
          success: false,
          message: "Category already exists",
        });
      }

      const category = await hotelService.createCategory(data);

      if (!category) {
        return res.status(400).send({
          success: false,
          message: "Category creation failed",
        });
      }
      return res.status(201).send({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteCategory(req: HotelRequest, res: Response) {
    if (!req.hotel?.id) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token",
      });
    }

    const hotelId = req.hotel?.id;

    const categoryId = req.params.id;
    const category = await hotelService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category does not exist",
      });
    }
    if (category.hotelId !== hotelId) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to delete this category",
      });
    }

    const deletedCategory = await hotelService.deleteCategory(categoryId);

    if (deletedCategory) {
      const rooms = await roomService.getAllRoomsfilter(
        hotelId,
        undefined,
        category.category
      );
      for (const room of rooms) {
        const roomD = await roomService.findByNumber(room.number, hotelId);
        if (roomD) {
          roomD.category = undefined;
          await roomD.save();
        }
      }
      return res.status(200).send({
        success: true,
        message: "Category deleted successfully",
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Category deletion failed",
      });
    }
  }
  async getCategories(req: HotelRequest, res: Response) {
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

    const categories = await hotelService.getHotelCategories(hotelId);
    return res.status(200).send({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  }

  async updateCategories(req: HotelRequest, res: Response) {
    try {
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
      const newCategory = req.body.category;
      const categoryId = req.body.categoryId;
      const oldCategoryModel = await hotelService.getCategoryById(categoryId);

      if (!oldCategoryModel) {
        return res.status(404).send({
          success: false,
          message: "Category does not exist",
        });
      }
      const oldCategory = oldCategoryModel.category;
      const category = await hotelService.updateCategoryName(
        newCategory,
        categoryId,
        hotelId
      );
      if (!category) {
        return res.status(404).send({
          success: false,
          message: "Category does not exist",
        });
      }

      const roomsWithOldCategory = await roomService.getAllRoomsfilter(
        hotelId,
        undefined,
        oldCategory
      );
      for (const room of roomsWithOldCategory) {
        const roomD = await roomService.findByNumber(room.number, hotelId);
        if (roomD) {
          roomD.category = newCategory;
          await roomD.save();
        }
      }

      return res.status(200).send({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error: any) {
      return res.status(400).send({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new HotelController();
