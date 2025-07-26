import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 4, maxlength: 30 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    profilePic: { type: String },
    profilePicId: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
