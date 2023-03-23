import { takeEvery, put, takeLatest, all, takeLeading } from "redux-saga/effects";
import { IAction, Types } from "../../types";
import {
  add_to_cart, add_to_wishlist, catch_exceptions, checkout_cart_items, remove_from_cart, remove_from_wishlist,
  user_logout, set_current_user,
} from "../actionsAndReducers/users";


// function* addUser(action: IAction) {
//   try {
//     const user: IUser = yield call(() => signUp(action.payload as IUser));
//     yield put(add_user(user));
//   } catch (error) {
//     yield put(catch_exceptions("Error while logging in!"));
//   }
// }

// export function* addUserSaga() {
//   yield takeLatest(Types.ADD_USER, addUser);
// }

function* setCurrentUser(action: IAction) {
  try {
    yield put(set_current_user(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while logging in!"));
  }
}

export function* setCurrentUserSaga() {
  yield takeLatest(Types.SET_CURRENT_USER, setCurrentUser);
}

function* logoutUser() {
  try {
    yield put(user_logout());
  } catch (error) {
    yield put(catch_exceptions("Error while logging out!"));
  }
}

export function* logoutUserSaga() {
  yield takeLeading(Types.USER_LOGOUT, logoutUser);
}

function* addToCart(action: IAction) {
  try {
    yield put(add_to_cart(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while adding item to the cart!"));
  }
}

export function* addToCartSaga() {
  yield takeEvery(Types.ADD_TO_CART, addToCart);
}

function* removeFromCart(action: IAction) {
  try {
    yield put(remove_from_cart(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while removing item from the cart!"));
  }
}

export function* removeFromCartSaga() {
  yield takeEvery(Types.REMOVE_FROM_CART, removeFromCart);
}

function* addToWishList(action: IAction) {
  try {
    yield put(add_to_wishlist(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while adding item to wishlist!"));
  }
}

export function* addToWishListSaga() {
  yield takeEvery(Types.ADD_TO_WISHLIST, addToWishList);
}

function* removeFromWishlist(action: IAction) {
  try {
    yield put(remove_from_wishlist(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while removing item from wishlist!"));
  }
}

export function* removeFromWishlistSaga() {
  yield takeEvery(Types.REMOVE_FROM_WISHLIST, removeFromWishlist);
}

function* checkoutCartItems() {
  try {
    yield put(checkout_cart_items());
  } catch (error) {
    yield put(catch_exceptions("Error while checkout!"));
  }
}

export function* checkoutCartItemsSaga() {
  yield takeEvery(Types.CHECKOUT_CART_ITEMS, checkoutCartItems);
}


export default function* userSaga() {
  yield all([
    setCurrentUserSaga(), logoutUserSaga(), addToCartSaga(), removeFromCartSaga(),
    addToWishListSaga(), removeFromWishlistSaga(), checkoutCartItemsSaga(),
  ]);
}
