import * as actionTypes from "../constants/actionTypes";
import axios from "axios";

//*Create new order /////////////////////////////////////
const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });

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

//* Get order details /////////////////////////////////////
const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/order/${id}`, config);

		dispatch({
			type: actionTypes.ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//* Pay Order /////////////////////////////////////
const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_PAY_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/order/${orderId}/pay`,
			paymentResult,
			config
		);

		dispatch({
			type: actionTypes.ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//* List my orders /////////////////////////////////////
const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.MY_ORDER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/order/myorders`, config);

		dispatch({
			type: actionTypes.MY_ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.MY_ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export { createOrder, getOrderDetails, payOrder, listMyOrders };
