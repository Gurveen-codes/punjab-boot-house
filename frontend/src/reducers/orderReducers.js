import * as actionTypes from "../constants/actionTypes.js";

const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.ORDER_CREATE_REQUEST:
			return { loading: true };
		case actionTypes.ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			};
		case actionTypes.ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export { orderCreateReducer };
