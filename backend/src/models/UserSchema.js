import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    // adding trim and lowercase true as backup to prevent data integrety issue just in case if normalizeString method is not used in userController.
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 30,
      trim: true,
      lowercase: true,
      validate: {
        validator: async function (username) {
          return /^[a-zA-Z0-9@]+$/.test(username)
        },
        message: "Username should contain only alphabets, numbers and @"
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        message: "Please enter a valid email address.",
      },
    },
    password: { type: String, required: true, minlength: 8 },
    profilePic: { type: String },
    profilePicId: { type: String },
  },
  {
    timestamps: true,
  }
);

//Hash password on save. Hashes password before saving it into database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const User = mongoose.model("User", userSchema);
export default User;
