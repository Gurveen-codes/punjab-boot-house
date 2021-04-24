import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "./Message";
import { getTopRatedProducts } from "../actions/productActions";

const TopProductsCarousel = () => {
	const dispatch = useDispatch();

	const productTop = useSelector((state) => state.productTop);
	const { error, products } = productTop;

	useEffect(() => {
		dispatch(getTopRatedProducts());
	}, [dispatch]);

	return error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Carousel pause="hover" className="bg-light">
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid></Image>
						<Carousel.Caption className="carousel-caption">
							<h2>
								{product.name} (Rs.{product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default TopProductsCarousel;
