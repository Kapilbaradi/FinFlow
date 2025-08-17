import express from "express";

import {
  deleteUser,
  forgetPassword,
  getUser,
  login,
  resetPassword,
  signup,
  updateEmail,
  updateProfilePic,
  updateUserName,
} from "../controller/userController.js";
import {
  loginValidator,
  signUpValidator,
  resetPasswordValidator,
  updateUsernameValidator,
  updateEmailValidator,
} from "../validators/userValidator.js";
import upload from "../utils/FileHandler.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/login", loginValidator, login);
router.post("/signup", signUpValidator, upload.single("profilePic"), signup);
router.get("/getuser", fetchUser, getUser);
router.post("/forget-password", loginValidator, forgetPassword);
router.put(
  "/reset-password/:id",
  resetPasswordValidator,
  fetchUser,
  resetPassword
);
router.put(
  "/update-username/:id",
  updateUsernameValidator,
  fetchUser,
  updateUserName
);
router.put("/update-email/:id", updateEmailValidator, fetchUser, updateEmail);
router.put(
  "/update-profilepic/:id",
  fetchUser,
  upload.single("profilePic"),
  updateProfilePic
);
router.delete("/delete-user/:id", fetchUser, deleteUser);

export default router;
