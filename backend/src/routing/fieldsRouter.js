import { Router } from "express";
import {
  addCategories,
  addField,
  deleteCategories,
  editField,
  getFields,
} from "../controller/fieldConfigurationController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = Router();

router.get("/getFields", fetchUser, getFields);
router.post("/addFields", fetchUser, addField);
router.put("/edit-field/:id", fetchUser, editField);
router.put("/add-category/:id", fetchUser, addCategories);
router.delete("/delete-field/:id", fetchUser, deleteCategories);
router.delete("/delete-category/:id", fetchUser, deleteCategories);

export default router;
