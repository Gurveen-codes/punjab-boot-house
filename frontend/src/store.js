import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	productDetailReducer,
	productListReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
} from "./reducers/userReducers";
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrdersListReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
	productList: productListReducer,
	productDetail: productDetailReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	myOrdersList: myOrdersListReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
	? JSON.parse(localStorage.getItem("paymentMethod"))
	: {};

const intialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
		paymentMethod: paymentMethodFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	intialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
