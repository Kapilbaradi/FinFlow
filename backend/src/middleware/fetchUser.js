import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/UserSchema.js";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

dotenv.config();

const fetchUser = catchAsyncError(async (req, res, next) => {
  const authToken = req.header["authorization"];

  const token = authToken.split("Bearer ")[0];
  if (!token) {
    return next(new ErrorHandler(400, "Invalid Token"));
  }
  const data = jwt.verify(token, process.env.JWTSECRET);
  if (!data) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  req.user.id = data.user.id;
  next();
});

export default fetchUser;
