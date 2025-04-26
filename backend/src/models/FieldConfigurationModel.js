import mongoose, { Schema } from "mongoose";

const fieldConfigurationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    titleName: { type: String, required: true },
    paymentType: {
      type: String,
      types: [
        {
          type: String,
          paymentOptions: ["UPI", "Cash", "Debit Card", "Credit Card"],
          required: true,
        },
      ],
      required: true,
    },
    amountName: { type: String, required: true },
    categoryName: {
      type: String,
      categories: [
        {
          type: String,
          options: ["Food", "Shopping", "Groceries", "Transportation"],
        },
      ],
      required: true,
    },
    subCategoryName: {
      type: String,
      parentCategory: [
        {
          category: { type: String, options: [{ type: String }] },
        },
      ],
      default: null,
    },
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

const fieldConfigurationModel = new mongoose.model(
  "fieldConfiguration",
  fieldConfigurationSchema
);

export default fieldConfigurationModel;
