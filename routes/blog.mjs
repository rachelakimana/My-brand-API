import express from "express";
import {
  createArticle,
  getOneArticle,
  deleteArticle,
  updateArticle,
  getAllArticle,
} from "../controlers/blog.mjs";

var router = express.Router();

router.post("/add", createArticle);

router.get("/:id", getOneArticle);

router.delete("/:id", deleteArticle);

router.put("/:id", updateArticle);

router.get("/", getAllArticle);

// //create blog article
// router.post("/add", async (req, res) => {
//   try {
//     const saveBlog = await new Blog(req.body);
//     const savedBlog = await saveBlog.save();
//     res.status(200).json(savedBlog);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //get one Article
// router.get("/:id", async (req, res) => {
//   try {
//     const getOneArticle = await Blog.findById(req.params.id);
//     console.log(getOneArticle);
//     res.status(200).json(getOneArticle);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //delete Article
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleteArticle = await Blog.findById(req.params.id);
//     if (deleteArticle.userId === req.body.userId) {
//       await Blog.deleteOne();
//       res.status(200).json("Article is deleted");
//     } else {
//       res.status(403).json("you can only delete your post");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //update Article
// router.put("/:id", async (req, res) => {
//   try {
//     const updateArticle = await Blog.findById(req.params.id);
//     if (updateArticle.userId === req.body.userId) {
//       await Blog.updateOne({ $set: req.body });
//       res.status(200).json("it has been updated");
//     } else {
//       res.status(403).json("you can only update your post");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// //get All posts
// router.get("/", async (req, res) => {
//   try {
//     const getAllBlog = await Blog.find();
//     res.status(200).json(getAllBlog);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

export default router;
