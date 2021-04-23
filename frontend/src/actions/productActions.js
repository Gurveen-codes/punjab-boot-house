import axios from "axios";
import * as actionTypes from "../constants/productConstants";

//* Get All Products
const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });

		const { data } = await axios.get("/api/products");

		dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

//* Get product details by ID
const listDetailProduct = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DETAIL_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);

		dispatch({ type: actionTypes.PRODUCT_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Delete a product
const deleteProduct = (productId) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/products/${productId}`, config);

		dispatch({
			type: actionTypes.PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Create a product
const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_CREATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/products`, {}, config);

		dispatch({
			type: actionTypes.PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Update a product
const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.PRODUCT_UPDATE_REQUEST });

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
			`/api/products/${product._id}`,
			product,
			config
		);

		dispatch({
			type: actionTypes.PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	listDetailProduct,
	listProducts,
	deleteProduct,
	createProduct,
	updateProduct,
};
