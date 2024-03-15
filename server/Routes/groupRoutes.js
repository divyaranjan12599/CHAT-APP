import express from "express";
import protect from "../Middlewares/authMiddleware.js";
import { createGroup, fetchGroups, groupExit } from "../Controllers/groupController.js";

const router = express.Router();

router.route("/createGroup").post(protect, createGroup);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/groupExit").put(protect, groupExit);

export default router;