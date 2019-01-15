import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from './containers/Header';
import { Homepage } from './components/Homepage/index';
import { SignIn } from './components/SignIn';
import { Student } from './components/Student';
import { Classrooms } from './containers/Classrooms';
import { Lost } from './components/Lost';
import { WordBanks } from './containers/WordBanks';
import { Words } from './containers/Words';
import PrivateRoute from './PrivateRoute';
import { Footer } from './components/Footer';
import { userSelector } from './selectors';
import './VocaCoord.css';

const Routing = ({ user }) => {
  const { authenticated } = user;
  return (
    <Router>
      <div className="App">
        <Header authenticated={authenticated} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            exact
            path="/login"
            component={() => <SignIn authenticated={authenticated} />}
          />
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
          <Route exact path="/student" component={Student} />
          <Route component={Lost} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({
  user: userSelector(state)
});

export default connect(mapStateToProps)(Routing);
