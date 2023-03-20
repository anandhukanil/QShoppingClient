import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import store from "./redux/store";
import { Provider } from "react-redux";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "https://fakestoreapi.com";
axios.defaults.baseURL = "https://dummyjson.com";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
