import { call, takeEvery, put, takeLatest, all,  } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { get_all_products, catch_exceptions, get_product_details, set_data_loading } from "../actionsAndReducers/products";
import {
  getAllProducts as allProductsApi,
  getProduct as productDetailsApi,
  searchProducts as searchProductsApi
} from "../../apis/products";
import { IAction, IProduct, Types } from "../../types";



function* getAllProducts(action: IAction) {
  try {
    yield put(set_data_loading(true));
    const response: AxiosResponse<{products: IProduct[]}, unknown> = yield call(() => (
      action?.payload ? searchProductsApi(action.payload as string) : allProductsApi()
    ));
    yield put(get_all_products(response.data?.products));
    yield put(set_data_loading(false));
  } catch (error) {
    yield put(catch_exceptions("Error while fetching products!"));
    yield put(set_data_loading(false));
  }
}

export function* getAllProductsSaga() {
  yield takeEvery(Types.GET_ALL_PRODUCTS, getAllProducts);
}

function* getProductDetails(action: IAction) {
  try {
    yield put(set_data_loading(true));
    const response: AxiosResponse<unknown, unknown> = yield call(() => productDetailsApi(action.payload as number));
    yield put(get_product_details(response.data));
    yield put(set_data_loading(false));
  } catch (error) {
    yield put(catch_exceptions("Error while fetching product details!"));
    yield put(set_data_loading(false));
  }
}

export function* getProductDetailsSaga() {
  yield takeLatest(Types.GET_PRODUCT_DETAILS, getProductDetails);
}

export default function* productSaga() {
  yield all([getAllProductsSaga(), getProductDetailsSaga()]);
}
