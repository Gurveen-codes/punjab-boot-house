import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const PaymentMethodScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push("/shipping");
	}

	const dispatch = useDispatch();

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	return (
		<>
			<Meta title="Select Payment Method" />
			<FormContainer>
				<CheckoutSteps step1 step2 step3></CheckoutSteps>
				<h1>Payment Method</h1>
				<FormContainer onSubmit={submitHandler}>
					<Form.Group>
						<Form.Label as="legend">Select Method</Form.Label>

						<Col>
							<Form.Check
								checked
								type="radio"
								label="PayPal or Credit Card"
								name="paymentMethod"
								id="Paypal"
								value="PayPal"
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>
							<Form.Check
								type="radio"
								label="Stripe"
								name="paymentMethod"
								id="Stripe"
								value="Stripe"
								onChange={(e) => setPaymentMethod(e.target.value)}
							></Form.Check>
						</Col>
					</Form.Group>
					<Button type="submit" variant="primary" onClick={submitHandler}>
						Continue
					</Button>
				</FormContainer>
			</FormContainer>
		</>
	);
};

export default PaymentMethodScreen;
