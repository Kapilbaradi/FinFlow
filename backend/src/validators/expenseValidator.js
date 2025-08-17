import { body } from "express-validator";

export const basicFieldsNullCheckValidator = [
    body("title", "Please Enter title").not().isEmpty(),
    body("")
]