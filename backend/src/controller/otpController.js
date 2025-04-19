import otpGenerator from "otp-generator";

import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import OTP from "../models/OTPModel.js";
import User from "../models/UserSchema.js";

const sendOTP = (email, subject) => {
  let generateOtp = Math.floor(Math.random() * 100000);

  const sendMail = mailSender(email, subject, `Your OTP: ${generateOtp}`);
  if (sendMail) {
    return generateOtp;
  }

  return;
};

export const otpForSignUp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(400, "User Already exist with this email"));
  }

  const otp = sendOTP(email, "Please verify your email");

  if (!otp || otp == null) {
    return next(new ErrorHandler(400, otp));
  }

  const createOTP = await OTP.create({ email, otp });

  res
    .status(200)
    .json({ success: true, message: "OTP sent successfully" }, otp);
});

export const otpForForgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(400, "Please enter correct email id"));
  }

  const otp = sendOTP(email, "Password reset request");

  if (!otp || otp == null) {
    return next(new ErrorHandler(400, otp));
  }

  const createOTP = await OTP.create({ email, otp });

  res
    .status(200)
    .json({ success: true, message: "OTP sent successfully" }, otp);
});

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new ErrorHandler(400, "Please enter OTP"));
  }

  let getOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
  if (otp !== getOTP.otp) {
    return next(400, "Please enter correct OTP");
  }

  getOTP = await OTP.findOneAndUpdate({email}, {isVerified: true}, {sort: {createdAt: -1}}) // Updating the latest OTP document isVerified to true.

  res.status(200).json({ success: true });
});
