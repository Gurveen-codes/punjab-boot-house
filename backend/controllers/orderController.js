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

// @desc Update order to paid
// @route PUT api/order/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(400);
		throw new Error("Order not found");
	}
});

// @desc Get logged in user orders
// @route GET api/order/myorders
// @access Private
const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

export { addNewOrder, getOrderById, updateOrderToPaid, getUserOrders };
