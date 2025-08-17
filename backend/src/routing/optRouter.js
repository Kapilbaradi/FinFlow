import express from "express";

import {
  sendOTPValidator,
  verifyOTPValidator,
} from "../validators/otpValidator.js";
import {
  otpForSignUp,
  sendOTP,
  verifyOTP,
} from "../controller/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOTPValidator, sendOTP);
router.post("/send-otp-signup", sendOTPValidator, otpForSignUp);
router.post("/verify-otp", verifyOTPValidator, verifyOTP);

export default router;
