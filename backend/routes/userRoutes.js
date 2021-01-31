import express from "express";
const router = express.Router();
import { authUser } from "../controllers/userController.js";

// @desc Auth User ad get token
// @route /api/users/login
// @access Public

router.post("/login", authUser);

export default router;
