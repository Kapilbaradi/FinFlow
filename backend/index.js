import express from "express";
import dotenv from "dotenv";

import connectDB from "./dbConfig.js";
import userRouter from "./src/routing/userRouter.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

dotenv.config(); // reads .env files and parses the contents, and loads them into process.env.
const app = express();
const port = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.send("Fin Flow");
});
app.use("/finflow/v1/user", userRouter);


app.use(errorMiddleware)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
