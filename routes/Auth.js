import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs/dist/bcrypt.js";
var router = express.Router();

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
export const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      if (err) {
        // res.sendStatus(403);
        res.status(403).json({ message: "Unauthorized access. Please login" });
      } else {
        next();
      }
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *     - USER
 *     summary: Create user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       201:
 *         ...
 */
//register end point
router.post("/register", verifyToken, async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(16);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const resultPost = await newUser.save();

    res.status(201).json(resultPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *     - USER
 *     summary: Login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *      200:
 *        description: Wrong user
 *      400:
 *        description: Wrong password
 */
//login endpoint
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(403).json({ Message: "invalid credentials" });
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(403).json({ Message: "invalid credentials" });
    }

    const { password, ...others } = user._doc;

    jwt.sign(others, process.env.SECRET, { expiresIn: "2d" }, (err, token) => {
      res.status(201).json({ token });
      // if (!token) {
      // }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
