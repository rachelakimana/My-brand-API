import express from "express";
import {
  deleteComment,
  getAllComments,
  createComment,
} from "../controlers/comment.js";
import { verifyToken } from "./Auth.js";

var router = express.Router();

router.delete("/comment/:id", verifyToken, deleteComment);
router.post("/comment/add", createComment);
router.get("/comments", verifyToken, getAllComments);

export default router;
