import mongoose, { Schema } from "mongoose";

const dynamicFiledSchema = new Schema(
  {
    fieldName: { type: String },
    value: mongoose.Schema.Types.Mixed, // Can be string, number, boolean, etc.
    fieldType: {
      type: String,
      enum: ["text", "number", "file", "boolean"],
      required: true,
    },
    fileId: { type: String },
  },
  { _id: false }
);

const expenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    expenseType: { type: String, required: true },
    paymentType: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, default: null },
    transactionDate: { type: String, default: Date.now },
    // UPI related fields
    upiTransactionId: { type: String, default: null },
    upiStatus: {
      type: String,
      enum: ["pending", "success", "failed", "unoccurred"],
    },
    customFields: [dynamicFiledSchema],
  },
  { timestamps: true }
);

const Expense = mongoose.model("express", expenseSchema);

export default Expense;
