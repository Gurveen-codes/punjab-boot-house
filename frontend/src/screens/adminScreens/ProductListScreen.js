import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listProducts } from "../../actions/productActions";

const ProductListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	useEffect(() => {
		//if user is logged in and is an admin
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts());
		} else {
			history.push("/");
		}
	}, [dispatch, userInfo, history]);

	//* Create Product Handler
	const createProductHandler = () => {
		//TODO: Create product
	};

	//* Product Delete Handler
	const deleteHandler = (userId) => {
		if (window.confirm("Are you sure, deleted user can't be reverted")) {
			//TODO: Delete product
		}
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h2>Products</h2>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i> Add New Product
					</Button>
				</Col>
			</Row>

			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>BRAND</th>
							<th>STOCK</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>Rs. {product.price}</td>
								<td>{product.brand}</td>
								<td>{product.countInStock}</td>
								<td>
									<LinkContainer to={`/admin/product/${product._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm ml-2"
										onClick={() => deleteHandler(product._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductListScreen;
