import * as actionTypes from "../constants/actionTypes.js";

export const productListReducer = (state = { products: [] }, action) => {
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

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
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
