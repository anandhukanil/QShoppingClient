import { call, takeEvery, put, takeLatest, all,  } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { get_all_products, catch_exceptions, get_product_details } from "../actionsAndReducers/products";
import { getAllProducts as allProductsApi, getProduct as productDetailsApi } from "../../apis/products";
import { IAction, Types } from "../../types";



function* getAllProducts() {
  try {
    const response: AxiosResponse<unknown, unknown> = yield call(() => allProductsApi());
    yield put(get_all_products(response.data));
  } catch (error) {
    yield put(catch_exceptions("Error while fetching products!"));
  }
}

export function* getAllProductsSaga() {
  yield takeEvery(Types.GET_ALL_PRODUCTS, getAllProducts);
}

function* getProductDetails(action: IAction) {
  try {
    const response: AxiosResponse<unknown, unknown> = yield call(() => productDetailsApi(action.payload as number));
    yield put(get_product_details(response.data));
  } catch (error) {
    yield put(catch_exceptions("Error while fetching product details!"));
  }
}

export function* getProductDetailsSaga() {
  yield takeLatest(Types.GET_PRODUCT_DETAILS, getProductDetails);
}

export default function* productSaga() {
  yield all([getAllProductsSaga(), getProductDetailsSaga()]);
}
