import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  capitalizeFirstLetter,
  normalizeString,
} from "../utils/normalizeData.js";
import Expense from "../models/ExpenseModel.js";

//validating string
const isAlphabetic = (string) => /^[A-Za-z]+$/.test(string);

//The use of this function is provide proper value to send it to user.
const customFieldFormated = (fields) => {
  const customfields = fields.map((field) => {
    if (field.fieldType === "file") {
      return {
        fieldName: field.fieldName,
        value: `http://localhost:5000/${field.value}`,
      };
    } else {
      return {
        fieldName: field.fieldName,
        value: field.value,
      };
    }
  });

  return customfields;
};

// login to create expense.
export const createExpense = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const {
    title,
    expenseType,
    paymentType,
    amount,
    category,
    subCategory,
    upiTransactionId,
    upiStatus,
  } = req.body;

  let customFields = [];

  //Handle files custom field
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      customFields.push({
        fieldName: file.fieldName,
        value: file.buffer.toString("base64"),
        fieldType: "file",
      });
    });
  }

  // Handle text custom fields
  if (req.body.customFields && Array.isArray(req.body.customFields)) {
    req.body.customFields.forEach((field) =>
      customFields.push({
        fieldName: field.fieldName,
        value: field.value,
        fieldType: field.fieldType,
      })
    );
  }

  //Validate required fields
  if (!title || !expenseType || !paymentType || !amount || !category) {
    return next(new ErrorHandler(400, "Please enter required fields"));
  }

  // Normalize string fields
  title = normalizeString(title);
  expenseType = normalizeString(expenseType);
  paymentType = normalizeString(paymentType);
  category = normalizeString(category);
  subCategory = expense.subCategory
    ? normalizeString(expense.subCategory)
    : null;

  //validate title
  if (!isAlphabetic(title)) {
    return next(new ErrorHandler(400, "Title Should Only Contain alphabets"));
  }

  //validate amount
  if (amount <= 0) {
    return next(new ErrorHandler(400, "Amount should be greater then 0"));
  }

  // UPI Status for cash payment type.
  if (paymentType == "cash") {
    upiStatus = "unoccurred";
  }

  const expense = await Expense.create({
    userId,
    title,
    expenseType,
    paymentType,
    amount,
    category,
    subCategory,
    upiTransactionId,
    upiStatus,
    customFields,
  });

  customFields = customFieldFormated(expense.customFields);

  const formattedExpense = {
    id,
    title: capitalizeFirstLetter(expense.title),
    expenseType: capitalizeFirstLetter(expense.expenseType),
    paymentType: capitalizeFirstLetter(expense.paymentType),
    amount,
    category: capitalizeFirstLetter(expense.category),
    subCategory: expense.subCategory
      ? capitalizeFirstLetter(expense.subCategory)
      : null,
    customFields,
  };

  res.status(200).json({
    success: true,
    message: "Expense created",
    expense: formattedExpense,
  });
});

export const editExpense = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  const {
    title,
    expenseType,
    paymentType,
    amount,
    category,
    subCategory,
    upiTransactionId,
    upiStatus,
  } = req.body;

  if (!id) {
    return next(new ErrorHandler(400, "Invalid User"));
  }

  let customFields = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      customFields.push({
        fieldName: file.fieldName,
        value: file.buffer.toString("base64"),
      });
    });
  }

  // Handle text custom fields
  if (req.body.customFields && Array.isArray(req.body.customFields)) {
    req.body.customFields.forEach((field) =>
      customFields.push({ fieldName: field.fieldName, value: field.value })
    );
  }

  //Validate required fields
  if (!title || !expenseType || !paymentType || !amount || !category) {
    return next(new ErrorHandler(400, "Please enter required fields"));
  }

  // Normalize string fields
  title = normalizeString(title);
  expenseType = normalizeString(expenseType);
  paymentType = normalizeString(paymentType);
  category = normalizeString(category);
  subCategory = expense.subCategory
    ? normalizeString(expense.subCategory)
    : null;

  //validate title
  if (!isAlphabetic(title)) {
    return next(new ErrorHandler(400, "Title Should Only Contain alphabets"));
  }

  //validate amount
  if (amount <= 0) {
    return next(new ErrorHandler(400, "Amount should be greater then 0"));
  }

  // UPI Status for cash payment type.
  if (paymentType !== "upi") {
    upiStatus = "unoccurred";
  }

  let expense = await Expense.findById(id);
  if (!expense) {
    return next(400, "Expense dosen't exists");
  }

  if (userId !== expense.userId.toString()) {
    return next(
      new ErrorHandler(400, "Your are not authorized to make any changes")
    );
  }

  const newExpense = {
    title,
    expenseType,
    paymentType,
    amount,
    category,
    subCategory,
    upiTransactionId,
    upiStatus,
    customFields,
  };

  expense = await Expense.findByIdAndUpdate(
    id,
    { $set: { newExpense } },
    { new: true }
  );

  customFields = customFieldFormated(expense.customFields);

  const formattedExpense = {
    title: capitalizeFirstLetter(expense.title),
    expenseType: capitalizeFirstLetter(expense.expenseType),
    paymentType: capitalizeFirstLetter(expense.paymentType),
    amount,
    category: capitalizeFirstLetter(expense.category),
    subCategory: expense.subCategory
      ? capitalizeFirstLetter(expense.subCategory)
      : null,
    customFields,
  };

  res.status(200).json({
    success: true,
    message: "Expense created",
    expense: formattedExpense,
  });
});

