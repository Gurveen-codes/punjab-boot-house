import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import TopProductsCarousel from "../components/TopProductsCarousel";
import Meta from "../components/Meta";

import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, currentPage } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta></Meta>
			{!keyword && !pageNumber ? (
				<TopProductsCarousel />
			) : (
				<Link to="/" className="btn btn-outline-light">
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product}></Product>
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						currentPage={currentPage}
						keyword={keyword ? keyword : ""}
					></Paginate>
				</>
			)}
		</>
	);
};

export default HomeScreen;
