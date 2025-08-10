import { Router } from "express";
import { addField, getFields } from "../controller/fieldConfigurationController.js";
import fetchUser from "../middleware/fetchUser.js";

const router = Router();

router.get("/getFields", fetchUser, getFields);
router.post("/addFields", fetchUser, addField);

export default router;
