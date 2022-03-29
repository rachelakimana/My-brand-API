import Comment from "../models/comment.js";
import mongoose from "mongoose";

export const createComment = async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(201).json({ Message: "Comment added" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
//get All posts
export const getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.status(200).json({ allComments });
    if (!allComments) {
      return res.status(404).json({ Message: "Articles not found" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

//delete Article
export const deleteComment = async (req, res) => {
  try {
    // Verify not exist
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).send({
        Message: "Not a valid id",
      });

    // findone and delete
    const comment = await Comment.findOne({ _id: req.params.id });
    if (!comment)
      return res.status(404).send({
        Message: `Comment with id ${req.params.id} not found `,
      });
    await Comment.deleteOne(comment);
    res.status(200).json({ Message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
