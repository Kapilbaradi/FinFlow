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
  const id = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }
  const { fieldName, fieldType, required, options } = req.body;

  let config = await FieldConfiguration.findOne({ userId });

  if (!config) {
    // If user has no config yet, create a new one
    config = new FieldConfiguration({
      userId: id,
      titleName: "Title",
      paymentType: "Payment Type",
      amountName: "Amount",
      categoryName: "Categories",
      subCategoryName: "Subcategory",
      customFields: [],
    });
  }

  // Check if field already exists
  if (config.fields.some((f) => f.fieldName === fieldName)) {
    return res
      .status(400)
      .json({ message: "Field with this name already exists" });
  }

  config.fields.push({ fieldName, fieldType, required, options });
  config.updatedAt = Date.now();
  await config.save();

  res
    .status(201)
    .json({ message: "Field added successfully", fields: config.fields });
});

// 3. Edit an existing field
const editField = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }
  const { oldFieldName, newFieldName, fieldType, required, options } = req.body;

  const config = await FieldConfiguration.findOne({ userId: req.user.id });

  if (!config) {
    return res.status(404).json({ message: "Field configuration not found" });
  }

  const field = config.fields.find((f) => f.fieldName === oldFieldName);

  if (!field) {
    return res.status(404).json({ message: "Field not found" });
  }

  // Update field details
  field.fieldName = newFieldName || field.fieldName;
  field.fieldType = fieldType || field.fieldType;
  field.required = required !== undefined ? required : field.required;
  field.options = options || field.options;

  config.updatedAt = Date.now();
  await config.save();

  res
    .status(200)
    .json({ message: "Field updated successfully", fields: config.fields });
});

// 4. Delete a field
const deleteField = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;

  if (id !== userId) {
    return next(new ErrorHandler(400, "Invalid User"));
  }
  const { fieldName } = req.body;

  const config = await FieldConfiguration.findOne({ userId: req.user.id });

  if (!config) {
    return res.status(404).json({ message: "Field configuration not found" });
  }

  const initialLength = config.fields.length;

  config.fields = config.fields.filter((f) => f.fieldName !== fieldName);

  if (config.fields.length === initialLength) {
    return res.status(404).json({ message: "Field not found" });
  }

  config.updatedAt = Date.now();
  await config.save();

  res
    .status(200)
    .json({ message: "Field deleted successfully", fields: config.fields });
});

export { getFields, addField, editField, deleteField };
