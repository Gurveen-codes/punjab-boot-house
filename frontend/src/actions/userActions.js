import axios from "axios";
import * as actionTypes from "../constants/userConstants";
import { MY_ORDER_LIST_RESET } from "../constants/orderConstants";

// * Login User/////////////
const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.USER_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/users/login",
			{ email, password },
			config
		);

		dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: actionTypes.USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// *Logout      //////////////////
const userLogout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({
		type: actionTypes.USER_LOGOUT,
	});
	dispatch({
		type: MY_ORDER_LIST_RESET,
	});
	dispatch({
		type: actionTypes.USER_DETAILS_RESET,
	});
	dispatch({
		type: actionTypes.USER_LIST_RESET,
	});
};

//* Register User/////////////
const registerUser = (name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.USER_REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post(
			"/api/users/",
			{ name, email, password },
			config
		);

		dispatch({ type: actionTypes.USER_REGISTER_SUCCESS, payload: data });
		dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: actionTypes.USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Get User Details ///////////////
const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_DETAILS_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({ type: actionTypes.USER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: actionTypes.USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Update User Profile ///////////////
const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_UPDATE_PROFILE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put("/api/users/profile", user, config);

		dispatch({ type: actionTypes.USER_UPDATE_PROFILE_SUCCESS, payload: data });

		dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: actionTypes.USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Get all users list ///////////////
const listAllUsers = () => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_LIST_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users`, config);

		dispatch({ type: actionTypes.USER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: actionTypes.USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Delete a user ///////////////
const deleteUser = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_DELETE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/users/${userId}`, config);

		dispatch({
			type: actionTypes.USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

// * Update User  ///////////////
const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: actionTypes.USER_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/${user._id}`, user, config);

		dispatch({
			type: actionTypes.USER_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({
			type: actionTypes.USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: actionTypes.USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export {
	loginUser,
	userLogout,
	registerUser,
	getUserDetails,
	updateUserProfile,
	listAllUsers,
	deleteUser,
	updateUser,
};
