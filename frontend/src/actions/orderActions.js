import * as actionTypes from "../constants/actionTypes";
import axios from "axios";

const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		console.log(order);

		const { data } = await axios.post("/api/order", order, config);
		console.log(data);

		dispatch({
			type: actionTypes.ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { createOrder };
