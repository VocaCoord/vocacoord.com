import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
