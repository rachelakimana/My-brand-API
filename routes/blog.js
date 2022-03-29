import { verifyToken } from "./Auth.js";
import express from "express";
import {
  createArticle,
  getArticle,
  deleteArticle,
  updateArticle,
} from "../controlers/blog.js";

var router = express.Router();
/**
 * @swagger
 * /blog/add:
 *   post:
 *     tags:
 *     - BLOG
 *     summary: Create blog article.
 *     responses:
 *       200:
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: blog title.
 *                   example: lorem ipsum
 *                 content:
 *                   type: string
 *                   description: The blog content.
 *                   example: lorem ipsum generator....
 */

router.post("/add", verifyToken, createArticle);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *     - BLOG
 *     summary: Retrieve a single blog article.
 *     description: Retrieve a single blog can be used to show Visitors blog article from API to blog page.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog article to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get("/:id", getArticle);
/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     tags:
 *     - BLOG
 *     summary: Delete a single blog article.
 *     description: Delete a single blog can be used to remove blog article from blog list in Database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog article to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article deleted
 */
router.delete("/:id", verifyToken, deleteArticle);
/**
 * @swagger
 * /blog/{id}:
 *   put:
 *     tags:
 *     - BLOG
 *     summary: update blog article.
 *     responses:
 *       200:
 *         description: Article updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   description: Start date
 *                 updatedAt:
 *                   type: string
 *                   description: Updated date
 */

router.put("/:id", verifyToken, updateArticle);

export default router;
