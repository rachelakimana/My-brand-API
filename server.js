import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.js";
import commentRoute from "./routes/comment.js";
import messageRoute from "./routes/message.js";
import authRoute from "./routes/Auth.js";
import blogRoute from "./routes/blog.js";
import allBlogsRoute from "./routes/allblogs.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(3000, () => console.log("Server running on port 3000"));
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
app.use("/api/v1/user", authRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", messageRoute);
app.use("/api/v1/blogs", allBlogsRoute);
app.use("api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
