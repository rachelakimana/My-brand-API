import { verifyToken } from "./Auth.mjs";
import express from "express";
import {
  createArticle,
  getOneArticle,
  deleteArticle,
  updateArticle,
  getAllArticle,
} from "../controlers/blog.mjs";

var router = express.Router();

router.post("/add", verifyToken, createArticle);

router.get("/:id", verifyToken, getOneArticle);

router.delete("/:id", verifyToken, deleteArticle);

router.put("/:id", verifyToken, updateArticle);

router.get("/", verifyToken, getAllArticle);

export default router;
