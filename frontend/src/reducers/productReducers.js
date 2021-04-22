import * as actionTypes from "../constants/actionTypes.js";

const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] };
		case actionTypes.PRODUCT_LIST_SUCCESS:
			return { loading: false, products: action.payload };
		case actionTypes.PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const productDetailReducer = (state = { product: { reviews: [] } }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_DETAIL_REQUEST:
			return { ...state, loading: true };
		case actionTypes.PRODUCT_DETAIL_SUCCESS:
			return { loading: false, product: action.payload };
		case actionTypes.PRODUCT_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_DELETE_REQUEST:
			return { loading: true };
		case actionTypes.PRODUCT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case actionTypes.PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_CREATE_REQUEST:
			return { loading: true };
		case actionTypes.PRODUCT_CREATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case actionTypes.PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case actionTypes.PRODUCT_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case actionTypes.PRODUCT_UPDATE_REQUEST:
			return { loading: true };
		case actionTypes.PRODUCT_UPDATE_SUCCESS:
			return { loading: false, success: true, product: action.payload };
		case actionTypes.PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case actionTypes.PRODUCT_UPDATE_RESET:
			return { product: {} };
		default:
			return state;
	}
};

export {
	productDetailReducer,
	productListReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
};
