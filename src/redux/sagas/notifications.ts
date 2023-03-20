import { all, put, takeEvery } from "redux-saga/effects";
import { IAction, Types } from "../../types";
import { catch_exceptions, clear_notification, set_notification } from "../actionsAndReducers/notification";

function* addNotification(action: IAction) {
  try {
    yield put(set_notification(action.payload));
  } catch (error) {
    yield put(catch_exceptions("Error while setting notification!"));
  }
}

export function* addNotificationSaga() {
  yield takeEvery(Types.SET_NOTIFICATION, addNotification);
}

function* clearNotification() {
  try {
    yield put(clear_notification());
  } catch (error) {
    yield put(catch_exceptions("Error while clearing notification!"));
  }
}

export function* clearNotificationSaga() {
  yield takeEvery(Types.CLEAR_NOTIFICATION, clearNotification);
}

export default function* notificationSaga() {
  yield all([addNotificationSaga(), clearNotificationSaga()]);
}
