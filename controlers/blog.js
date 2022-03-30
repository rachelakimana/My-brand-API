import Blog from "../models/blog.js";
import mongoose from "mongoose";

export const createArticle = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.status(201).json({ Message: "Article added" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//get one Article
export const getArticle = async (req, res) => {
  try {
    // Verify ID
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).send({
        Message: "Not a valid id",
      });
    // Verify not exist
    const Article = await Blog.findOne({ _id: req.params.id });
    if (!Article)
      return res.status(404).send({
        Message: `Article with id ${req.params.id} not found `,
      });

    res.status(200).send(Article);

    // if (!Article) {
    //   return res.status(404).send({
    //     Message: `Article with id ${req.params.id} not found `,
    //   });
    // }
  } catch (error) {
    res.status(500).send({
      Error: error.message,
    });
  }
};

//delete Article
export const deleteArticle = async (req, res) => {
  try {
    // Verify not exist
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).send({
        Message: "Not a valid id",
      });

    // findone and delete
    const Article = await Blog.findOne({ _id: req.params.id });
    if (!Article)
      return res.status(404).send({
        Message: `Article with id ${req.params.id} not found `,
      });
    await Blog.deleteOne(Article);
    res.status(200).json({ Message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//update Article
export const updateArticle = async (req, res) => {
  try {
    // Verify not exist
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).send({
        Message: "Not a valid id",
      });

    // findone and update
    const Article = await Blog.findOne({ _id: req.params.id });
    if (!Article)
      return res.status(404).send({
        Message: `Article with id ${req.params.id} not found `,
      });
    await Blog.updateOne(Article, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ Message: "Article updated" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
//   try {
//     // findone
//     if (!Blog.findOne({ _id: req.params.id })) {
//       return res
//         .status(404)
//         .json({ message: `Article with id ${req.params.id} not found` });
//     }
//     await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(201).json({ message: "Article has been updated" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

//get All posts
export const getAllArticles = async (req, res) => {
  try {
    const Articles = await Blog.find();
    res.status(200).json({ Articles });
    if (!Articles) {
      return res.status(404).json({ Message: "Articles not found" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
