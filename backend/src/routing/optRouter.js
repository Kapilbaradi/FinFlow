import express from "express";

import {
  otpForSignUp,
  sendOTP,
  verifyOTP,
} from "../controller/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/send-otp-signup", otpForSignUp);
router.post("/verify-otp", verifyOTP);

export default router;
