import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/UserSchema.js";
import OTP from "../models/OTPModel.js";

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

const verifyOTP = async (email, userOtp, next) => {
  try {
    if (!otp) {
      return next(new ErrorHandler(400, "Please enter OTP"));
    }
    const otp = await OTP.findOne({ email });

    if (otp.otp !== userOtp) {
      return next(new ErrorHandler(400, "Please enter correct OTP"));
    }

    return true;
  } catch (error) {}
};

//This controller contains the logic related to user login.
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //If email and password doesn't exist then return error.
  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter all the fields"));
  }

  //validating email and returns email if the entered email is not a proper email.
  if (!validateEmail(email)) {
    return next(
      new ErrorHandler(400, "Please enter correct email and password")
    );
  }

  // Returns error is length password is less then 8 letters.
  if (password.length < 8) {
    return next(
      new ErrorHandler(400, "Password should be of contain atleast 8 letters")
    );
  }

  //finding user in the database by email provided by user.
  const user = await User.findOne({ email });
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

  res.status(200).json({ success: true, token });
});

export const signup = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  const profilePic = req.file ? req.file.buffer.toString("base64") : null;

  if (!username || !email || !password) {
    return next(new ErrorHandler(400, "Please fill all the fields"));
  }
  if (username.length < 4) {
    return next(
      new ErrorHandler(400, "Username should be of atleast 4 letters")
    );
  }
  //validating email and returns email if the entered email is not a proper email.
  if (!validateEmail(email)) {
    return next(
      new ErrorHandler(400, "Please enter correct email and password")
    );
  }
  // Returns error is length password is less then 8 letters.
  if (password.length < 8) {
    return next(
      new ErrorHandler(400, "Password should be of contain atleast 8 letters")
    );
  }

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

  //Secure password
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(password, salt);

  user = await User.create({
    username,
    email,
    password: hashPassword,
    profilePic,
  });

  const token = generateAuthToken(user);
  let newUser = {
    username,
    email,
    profilePicPath: user.profilePic
      ? `http://localhost:5000/${user.profilePic}`
      : `http://localhost:5000/uploads/default.png`,
  };
  res.status(201).json({ success: true, token, newUser });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params.id;

  let user = await User.findById(id).select([
    "-password",
    "-createdAt",
    "-__v",
  ]);
  if (!user) {
    return nextt(new ErrorHandler(400, "User doesn't exists"));
  }

  let newUser = {
    username,
    email,
    profilePicPath: user.profilePic
      ? `http://localhost:5000/${user.profilePic}`
      : `http://localhost:5000/uploads/default.png`,
  };

  res.status(200).json({ success: true, newUser });
});

// this controller contains forget password logic. It send otp to email for vertification and once verified user can reset there password.
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email, newPassword } = req.body;

  if ((!email, !newPassword)) {
    return next(new ErrorHandler(400, "Please enter your email"));
  }

  if (!validateEmail(email)) {
    return next(new ErrorHandler(400, "Please enter correct email"));
  }

  if (newPassword.length < 8) {
    return next(
      new ErrorHandler(400, "Password should be of atlest 8 letters")
    );
  }

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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user = await User.findOne(
    { email },
    { password: hashPassword },
    { new: true }
  );

  const token = generateAuthToken(user);
  res.json({
    success: true,
    message: "Password has been reset succesfully",
    token,
  });
});

export const updateUserName = catchAsyncError(async (req, res, next) => {
  const { username } = req.body;
  const { id } = req.body.params;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  if (username.length < 4) {
    return next(
      new ErrorHandler(400, "Username should atleast contain 4 letters")
    );
  }

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  user = await User.findByIdAndUpdate(id, { username }, { new: true });

  const token = generateAuthToken(user);
  res
    .status(200)
    .json({ success: true, message: "Username updated successfully", token });
});

export const updateEmail = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.body.params;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  if (!validateEmail(email)) {
    return next(400, "Username should atleast contain 4 letters");
  }

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

  user = await User.findByIdAndUpdate(id, { email }, { new: true });

  const token = generateAuthToken(user);
  res
    .status(200)
    .json({ success: true, message: "Username updated successfully", token });
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const { id } = req.body.params;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  if (!validateEmail(email)) {
    return next(400, "Username should atleast contain 4 letters");
  }

  if (password.length < 8) {
    return next(400, "Password should be atleast of 8 letters");
  }

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

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  user = await User.findByIdAndUpdate(
    id,
    { password: hashPassword },
    { new: true }
  );

  const token = generateAuthToken(user);
  res.status(200).json({
    success: true,
    message: "Password has been reset succesfully",
    token,
  });
});

export const updateProfilePic = catchAsyncError(async (req, res, next) => {
  const { id } = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  user = await User.findByIdAndUpdate(
    id,
    { profilePic: photoBase64 },
    { new: true }
  );

  const token = generateAuthToken(user);

  let updatedProfilePic = {
    profilePicPath: user.profilePic
      ? `http://localhost:5000/${user.profilePic}`
      : `http://localhost:5000/uploads/default.png`,
  };

  res.status(200).json({
    success: true,
    message: "Profile pic update successfully",
    updatedProfilePic,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  let user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exists"));
  }

  user = await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Account deleted Successfully",
  });
});
