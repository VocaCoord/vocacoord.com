import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Header.js';
import Homepage from './Homepage.js';
import Login from './Login.js';
import Signup from './Signup.js';
import './VocaCoord.css';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    )
  }
}