import express from "express";
import { addNewOrder } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Add new Order
// @route POST /api/order
// @access Private

router.route("/").post(protectRoute, addNewOrder);

export default router;
