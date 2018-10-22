import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Header.js';
import Homepage from './Homepage.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Classrooms from './Classrooms.js';
import Lost from './Lost.js';
import { WordBanks, WordBank } from './WordBanks.js';
import PrivateRoute from './PrivateRoute.js';
import './VocaCoord.css';

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/classrooms" component={Classrooms} />
            <PrivateRoute exact path="/classrooms/:classroom/wordbanks" component={WordBanks} />
            <PrivateRoute exact path="/classrooms/:classroom/wordbanks/words" component={WordBank} />
            <Route component={Lost} />
          </Switch>
        </div>
      </Router>
    )
  }
}