import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = ({ history }) => {
	const [keyword, setKeyword] = useState("");

	const searchHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};
	return (
		<Form inline onSubmit={searchHandler}>
			<Form.Control
				className="mr-sm-2 ml-sm-5"
				type="text"
				name="q"
				placeholder="Search Products..."
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			></Form.Control>
			<Button type="submit" className="p-2" variant="outline-success">
				Search
			</Button>
		</Form>
	);
};

export default SearchBar;
