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
import upload from "../utils/ImageHandler.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", upload.single("profilePic"), signup);
router.get("/getuser/:id", getUser);
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:id", fetchUser, resetPassword);
router.put("/update-username/:id", fetchUser, updateUserName);
router.put("/update-email/:id", fetchUser, updateEmail);
router.put(
  "/update-profilepic/:id",
  upload.single("profilePic"),
  fetchUser,
  updateProfilePic
);
router.delete("/delete-user/:id", fetchUser, deleteUser);

export default router;
