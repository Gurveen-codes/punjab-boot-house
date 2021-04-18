import express from "express";
import { addNewOrder, getOrderById } from "../controllers/orderController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Add new Order
// @route POST /api/order
// @access Private

router.route("/").post(protectRoute, addNewOrder);

// @desc Get order by Id
// @route GET api/order/:id
// @access Private

router.route("/:id").get(protectRoute, getOrderById);

export default router;
