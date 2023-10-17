import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    throw err;
  });

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
