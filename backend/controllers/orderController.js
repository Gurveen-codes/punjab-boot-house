import asyncHandler from "express-async-handler";

import Order from "../models/orderModel.js";

// @desc Add new Order
// @route POST api/order
// @access Private
const addNewOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingprice,
		totalPrice,
	} = req.body;

	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error("Cart is Empty");
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingprice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @desc Get order by Id
// @route GET api/order/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

export { addNewOrder, getOrderById };
