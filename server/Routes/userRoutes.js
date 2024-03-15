import express from "express";
import { fetchAllUsersController, loginController, registerController } from "../Controllers/userController.js";
import protect from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/fetchusers", protect, fetchAllUsersController);
  
export default router;