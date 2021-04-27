import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	Button,
	Card,
	ListGroup,
	Form,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import {
	listDetailProduct,
	createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ match, history }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(1);
	const [comment, setComment] = useState("");

	const dispatch = useDispatch();

	//User login chunk of state to check login status
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productDetail = useSelector((state) => state.productDetail);
	const { loading, product, error } = productDetail;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const {
		success: successProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

		if (successProductReview) {
			setRating(1);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listDetailProduct(match.params.id));
	}, [match, dispatch, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	//* Product review create handler
	const productReviewHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
	};

	return (
		<>
			{loading ? (
				<Loader></Loader>
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Meta title={product.name} description={product.description} />
					<Link to="/" className="btn btn-dark my-3">
						Go Back
					</Link>
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid></Image>
						</Col>

						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									></Rating>
								</ListGroup.Item>
								<ListGroup.Item>Price: {product.price}</ListGroup.Item>
								<ListGroup.Item>{product.description}</ListGroup.Item>
							</ListGroup>
						</Col>

						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>Rs.{product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? "In Stock" : "Out of Stock"}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={(e) => {
															setQty(e.target.value);
														}}
													>
														{/* [0,1,2,3,4 ...] */}
														{[...Array(product.countInStock).keys()].map(
															(x) => (
																<option key={x + 1} value={x + 1}>
																	{x + 1}
																</option>
															)
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											type="button"
											className="btn btn-block"
											onClick={addToCartHandler}
											disabled={product.countInStock === 0}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h3>Reviews</h3>
							{product.reviews.length === 0 && (
								<Message variant="secondary">No Reviews</Message>
							)}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating}></Rating>
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h4>Leave a review</h4>
									{errorProductReview && (
										<Message variant="danger">{errorProductReview}</Message>
									)}
									{!userInfo ? (
										<Message variant="warning">
											<Link to="/login">Login</Link> to leave a review
										</Message>
									) : (
										<Form onSubmit={productReviewHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<ReactStars
													count={5}
													onChange={(newRating) => setRating(newRating)}
													size={28}
													activeColor="#f8e825"
													isHalf={true}
													emptyIcon={<i className="far fa-star"></i>}
													halfIcon={<i className="fas fa-star-half-alt"></i>}
													fullIcon={<i className="fas fa-star"></i>}
												/>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													rows={3}
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="info">
												Submit
											</Button>
										</Form>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
