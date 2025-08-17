import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  capitalizeFirstLetter,
  normalizeString,
} from "../utils/normalizeData.js";
import User from "../models/UserSchema.js";
import OTP from "../models/OTPModel.js";
import {
  uploadOnCloudinary,
  updateFileOnCloudinary,
} from "../utils/Cloudinary.js";
import { validationResult } from "express-validator";

dotenv.config(); // reads the env file and parse the content and loads it into process.env

const secret = process.env.JWTSECRET; //getting json secret from env

//generates jwt token for authentication.
const generateAuthToken = (user) => {
  // using user Id as a token. When logged in this will act as a token to authenticate user.
  const id = {
    user: {
      id: user._id,
    },
  };
  return jwt.sign(id, secret);
};

// This method validate the email entered by the user.
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // This is the regular expression to validate email;
  return emailRegex.test(email); // returns boolean value. True if email matches emailRegex else returns false.
};

const setUser = (userInfo) => {
  const user = {
    id: userInfo.id,
    username: capitalizeFirstLetter(userInfo.username),
    email: userInfo.email,
    profilePicPath: userInfo.profilePic
      ? userInfo.profilePic
      : `https://res.cloudinary.com/djppjdulx/image/upload/v1747556794/defaultUser_bvigjn.png`,
  };

  return user;
};

//This controller contains the logic related to user login.
export const login = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  // Normalize the string by trimming spaces and converting to lowercase, ensuring consistent storage even if users input mixed-case emails or extra spaces.
  email = normalizeString(email);

  //finding user in the database by email provided by user.
  let user = await User.findOne({ email });
  //if user doesn't exist return error.
  if (!user) {
    return next(
      new ErrorHandler(400, "Please enter correct email and password")
    );
  }

  //comparing the entered password to the password present in the database, to make so it is a valid user.
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  //Throwing error if the password is incorrect.
  if (!isCorrectPassword) {
    return next(
      new ErrorHandler(400, "Please enter correct email and password")
    );
  }

  //generate auth token.
  const token = generateAuthToken(user);

  user = setUser(user);

  res.status(200).json({ success: true, user, token });
});

export const signup = catchAsyncError(async (req, res, next) => {
  let { email, password, username } = req.body;

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  // Normalize the string by trimming spaces and converting to lowercase, ensuring consistent storage even if users input mixed-case data or extra spaces.
  email = normalizeString(email);
  username = normalizeString(username);

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler(400, "User already exists"));
  }

  //Find the most recent OTP fro the email
  const response = await OTP.findOne({ email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (response === null || !response.isVerified) {
    return next(new ErrorHandler(400, "Please verify your email"));
  }

  const query = { username, email, password };

  if (req.file) {
    const uploadResult = await uploadOnCloudinary(req.file.path);
    query.profilePic = uploadResult.secure_url;
    query.profilePicId = uploadResult.public_Id;
  }

  user = await User.create(query);

  const token = generateAuthToken(user);
  user = setUser(user);

  await OTP.updateMany({ email }, { $set: { isVerified: false } });

  res.status(201).json({ success: true, token, user });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const id = req.user.id;
  console.log(id);

  let user = await User.findById(id).select([
    "-password",
    "-createdAt",
    "-__v",
  ]);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  user = setUser(user);

  res.status(200).json({ success: true, user });
});

// this controller contains forget password logic. It send otp to email for vertification and once verified user can reset there password.
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  let { email, newPassword } = req.body;

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  // Normalize the string by trimming spaces and converting to lowercase, ensuring consistent storage even if users input mixed-case data or extra spaces.
  email = normalizeString(email);

  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler(400, "Please enter correct email"));
  }

  const otp = await OTP.findOne({ email })
    .sort({ createdAt: -1 })
    .limit(1)
    .select("isVerified");
  if (!otp.isVerified) {
    return next(new ErrorHandler(400, "Please verify your email first"));
  }

  user = await User.findOne(
    { email },
    { password: newPassword },
    { new: true }
  );

  const token = generateAuthToken(user);

  await OTP.updateMany({ email }, { $set: { isVerified: false } });

  res.json({
    success: true,
    message: "Password has been reset succesfully",
    token,
  });
});

export const updateUserName = catchAsyncError(async (req, res, next) => {
  let { username } = req.body;
  const { id } = req.body.params;
  const userId = req.user.id;

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  // Normalize the string by trimming spaces and converting to lowercase, ensuring consistent storage even if users input mixed-case username or extra spaces.
  username = normalizeString(username);

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  if (user.id.toString() !== userId) {
    return next(new ErrorHandler(400, "Unauthorized"));
  }

  user = await User.findByIdAndUpdate(
    id,
    { $set: { username } },
    { new: true }
  );

  const token = generateAuthToken(user);

  user = setUser(user);
  res.status(200).json({
    success: true,
    message: "Username updated successfully",
    token,
    user,
  });
});

export const updateEmail = catchAsyncError(async (req, res, next) => {
  let { email } = req.body;
  const { id } = req.body.params;
  const userId = req.user.id;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  // Normalize the string by trimming spaces and converting to lowercase, ensuring consistent storage even if users input mixed-case data or extra spaces.
  email = normalizeString(email);

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  const otp = await OTP.findOne({ email })
    .sort({ createdAt: -1 })
    .limit(1)
    .select("isVerified");
  if (!otp.isVerified) {
    return next(new ErrorHandler(400, "Please verify your email first"));
  }

  user = await User.findByIdAndUpdate(id, { $set: { email } }, { new: true });

  const token = generateAuthToken(user);

  user = setUser(user);

  await OTP.updateMany({ email }, { $set: { isVerified: false } });

  res
    .status(200)
    .json({ success: true, message: "Username updated successfully", token });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.body.params;
  const userId = req.user.id;

  // collecting error from express validator if any.
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(new ErrorHandler(400, error.array()[0].msg));
  }

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  user = await User.findByIdAndUpdate(
    id,
    { $set: { password: password } },
    { new: true }
  );

  const token = generateAuthToken(user);

  user = setUser(user);

  res.status(200).json({
    success: true,
    message: "Password has been reset succesfully",
    token,
    user,
  });
});

export const updateProfilePic = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  if (!req.file)
    return next(new ErrorHandler(400, "Please Upload your profile pic"));

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  if (user.id.toString() !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  const uploadResult = await updateFileOnCloudinary(
    req.file.path,
    user.profilePicId
  );
  const profilePic = uploadResult.secure_url;
  const profilePicId = uploadResult.public_Id;

  user = await User.findByIdAndUpdate(
    id,
    { $set: { profilePic: profilePic, profilePicId: profilePicId } },
    { new: true }
  );

  user = setUser(user);

  res.status(200).json({
    success: true,
    message: "Profile pic update successfully",
    user,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params.id;
  const userId = req.user.id;

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  if (user.id.toString() !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Account deleted Successfully",
  });
});
