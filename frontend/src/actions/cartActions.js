import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: actionTypes.CART_ADD_ITEM,
		payload: {
			qty,
			product: data._id,
			name: data.name,
			image: data.image,
			countInStock: data.countInStock,
			price: data.price,
		},
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: actionTypes.CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: actionTypes.CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: actionTypes.CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	localStorage.setItem("paymentMethod", JSON.stringify(data));
};
