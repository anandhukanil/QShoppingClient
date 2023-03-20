import { createSlice } from "@reduxjs/toolkit";
import { IProductState, SliceNames, Types } from "../../types";

const INITIAL_STATE: IProductState = {
  products: [],
  dataLoading: false,
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
    [Types.SET_DATA_LOADING]: (state, action) => {
      return { ...state, dataLoading : !!action.payload };
    },
    [Types.CATCH_EXCEPTIONS]: (state, action) => {
      return { ...state, error : action.payload };
    }
  }
});

export const { get_all_products, get_product_details, set_data_loading, catch_exceptions } = productSlice.actions;

export default productSlice.reducer;