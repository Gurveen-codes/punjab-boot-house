import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, currentPage, isAdmin = false, keyword = "" }) => {
	const constructRoute = (pageNumber) => {
		return !isAdmin
			? keyword
				? `/search/${keyword}/page/${pageNumber}`
				: `/page/${pageNumber}`
			: `/admin/productlist/${pageNumber}`;
	};

	return (
		pages > 1 && (
			<Pagination>
				<LinkContainer to={constructRoute(1)}>
					<Pagination.First>First</Pagination.First>
				</LinkContainer>

				{[...Array(pages).keys()].map((x) => (
					<LinkContainer key={x + 1} to={constructRoute(x + 1)}>
						<Pagination.Item active={x + 1 === currentPage}>
							{x + 1}
						</Pagination.Item>
					</LinkContainer>
				))}

				<LinkContainer to={constructRoute(pages)}>
					<Pagination.Last>Last</Pagination.Last>
				</LinkContainer>
			</Pagination>
		)
	);
};

export default Paginate;
