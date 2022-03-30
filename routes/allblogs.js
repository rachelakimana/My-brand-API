import express from "express";
import { getAllArticles } from "../controlers/blog.js";

var router = express.Router();

router.get("/", getAllArticles);

export default router;
