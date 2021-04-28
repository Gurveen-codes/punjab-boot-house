import express from "express";
import {
	addNewOrder,
	getAllOrders,
	getOrderById,
	getUserOrders,
	tempUpdateOrderToPaid,
	updateOrderToDelivered,
	updateOrderToPaid,
} from "../controllers/orderController.js";
import { protectRoute, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Add new Order
// @route POST /api/order
// @access Private
router.route("/").post(protectRoute, addNewOrder);

// @desc Get all orders
// @route GET api/order
// @access Private/Admin
router.route("/").get(protectRoute, isAdmin, getAllOrders);

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

// @desc Temp Update order to paid
// @route PUT api/order/:id/temppay
// @access Private/Admin
router.route("/:id/temppay").put(protectRoute, isAdmin, tempUpdateOrderToPaid);

// @desc Update order to delivered
// @route PUT api/order/:id/deliver
// @access Private/Admin
router.route("/:id/deliver").put(protectRoute, isAdmin, updateOrderToDelivered);

export default router;
