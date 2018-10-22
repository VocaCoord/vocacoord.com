import React from "react";
import ReactDOM from "react-dom";
import Routing from "./Routing.js";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const reducer = combineReducers({
  session: sessionReducer
});

const store = createStore(reducer);

sessionService.initSessionService(store);

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
