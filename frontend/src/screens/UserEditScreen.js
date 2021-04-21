import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const UserEditScreen = ({ match }) => {
	const userId = match.params.id;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [dispatch, userId, user]);

	const submitHandler = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-dark my-2">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>

				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader></Loader>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter Name"
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Addresss</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter email"
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="isadmin">
						<Form.Check
							type="checkbox"
							checked={isAdmin}
							onChange={(e) => setIsAdmin(e.target.checked)}
							label="Make Admin"
						></Form.Check>
					</Form.Group>

					<Button type="submit" variant="primary">
						Register
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default UserEditScreen;
