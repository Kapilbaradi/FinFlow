import express from "express";

import fetchUser from "../middleware/fetchUser.js";
import upload from "../utils/FileHandler.js";
import {
  createExpense,
  deleteExpense,
  editExpense,
  getExpense,
  getSpecificExpense,
} from "../controller/expenseController.js";

const router = express.Router();

// using upload.any() instead of upload.array("photo") because field name can be anything, if fieldname given by user didn't match then it will not upload files in database.
router.post("/create-expense", fetchUser, upload.any(), createExpense);
router.put("/update-expense", fetchUser, upload.any(), editExpense);
router.delete("/delete-expense", fetchUser, deleteExpense);
router.get("/", fetchUser, getExpense);
router.get("/:id", fetchUser, getSpecificExpense);

export default router
