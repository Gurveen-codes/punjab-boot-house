import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const ShippingScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const dispatch = useDispatch();

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(saveShippingAddress({ address, city, postalCode }));
		history.push("/payment");
	};

	return (
		<>
			<Meta title="Shipping"></Meta>
			<FormContainer>
				<CheckoutSteps step1 step2></CheckoutSteps>
				<h1>Shipping Address</h1>
				<FormContainer>
					<Form.Group controlId="address">
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Enter Address"
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="city">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="Enter City"
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="postalCode">
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type="number"
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
							placeholder="Enter Postal Code"
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary" onClick={submitHandler}>
						Continue
					</Button>
				</FormContainer>
			</FormContainer>
		</>
	);
};

export default ShippingScreen;
