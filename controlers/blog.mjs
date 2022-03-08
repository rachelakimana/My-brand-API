import Blog from "../models/blog.mjs";
//create blog article
export const createArticle = async (req, res) => {
  try {
    await Blog.create(req.body);
    res.status(200).json("Article added");
  } catch (error) {
    res.status(500).json(error);
  }
};

//get one Article
export const getOneArticle = async (req, res) => {
  try {
    const oneArticle = await Blog.findOne({ _id: req.params.id });
    res.status(200).json(oneArticle);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete Article
export const deleteArticle = async (req, res) => {
  try {
    await Blog.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("Article is deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//update Article
export const updateArticle = async (req, res) => {
  try {
    await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json("it has been updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

//get All posts
export const getAllArticle = async (req, res) => {
  try {
    const allArticle = await Blog.find();
    res.status(200).json(allArticle);
  } catch (error) {
    res.status(500).json(error);
  }
};
