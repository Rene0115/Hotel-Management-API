import multer from 'multer';
import path from 'path';
import { Request, Response } from 'express';

const store = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname);
    console.log(file);
    
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== ".svg") {
      cb(new Error('File type is not supported'));
      return;
    }
    cb(null, true);
  },
});

export default store;