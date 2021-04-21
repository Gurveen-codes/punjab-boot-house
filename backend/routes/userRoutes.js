import express from "express";
const router = express.Router();
import {
	authUser,
	deleteUser,
	getUserById,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserById,
	updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, protectRoute } from "../middleware/authMiddleware.js";

// @desc Register a new user
// @route POST /api/users
// @access Public
router.route("/").post(registerUser);

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
router.route("/").get(protectRoute, isAdmin, getUsers);

// @desc Auth User and get token
// @route POST /api/users/login
// @access Public
router.post("/login", authUser);

// @desc Get user's profile
// @route GET /api/users/profile
// @access Private
router.route("/profile").get(protectRoute, getUserProfile);

// @desc   Update user's profile
// @route  PUT /api/users/profile
// @access Private
router.route("/profile").put(protectRoute, updateUserProfile);

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private/Admin
router.route("/:id").delete(protectRoute, isAdmin, deleteUser);

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
router.route("/:id").get(protectRoute, isAdmin, getUserById);

// @desc   Update user by ID
// @route  PUT /api/users/:id
// @access Private/Admin
router.route("/:id").put(protectRoute, isAdmin, updateUserById);

export default router;
