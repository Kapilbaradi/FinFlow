import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import OTP from "../models/OTPModel.js";
import User from "../models/UserSchema.js";
import mailSender from "../utils/MailSender.js";

// This method validate the email entered by the user.
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // This is the regular expression to validate email;
  return emailRegex.test(email); // returns boolean value. True if email matches emailRegex else returns false.
};

const mailOTP = async (email, subject) => {
  let generateOtp = Math.floor(Math.random() * 100000);

  const sendMail = await mailSender(email, subject, `Your OTP: ${generateOtp}`);
  if (sendMail) {
    return generateOtp;
  }

  return;
};

export const otpForSignUp = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler(400, "Please provide your email"));
  }

  if (!validateEmail(email)) {
    return next(new ErrorHandler(400, "Please enter valid email address"));
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler(400, "User Already exist with this email"));
  }

  const otp = await mailOTP(email, "Please verify your email");
  console.log(otp);

  if (!otp || otp == null) {
    return next(new ErrorHandler(400, otp));
  }

  console.log(otp);

  const createOTP = await OTP.create({ email, otp });

  res
    .status(200)
    .json({ success: true, message: "OTP sent successfully" }, otp);
});

export const sendOTP = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler(400, "Please provide your email"));
  }

  if (!validateEmail(email)) {
    return next(new ErrorHandler(400, "Please enter valid email address"));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler(400, "Please enter correct email id"));
  }

  const otp = await mailOTP(email, "Password reset request");

  if (!otp || otp == null) {
    return next(new ErrorHandler(400, otp));
  }

  const createOTP = await OTP.create({ email, otp });

  res
    .status(200)
    .json({ success: true, message: "OTP sent successfully" }, createOTP.otp);
});

export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email) {
    return next(new ErrorHandler(400, "Please provide your email"));
  }

  if (!validateEmail(email)) {
    return next(new ErrorHandler(400, "Please enter valid email address"));
  }

  if (!otp) {
    return next(new ErrorHandler(400, "Please enter OTP"));
  }

  let getOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
  if (otp !== getOTP.otp) {
    return next(new ErrorHandler(400, "Please enter correct OTP"));
  }

  getOTP = await OTP.findOneAndUpdate(
    { email },
    { isVerified: true },
    { sort: { createdAt: -1 } }
  ); // Updating the latest OTP document isVerified to true.

  res.status(200).json({ success: true });
});
