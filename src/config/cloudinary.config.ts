import { UploadApiResponse, v2 as _cloudinary } from "cloudinary";

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const cloudinary = _cloudinary;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export async function uploadImage(file: any): Promise<UploadApiResponse> {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "Hotel-Managemen-API/images",
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return error.message;
  }
}

export async function deleteFile(fileId: any): Promise<any> {
  try {
    const response: any = await cloudinary.uploader.destroy(fileId);
    return response;
  } catch (err) {
    throw new Error(`From Cloudinary: ${err}`);
  }
}

export default {
  uploadImage,
  deleteFile,
};
