import express from "express";
export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(400).send({
    success: false,
    message: err.message,
  });
};