export const deleteExpense = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;

  if (!id) {
    return next(new ErrorHandler(400, "Invalid expense"));
  }
  let expense = await Expense.findById(id);
  if (!expense) {
    return next(new ErrorHandler(404, "Expense not found"));
  }

  if (userId !== expense.userId.toString()) {
    return next(new ErrorHandler(403, "Unauthorized"));
  }
  expense = await Expense.findByIdAndDelete(id);
  return res
    .status(200)
    .json({ success: true, message: "Expense deleted successfully" });
});

export const getExpense = catchAsyncError(async (req, res, next) => {
  const userId = req.body.user;
  const { startDate, endDate, maxAmount, minAmount, category } = req.body;

  const filter = { userId };
  if (startDate || endDate) {
    filter.transactionDate = {};
    if (startDate) {
      filter.transactionDate.$get = new Date(startDate);
    }
    if (endDate) {
      filter.transactionDate.$lte = new Date(endDate);
    }
  }
  if (category) {
    filter.category = { $regex: new RegExp(category, "i") }; // case insensitive
  }

  if (minAmount || maxAmount) {
    filter.amount = {};
    if (minAmount) {
      filter.amount.$get = Number(minAmount);
    }
    if (maxAmount) {
      filter.amount.$lte = Number(maxAmount);
    }
  }

  const expense = await Expense.find(filter).sort({ transactionDate: -1 }); // sort({transactionDate: -1}) is used to get the latest expense first and then the older onces in desending order.
  if (!expense) {
    return next(new ErrorHandler(404, "No Expense to Show"));
  }

  customFields = customFieldFormated(expense.customFields);
  const formattedExpense = {
    title: capitalizeFirstLetter(expense.title),
    expenseType: capitalizeFirstLetter(expense.expenseType),
    paymentType: capitalizeFirstLetter(expense.paymentType),
    amount,
    category: capitalizeFirstLetter(expense.category),
    subCategory: expense.subCategory
      ? capitalizeFirstLetter(expense.subCategory)
      : null,
    customFields,
  };

  res.status(200).json({ success: true, expense: formattedExpense });
});

export const getSpecificExpense = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user;

  const expense = await Expense.findById(id).select(["-userId", "-__v"]);
  if (!expense) {
    return next(new ErrorHandler(404, "No Expense to show"));
  }
  if (userId !== expense.userId.toString()) {
    return next(new ErrorHandler(403, "UnAuthorized"));
  }

  customFields = customFieldFormated(expense.customFields);
  const formattedExpense = {
    title: capitalizeFirstLetter(expense.title),
    expenseType: capitalizeFirstLetter(expense.expenseType),
    paymentType: capitalizeFirstLetter(expense.paymentType),
    amount,
    category: capitalizeFirstLetter(expense.category),
    subCategory: expense.subCategory
      ? capitalizeFirstLetter(expense.subCategory)
      : null,
    customFields,
  };

  res.status(200).json({ success: true, expense: formattedExpense });
});
