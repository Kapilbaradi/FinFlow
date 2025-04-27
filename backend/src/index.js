import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./dbConfig.js";
import otpRouter from "./routing/optRouter.js";
import userRouter from "./routing/userRouter.js";
import expenseRouter from "./routing/expenseRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config(); // reads .env files and parses the contents, and loads them into process.env.
const app = express();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
