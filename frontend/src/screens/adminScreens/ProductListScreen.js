import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
	listProducts,
	deleteProduct,
	createProduct,
} from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/actionTypes";

const ProductListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		success: successDelete,
		error: errorDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		success: successCreate,
		error: errorCreate,
		product: createdProduct,
	} = productCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });

		//if user is not logged in or is not an admin
		if (!(userInfo && userInfo.isAdmin)) {
			history.push("/login");
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts());
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		successCreate,
		createdProduct,
	]);

	//* Create Product Handler
	const createProductHandler = () => {
		dispatch(createProduct());
	};

	//* Product Delete Handler
	const deleteHandler = (productId) => {
		if (window.confirm("Are you sure, deleted product can't be reverted")) {
			dispatch(deleteProduct(productId));
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

			{loadingDelete && <Loader />}
			{errorDelete && <Message variant="danger">{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
