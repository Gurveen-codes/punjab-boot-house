import express from "express";
import {
	addNewOrder,
	getOrderById,
	getUserOrders,
	updateOrderToPaid,
} from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Add new Order
// @route POST /api/order
// @access Private
router.route("/").post(protectRoute, addNewOrder);

// @desc Get logged in user orders
// @route GET api/order/myorders
// @access Private
router.route("/myorders").get(protectRoute, getUserOrders);

// @desc Get order by Id
// @route GET api/order/:id
// @access Private
router.route("/:id").get(protectRoute, getOrderById);

// @desc Update order to paid
// @route PUT api/order/:id/pay
// @access Private
router.route("/:id/pay").put(protectRoute, updateOrderToPaid);

export default router;
