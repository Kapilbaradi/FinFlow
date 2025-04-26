import mongoose, { Schema } from "mongoose";

const dynamicFiledSchema = new Schema(
  {
    name: { type: String },
    value: mongoose.Schema.Types.Mixed, // Can be string, number, boolean, etc.
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
