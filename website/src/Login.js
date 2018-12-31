import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import { withRouter } from 'react-router-dom';
import './VocaCoord.css';
import { apiURL } from './constants/Assorted';
import slide from './assets/VCLogin.svg';
import { authenticateUser } from './actions/index';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './constants/ActionTypes';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggingIn: false
    };
  }

  componentWillUnmount() {
    this.setState({ loggingIn: false });
  }

  handleLogIn() {
    this.setState({ loggingIn: true });

    const { email, password } = this.state;
    const { dispatch, history } = this.props;

    fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(json => {
        dispatch(authenticateUser(json));
        if (json.response.status === LOGIN_SUCCESS)
          return history.push('/classrooms');
        if (json.response.status === LOGIN_FAILURE)
          setTimeout(() => this.setState({ loggingIn: false }), 1000);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { email, loggingIn, password } = this.state;
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-login">
          <Input
            placeholder="Email"
            align="center"
            style={{ marginBottom: '5px' }}
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <Input
            placeholder="Password"
            type="password"
            style={{ marginBottom: '5px' }}
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
          />
          {loggingIn ? (
            <div className="App-spinner">
              <PulseLoader color="blue" />
            </div>
          ) : (
            <Button block color="primary" onClick={() => this.handleLogIn()}>
              Log In
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
