import axios from "axios";
import * as actionTypes from "../constants/actionTypes.js";

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
};

///////////////////Register User/////////////
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

export {
  loginUser,
  userLogout,
  registerUser,
  getUserDetails,
  updateUserProfile,
};
