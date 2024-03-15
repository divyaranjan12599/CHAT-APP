import express from "express";
import protect from "../Middlewares/authMiddleware.js";
import { accessChat, fetchChats } from "../Controllers/chatController.js";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);

export default router;