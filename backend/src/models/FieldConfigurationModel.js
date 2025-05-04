import mongoose, { Schema } from "mongoose";

const fieldConfigurationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    titleName: { type: String, required: true },
    expenseType: {
      type: [String],
      required: true,
      unique: true,
      default: ["Asset", "Expense"],
    },
    paymentType: {
      type: [String],
      default: ["UPI", "Cash", "Debit Card", "Credit Card"],
      unique: true,
      required: true,
    },

    amountName: { type: String, required: true },
    categoryName: {
      type: [String],
      default: ["Food", "Shopping", "Groceries", "Transportation"],
      required: true,
      unique: true,
    },
    subCategoryName: [
      {
        type: String,
        options: [{ type: String, unique: true }],
        unique: true,
        default: null,
      },
    ],
    customFields: [
      {
        fieldName: { type: String, required: true },
        fieldType: { type: String, required: true },
        required: { type: Boolean, required: true, default: false },
        options: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

const fieldConfigurationModel = mongoose.model(
  "fieldConfiguration",
  fieldConfigurationSchema
);

export default fieldConfigurationModel;
