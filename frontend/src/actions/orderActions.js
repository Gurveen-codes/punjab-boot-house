import * as actionTypes from "../constants/orderConstants";
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

//* Temp Pay Order /////////////////////////////////////
const tempPayOrder = (orderId) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_TEMP_PAY_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/order/${orderId}/temppay`,
			{},
			config
		);

		dispatch({
			type: actionTypes.ORDER_TEMP_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_TEMP_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//* Deliver Order /////////////////////////////////////
const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_DELIVER_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/order/${order._id}/deliver`,
			{},
			config
		);

		dispatch({
			type: actionTypes.ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_DELIVER_FAIL,
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

//* Get all orders /////////////////////////////////////
const listAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.ORDER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/order`, config);
		console.log(data);
		dispatch({
			type: actionTypes.ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	createOrder,
	getOrderDetails,
	payOrder,
	listMyOrders,
	listAllOrders,
	deliverOrder,
	tempPayOrder,
};
