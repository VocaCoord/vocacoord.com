import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header.js";
import Homepage from "./Homepage.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Classrooms from "./containers/Classrooms.js";
import Lost from "./Lost.js";
import WordBanks from "./WordBanks.js";
import WordBank from "./WordBank.js";
import PrivateRoute from "./PrivateRoute.js";
import "./VocaCoord.css";

class Routing extends Component {
  render() {
    const authenticated = true;
    return (
      <Router>
        <div className="App">
          <Header authenticated={authenticated} />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <PrivateRoute
              exact
              path="/classrooms"
              component={Classrooms}
              authenticated={authenticated}
            />
            <PrivateRoute
              exact
              path="/classrooms/:classroom/wordbanks"
              component={WordBanks}
              authenticated={authenticated}
            />
            <PrivateRoute
              exact
              path="/classrooms/:classroom/wordbanks/words"
              component={WordBank}
              authenticated={authenticated}
            />
            <Route component={Lost} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routing;
