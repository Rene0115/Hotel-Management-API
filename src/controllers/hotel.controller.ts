import { Response } from "express";
import { Hotel, HotelRequest } from "../interfaces/hotel.interface.js";
import hotelService from "../services/hotel.service.js";
import bcrypt from "bcrypt";
import { uploadImage } from "../config/cloudinary.config.js";
import { logger } from "../app.js";

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
}

export default new HotelController();
