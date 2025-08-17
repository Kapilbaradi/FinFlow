import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import FieldConfiguration from "../models/FieldConfigurationModel.js";
import {
  capitalizeFirstLetter,
  normalizeString,
} from "../utils/normalizeData.js";

const verifyCategory = (category) => {
  return /^[a-zA-Z]+$/.test(category);
};

// 1. Get all custom fields for current user
const getFields = catchAsyncError(async (req, res, next) => {
  //const id = req.params.id;

  const userId = req.user.id;

  const config = await FieldConfiguration.findOne({ userId }).select([
    "-__v",
    "-createdAt",
  ]);
  res.status(200).json({ fields: config });
});

// 2. Add a new custom field
const addField = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const newFields = {};

  if (req.body.fieldName) {
    newFields.fieldName = req.body.fieldName;
  }
  if (req.body.fieldType) {
    newFields.fieldType = req.body.fieldType;
  }
  if (req.body.required) {
    newFields.required = req.body.required;
  }
  if (req.body.options) {
    newFields.options = req.body.options;
  }

  let config = await FieldConfiguration.findOne({ userId });

  if (!config) {
    // If user has no config yet, create a new one
    config = new FieldConfiguration({
      userId,
      titleName: "Title",
      amountName: "Amount",
      customFields: [],
    });
  }

  // Check if field already exists
  if (config.customFields.some((f) => f.fieldName === newFields.fieldName)) {
    return next(new ErrorHandler(400, "Field with this name already exists"));
  }

  if (newFields.fieldName && newFields.fieldType) {
    config.customFields.push(newFields);
  }
  await config.save();

  res
    .status(201)
    .json({ message: "Field added successfully", fields: config.fields });
});

// 3. Edit an existing field
const editField = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;

  const { oldFieldName, newFieldName, fieldType, required, options } = req.body;

  const config = await FieldConfiguration.findById(id);
  if (!config) {
    return next(new ErrorHandler(404, "Field configuration not found"));
  }

  if (config.userId.toString() !== userId) {
    return next(new ErrorHandler(403, "Unauthorized"));
  }

  const field = config.customFields.find((f) => f.fieldName === oldFieldName);

  if (!field) {
    return next(new ErrorHandler(404, "Field not found"));
  }

  // Update field details
  field.fieldName = newFieldName || field.fieldName;
  field.fieldType = fieldType || field.fieldType;
  field.required = required !== undefined ? required : field.required;
  field.options = options || field.options;

  await config.save();

  res.status(200).json({
    message: "Field updated successfully",
    fields: config.customFields,
  });
});

// 4. Delete a field
const deleteField = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;
  const { fieldName } = req.body;

  const config = await FieldConfiguration.findById(id);

  if (!config) {
    return next(new ErrorHandler(404, "Field configuration not found"));
  }

  if (config.userId.toString() !== userId) {
    return next(new ErrorHandler(403, "Unauthorized"));
  }

  const initialLength = config.fields.length;

  config.fields = config.fields.filter((f) => f.fieldName !== fieldName);

  if (config.fields.length === initialLength) {
    return next(new ErrorHandler(404, "Field not found"));
  }
  await config.save();

  res.status(200).json({
    message: "Field deleted successfully",
    fields: config.customFields,
  });
});

const addCategories = catchAsyncError(async (req, res, next) => {
  let { category } = req.body;
  const id = req.params.id;
  const userId = req.user.id;

  if (!category) {
    return next(new ErrorHandler(400, "Please enter a category"));
  }

  if (!verifyCategory(category)) {
    return next(
      new ErrorHandler(400, "Category should only contain alphabets")
    );
  }

  let fields = await FieldConfiguration.findById(id);
  if (!fields) {
    return next(new ErrorHandler(404, "Unauthorized"));
  }

  if (fields.userId.toString() !== userId) {
    return next(new ErrorHandler(400, "Unauthorized"));
  }

  category = normalizeString(category);
  const existingCategory = fields.categoryName.map((cat) => cat.trim().toLowerCase());

  if (existingCategory.includes(category)) {
    return next(new ErrorHandler(400, "Category already exists"));
  }

  fields = await FieldConfiguration.findByIdAndUpdate(
    { _id: id },
    { $push: { categoryName: category } },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Category added successfully", fields });
});

const deleteCategories = catchAsyncError(async (req, res, next) => {
  let { category } = req.body;
  const id = req.params.id;
  const userId = req.user.id;

  if (!category) {
    return next(new ErrorHandler(400, "Please Enter a Category"));
  }

  category = normalizeString(category);

  if (!verifyCategory(category)) {
    return next(
      new ErrorHandler(400, "Category should only contain alphabets")
    );
  }

  let fields = await FieldConfiguration.findById(id);
  if (!fields) {
    return next(new ErrorHandler(400, "Unauthorized"));
  }

  if (fields.userId.toString() !== userId) {
    return next(new ErrorHandler(400, "Unauthorized"));
  }

  if (!fields.categoryName.includes(category)) {
    return next(new ErrorHandler(400, "category dose not exists"));
  }

  fields = await FieldConfiguration.findByIdAndUpdate(
    id,
    { $pull: { categoryName: category } },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Category deleted Successfully", fields });
});

export {
  getFields,
  addField,
  editField,
  deleteField,
  addCategories,
  deleteCategories,
};
