import Message from "../models/message.js";
import mongoose from "mongoose";

export const createMessage = async (req, res) => {
  try {
    await Message.create(req.body);
    res.status(201).json({ Message: "Message added" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
//get All message
export const getAllMessages = async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.status(200).json({ allMessages });
    if (!allMessages) {
      return res.status(404).json({ Message: "No message found" });
    }
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

//delete Message
export const deleteMessage = async (req, res) => {
  try {
    // Verify not exist
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).send({
        Message: "Not a valid id",
      });

    // findone and delete
    const messageToDelete = await Message.findOne({ _id: req.params.id });
    if (!messageToDelete)
      return res.status(404).send({
        Message: `Message with id ${req.params.id} not found `,
      });
    await Message.deleteOne(messageToDelete);
    res.status(200).json({ Message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
