import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.mjs";
import authRoute from "./routes/Auth.mjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "./routes/Auth.mjs";
import blogRoute from "./routes/blog.mjs";

dotenv.config();

connectDB();

const app = express();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
// middleware
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/blog", blogRoute);
