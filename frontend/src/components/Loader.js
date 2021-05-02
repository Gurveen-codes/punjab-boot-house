import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
	const [spinnerStyles, setSpinnerStyles] = useState({
		width: "100px",
		height: "100px",
		margin: "auto",
		display: "block",
	});

	const [msgHidden, setMsgHidden] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setSpinnerStyles((s) => ({ ...s, width: "50px", height: "50px" }));
			setMsgHidden(false);
		}, 3000);
	}, []);

	return (
		<>
			<Spinner animation="border" role="status" style={spinnerStyles}>
				<span className="sr-only">Loading</span>
			</Spinner>
			<div
				className="msgHidden mt-4"
				style={{ textAlign: "center", visibility: msgHidden && "hidden" }}
			>
				It's taking longer than expected
			</div>
		</>
	);
};

export default Loader;
