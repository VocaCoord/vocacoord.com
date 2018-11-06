import React from "react";
import { Provider } from "react-redux";
import Routing from "../Routing.js";

const Root = ({ store }) => (
  <Provider store={store}>
    <Routing />
  </Provider>
);

export default Root;
