import mongoose, { Schema } from "mongoose";

import { sendVerificationEmail } from "../middleware/emialVerification.js";

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message: "Please enter a valid email address.",
    },
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10,
  }, // This document will be automatically deleted after 5 minutes of it's creation time.
});

otpSchema.index({ email: 1, createdAt: -1 });
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
