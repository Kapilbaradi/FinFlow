import express from "express"

import sendOTP from "../controller/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOTP);

export default router;