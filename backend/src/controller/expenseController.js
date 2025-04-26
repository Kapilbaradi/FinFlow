import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import {
  capitalizeFirstLetter,
  normalizeString,
} from "../utils/normalizeData.js";
import Expense from "../models/ExpenseModel.js";

// user should be able to see all the expenses.
//user should be able to see expense based on date range.
// user should be able to see expenses based on categories and subcategories.
//user should be able to see expenses based on amount range.
// user should be able to apply multiple filters at the same time.

//user should able to perform CRUD operation on expenses.

//validating string
const isAlphabetic = (string) => /^[A-Za-z]+$/.test(string);

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
  });

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
  };

  res
    .status(200)
    .json({
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

  if (userId !== expense.userId) {
    return next(
      new ErrorHandler(400, "Your are not authorized to make any changes")
    );
  }

  let newExpense = {
    title,
    expenseType,
    paymentType,
    amount,
    category,
    subCategory,
    upiTransactionId,
    upiStatus,
  };

  expense = await Expense.findByIdAndUpdate(id, {}, { new: true });

  //   const expense = await Expense.create({
  //     title,
  //     expenseType,
  //     paymentType,
  //     amount,
  //     category,
  //     subCategory,
  //     upiTransactionId,
  //     upiStatus,
  //   });

  const formattedExpense = {
    title: capitalizeFirstLetter(expense.title),
    expenseType: capitalizeFirstLetter(expense.expenseType),
    paymentType: capitalizeFirstLetter(expense.paymentType),
    amount,
    category: capitalizeFirstLetter(expense.category),
    subCategory: expense.subCategory
      ? capitalizeFirstLetter(expense.subCategory)
      : null,
  };

  res
    .status(200)
    .json({
      success: true,
      message: "Expense created",
      expense: formattedExpense,
    });
});
