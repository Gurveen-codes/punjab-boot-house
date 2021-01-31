import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

// @desc Auth User and get token
// @route /api/users/login
// @access Public

router.post("/login", authUser);

// @desc Get user's profile
// @route /api/users/profile
// @access Private
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
