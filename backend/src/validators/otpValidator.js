import { body } from "express-validator";

const commonEmailValidation = [
  body("email", "Please enter your email").not().isEmpty(),
  body("email", "Please enter correct email").isEmail(),
];

export const sendOTPValidator = [...commonEmailValidation];

export const verifyOTPValidator = [
  ...commonEmailValidation,
  body("otp", "OTP should be numeric").isNumeric(),
  body("otp", "OTP should be of 6 digits").isLength({ min: 6, max: 6 }),
];
