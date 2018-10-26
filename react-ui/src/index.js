import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { Provider } from 'react-redux';
import configureStore from "./store/configureStore";
import { sessionService } from 'redux-react-session';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const store = configureStore();

sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
