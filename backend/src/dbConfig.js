import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // reads .env file and parses the content and loads them into process.env .
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DBURL);
    conn
      ? console.log("connect to Database")
      : console.log("not connected to database");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
