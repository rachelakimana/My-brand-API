import express from "express";
import {
  deleteMessage,
  getAllMessages,
  createMessage,
} from "../controlers/message.js";
import { verifyToken } from "./Auth.js";

var router = express.Router();

router.delete("/message/:id", verifyToken, deleteMessage);
router.post("/message/add", createMessage);
router.get("/messages", verifyToken, getAllMessages);

export default router;
