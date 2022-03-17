import express from "express";
import { user } from "../models/user";
import bcrypt from "bcryptjs/dist/bcrypt";
var router = express.Router();

//register end point
router.post("/register", async (req, res) => {
  // const confirm = await User.find({Username : req.body.username ,email : req.body.email})
  //confirm && res.status(400).json('this user or email exist');
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const savedArticle = await new user({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const resultPost = await savedPost.save();

    res.status(200).json(resultPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await user.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong user");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("wrong password");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
