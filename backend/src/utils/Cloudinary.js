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

  try {
    const uploadResult = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return uploadResult;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    fs.unlinkSync(file);
  }
};

export const updateFileOnCloudinary = async (file, imagePublicId) => {
  if (!file) return;

  try {
    const updateImage = await cloudinary.uploader.upload(file, {
      public_id: imagePublicId,
      resource_type: "auto",
    });
    return updateImage;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    fs.unlinkSync(file);
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
