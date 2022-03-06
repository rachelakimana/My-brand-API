import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.mjs";

dotenv.config();

connectDB();

const app = express();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
