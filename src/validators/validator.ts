import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const validator =
  (schema: Joi.Schema, reqbody: "body" | "query" = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validateAsync(req[reqbody]);
      if (reqbody === "body") {
        req.body = validated;
      } else {
        req.query = validated;
      }
      next();
    } catch (e: any) {
      console.log(e);
      return res.status(400).send({ success: false, message: e.message });
    }
  };

export default validator;
