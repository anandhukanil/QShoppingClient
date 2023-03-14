import { all } from "redux-saga/effects";
import userSaga from "./users";
import productSaga from "./products";



export default function* rootSaga() {
  yield all([userSaga(), productSaga()]);
}