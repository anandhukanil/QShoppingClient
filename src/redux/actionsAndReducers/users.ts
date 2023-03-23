import { createSlice } from "@reduxjs/toolkit";
import { IUserState, SliceNames, Types } from "../../types";

const INITIAL_STATE: IUserState = {
  currentUser: undefined,
  cartItems: [],
  wishListItems: [],
  error: ""
};

const userSlice = createSlice({
  name: SliceNames.Users,
  initialState: INITIAL_STATE,
  reducers: {
    [Types.SET_CURRENT_USER]: (state, action) => {
      return { ...state, currentUser : action.payload };
    },
    [Types.USER_LOGOUT]: (state) => {
      return { ...state, currentUser : undefined, cartItems: [], wishListItems: [] };
    },
    [Types.ADD_TO_CART]: (state, action) => {
      const cartItems = state.cartItems
        .some((product) => product.item?.id === action.payload?.product?.id)
        ? state.cartItems
          .map(
            (product) => product.item?.id === action.payload?.product?.id
              ? { ...product, count: product.count + (action.payload.count || 1) }
              : product
          )
        : [...state.cartItems, { item: action.payload?.product, count: (action.payload.count || 1) }];
      return { ...state, cartItems };
    },
    [Types.REMOVE_FROM_CART]: (state, action) => {
      const cartItems = state.cartItems
        .map(
          (product) => product.item?.id === action.payload?.product?.id
            ? { ...product, count: product.count - (action.payload.count || 1) }
            : product
        ).filter((product) => product.count > 0);
      return { ...state, cartItems };
    },
    [Types.ADD_TO_WISHLIST]: (state, action) => {
      return { ...state, wishListItems : [...state.wishListItems, action.payload] };
    },
    [Types.REMOVE_FROM_WISHLIST]: (state, action) => {
      const wishListItems = state.wishListItems.filter((item) => item.id !== action.payload?.id);
      return { ...state, wishListItems };
    },
    [Types.CHECKOUT_CART_ITEMS] : (state) => {
      return { ...state, cartItems: [] };
    },
    [Types.CATCH_EXCEPTIONS]: (state, action) => {
      return { ...state, error : action.payload };
    }
  }
});

export const { 
  set_current_user, user_logout, add_to_cart, add_to_wishlist, remove_from_cart,
  remove_from_wishlist, checkout_cart_items, catch_exceptions
} = userSlice.actions;

export default userSlice.reducer;