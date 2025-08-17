import { body } from "express-validator";

const commonEmailValidation = [
  body("email", "Please enter your email").not().isEmpty(),
  body("email", "Please enter correct email").isEmail(),
];

const commonPasswordValidator = [
  body("password", "Password should contain atleast 8 letters").isLength({
    min: 8,
  }),
];

const commonUsernameValidator = [
  body("username", "Please enter your username").isLength({ min: 4 }),
  body("username", "Username should be alphanumeric").not().isAlphanumeric(),
];

export const loginValidator = [
  ...commonEmailValidation,
  ...commonPasswordValidator,
];

export const signUpValidator = [...loginValidator, ...commonUsernameValidator];

export const forgetPassword = [
  ...commonEmailValidation,
  body("newPassword", "Password should contain atleast 8 letters").isLength({
    min: 8,
  }),
];

export const updateUsernameValidator = [...commonUsernameValidator];

export const updateEmailValidator = [...commonEmailValidation];

export const resetPasswordValidator = [...commonPasswordValidator];
