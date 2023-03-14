import { createSlice } from "@reduxjs/toolkit";
import { IProductState, SliceNames, Types } from "../../types";

const INITIAL_STATE: IProductState = {
  products: [],
  selectedProduct: undefined,
  error: ""
};

const productSlice = createSlice({
  name: SliceNames.Products,
  initialState: INITIAL_STATE,
  reducers: {
    [Types.GET_ALL_PRODUCTS]: (state, action) => {
      return { ...state, products : action.payload };
    },
    [Types.GET_PRODUCT_DETAILS]: (state, action) => {
      return { ...state, selectedProduct : action.payload };
    },
    [Types.CATCH_EXCEPTIONS]: (state, action) => {
      return { ...state, error : action.payload };
    }
  }
});

export const { get_all_products, get_product_details, catch_exceptions } = productSlice.actions;

export default productSlice.reducer;