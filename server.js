import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.js";
import authRoute from "./routes/Auth.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./routes/Auth.js";
import blogRoute from "./routes/blog.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log("Server running on port 3000")
  );
});

//swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for My Blog Articles",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/user", authRoute);
app.use("/api/blog", blogRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
