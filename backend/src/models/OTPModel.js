import mongoose, { Schema } from "mongoose";

import { sendVerificationEmail } from "../middleware/emialVerification.js";

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10,
  }, // This document will be automatically deleted after 5 minutes of it's creation time.
});

const OTP = mongoose.model("OTP", otpSchema)
export default OTP;
