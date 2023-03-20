import { all } from "redux-saga/effects";
import userSaga from "./users";
import productSaga from "./products";
import notificationSaga from "./notifications";



export default function* rootSaga() {
  yield all([userSaga(), productSaga(), notificationSaga()]);
}