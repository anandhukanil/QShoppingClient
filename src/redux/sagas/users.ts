/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import { takeEvery, put, takeLatest, all, takeLeading, call } from "redux-saga/effects";
import { logOut, refreshToken as refreshTokenApi } from "../../apis/users";
import { IAction, LocalData, Types } from "../../types";
import {
  add_to_cart, catch_exceptions, checkout_cart_items, remove_from_cart,
  user_logout, user_login, set_current_user, token_refresh,
} from "../actionsAndReducers/users";

function* loginUser(action: any) {
  try {
    yield localStorage.setItem(LocalData.RefreshToken, action.payload?.refreshToken);
    yield put(user_login(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while logging in!"));
  }
}

export function* loginUserSaga() {
  yield takeLatest(Types.USER_LOGIN, loginUser);
}

function* tokenRefresh(action: any) {
  try {
    const response: AxiosResponse<any, unknown> = yield call(() => refreshTokenApi(action.payload));
    const { refreshToken, accessToken } = response.data;
    yield localStorage.setItem(LocalData.RefreshToken, refreshToken);
    yield put(token_refresh({refreshToken, accessToken}));
  } catch (error) {
    yield put(catch_exceptions("Error while refreshing token!"));
  }
}

export function* tokenRefreshSaga() {
  yield takeLeading(Types.TOKEN_REFRESH, tokenRefresh);
}

function* setCurrentUser(action: IAction) {
  try {
    yield put(set_current_user(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while updating user!"));
  }
}

export function* setCurrentUserSaga() {
  yield takeLatest(Types.SET_CURRENT_USER, setCurrentUser);
}


function* logoutUser(action: any) {
  try {
    yield call(() => logOut(action.payload?.user, action.payload?.token));
    yield put(user_logout());
    yield localStorage.removeItem(LocalData.RefreshToken);
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
    loginUserSaga(), logoutUserSaga(), addToCartSaga(), removeFromCartSaga(), tokenRefreshSaga(),
    checkoutCartItemsSaga(), setCurrentUserSaga()
  ]);
}
