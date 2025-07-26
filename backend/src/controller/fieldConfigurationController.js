import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import FieldConfiguration from "../models/FieldConfigurationModel.js";

// 1. Get all custom fields for current user
const getFields = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }
  const config = await FieldConfiguration.findOne({ userId: id }).select([
    "-_id",
    "-__v",
    "-createdAt",
  ]);
  res.status(200).json({ fields: config });
});

// 2. Add a new custom field
const addField = catchAsyncError(async (req, res, next) => {
  const userId = req.body.user;

  const { fieldName, fieldType, required, options } = req.body;

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
  if (config.customFields.some((f) => f.fieldName === fieldName)) {
    return next(new ErrorHandler(400, "Field with this name already exists"));
  }

  config.customFields.push({ fieldName, fieldType, required, options });
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

  res
    .status(200)
    .json({
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

  res
    .status(200)
    .json({
      message: "Field deleted successfully",
      fields: config.customFields,
    });
});

export { getFields, addField, editField, deleteField };
