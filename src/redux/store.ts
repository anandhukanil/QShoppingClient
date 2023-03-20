import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productReducer from "./actionsAndReducers/products";
import userReducer from "./actionsAndReducers/users";
import notificationReducer from "./actionsAndReducers/notification";
import saga from "./sagas";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productReducer,
    users: userReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(saga);


export default store;