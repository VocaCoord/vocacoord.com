import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Homepage from './Homepage';
import Login from './Login';
import Signup from './Signup';
import Classrooms from './containers/Classrooms';
import Lost from './Lost';
import WordBanks from './containers/WordBanks';
import Words from './containers/Words';
import PrivateRoute from './PrivateRoute';
import './VocaCoord.css';

const Routing = ({ user }) => {
  const { authenticated } = user;
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
            path="/classrooms/:classroom/wordbanks/:wordbank/words"
            component={Words}
            authenticated={authenticated}
          />
          <Route component={Lost} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: state.userData.user
});

export default connect(mapStateToProps)(Routing);
