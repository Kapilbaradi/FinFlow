import { body } from "express-validator";

const commonFieldValidation = [
    body("fieldName", "Field Name should be of type text").isAlpha(),
    body("fieldType", "Field Name should be of type text").isAlpha(),
    body("required", "Requied should be true or false").isBoolean()
]