import Order from "../models/orderModel";

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

	if (orderItems || orderItems.length === 0) {
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

export { addNewOrder };
