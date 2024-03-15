import express from "express";
import protect from "../Middlewares/authMiddleware.js";
import { allMessages, sendMessage } from "../Controllers/messageController.js";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;