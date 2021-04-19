import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/actionTypes";

const OrderScreen = ({ match }) => {
	// Get orderID from route params
	const orderId = match.params.id;

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	// Order details chunk of state
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	// Order pay chunk of state
	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	// Method to add decimals to given input
	const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

	if (!loading) {
		// Calculate Prices
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);

		order.shippingPrice = addDecimals(order.itemsPrice > 500 ? 0 : 25);

		order.totalPrice = (
			Number(order.itemsPrice) + Number(order.shippingPrice)
		).toFixed(2);
	}

	useEffect(() => {
		//* Dynamically add script for payPal sdk
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/paypal/config");

			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};

			document.body.appendChild(script);
		};

		if (!order || order._id !== orderId || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(orderId));
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [order, orderId, dispatch, successPay]);

	// Payment Success Handler
	const paymentSuccessHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult));
	};

	//* return statement/////////////////////////
	return loading ? (
		<Loader></Loader>
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong>
								{order.user.name}
							</p>
							<p>
								<strong>Email: </strong>
								{order.user.email}
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},{" "}
								{order.shippingAddress.postalCode}
							</p>
							{order.isDelivered ? (
								<Message variant="success">{`Delivered at ${order.deliveredAt}`}</Message>
							) : (
								<Message variant="secondary">Not Delivered</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">{`Paid at ${order.paidAt}`}</Message>
							) : (
								<Message variant="secondary">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Cart Items: </h2>
							{order.orderItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={2}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													></Image>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x {item.price} = $
													{addDecimals(item.qty * item.price)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader></Loader>}
									{!sdkReady ? (
										<Loader></Loader>
									) : (
										<PayPalButton
											currency="INR"
											amount={order.totalPrice}
											onSuccess={paymentSuccessHandler}
										></PayPalButton>
									)}
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
