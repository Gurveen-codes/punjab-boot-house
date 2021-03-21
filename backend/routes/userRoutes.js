import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

// @desc Register a new user
// @route /api/users
// @access Public
router.route("/").post(registerUser);

// @desc Auth User and get token
// @route /api/users/login
// @access Public

router.post("/login", authUser);

// @desc Get user's profile
// @route /api/users/profile
// @access Private
router.route("/profile").get(protectRoute, getUserProfile);

// @desc   Update user's profile
// @route  PUT /api/users/profile
// @access Private
router.route("/profile").put(protectRoute, updateUserProfile);

export default router;
