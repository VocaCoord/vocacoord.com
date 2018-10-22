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
import { connect } from 'react-redux';
import PropTypes from "prop-types";

export class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/classrooms" component={Classrooms} authenticated={true}/>
            <PrivateRoute exact path="/classrooms/:classroom/wordbanks" component={WordBanks} authenticated={true}/>
            <PrivateRoute exact path="/classrooms/:classroom/wordbanks/words" component={WordBank} authenticated={true}/>
            <Route component={Lost} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const { bool } = PropTypes;

Routing.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
}

const mapState = ({ session }) => ({
  checked: session.checked,
  authenticated: session.authenticated
});

export default connect(mapState)(Routing);