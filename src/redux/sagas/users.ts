import { call, takeEvery, put, takeLatest, all, takeLeading } from "redux-saga/effects";
import { logIn, signUp } from "../../apis/users";
import { IAction, IUser, Types } from "../../types";
import {
  add_to_cart, add_to_wishlist, catch_exceptions, checkout_cart_items, remove_from_cart, remove_from_wishlist,
  user_login, user_logout, user_signup
} from "../actionsAndReducers/users";


function* signupUser(action: IAction) {
  try {
    const user: IUser = yield call(() => signUp(action.payload as IUser));
    yield put(user_signup(user));
  } catch (error) {
    yield put(catch_exceptions("Error while logging in!"));
  }
}

export function* signUpUserSaga() {
  yield takeLatest(Types.USER_SIGNUP, signupUser);
}

function* loginUser(action: IAction) {
  try {
    const user: IUser = yield call(() => logIn(action.payload as { userName: string, passWord: string }));
    yield user ? put(user_login(user)) : put(catch_exceptions("User not found"));
  } catch (error) {
    yield put(catch_exceptions("Error while logging in!"));
  }
}

export function* loginUserSaga() {
  yield takeLatest(Types.USER_LOGIN, loginUser);
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
    signUpUserSaga(), loginUserSaga(), logoutUserSaga(), addToCartSaga(), removeFromCartSaga(),
    addToWishListSaga(), removeFromWishlistSaga(), checkoutCartItemsSaga(),
  ]);
}
