import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

// import catchAsyncError from "./catchAsyncError.js"
// import ErrorHandler from "../utils/ErrorHandler.js"

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_PASSWORD,
});

export const uploadOnCloudinary = async (file) => {
  if (!file) return;

  if (!userId) {
    return next(new ErrorHandler(401, "Unauthorized"));
  }
  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    fs.unlinkSync(file);
    console.log(uploadResult);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(file);
    return null;
  }
};

export const deleteOnCloudinary = async (fileId) => {
  if (!fileId) return;
  try {
    const result = await cloudinary.uploader.destroy(fileId);
    return result;
  } catch (error) {
    return null;
  }
};
