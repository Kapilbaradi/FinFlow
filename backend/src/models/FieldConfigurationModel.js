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
      unique: true,
      default: ["asset", "expense"],
    },
    paymentType: {
      type: [String],
      default: ["upi", "cash", "debit Card", "credit Card"],
      unique: true,
    },

    amountName: { type: String, required: true },
    categoryName: {
      type: [String],
      default: ["food", "shopping", "groceries", "transportation"],
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
