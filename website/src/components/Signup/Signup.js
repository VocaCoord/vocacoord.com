import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { apiURL } from '../../constants/Assorted';
import { authenticateUser } from '../../actions/index';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../../constants/ActionTypes';
import slide from '../../assets/VCSignup.svg';
import '../../VocaCoord.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      signingUp: false
    };
  }

  componentWillUnmount() {
    this.setState({ signingUp: false });
  }

  handleSignUp() {
    this.setState({ signingUp: true });

    const { firstName, lastName, email, password } = this.state;
    const { dispatch, history } = this.props;

    fetch(`${apiURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(json => {
        dispatch(authenticateUser(json));
        if (json.response.status === SIGNUP_SUCCESS)
          return history.push('/classrooms');
        if (json.response.status === SIGNUP_FAILURE)
          setTimeout(() => this.setState({ signingUp: false }), 1000);
      })
      .catch(err => console.error(err));
  }

  render() {
    const { firstName, lastName, email, password, signingUp } = this.state;
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-login">
          <Input
            placeholder="First Name"
            align="center"
            style={{ marginBottom: '5px' }}
            value={firstName}
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            align="center"
            style={{ marginBottom: '5px' }}
            value={lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
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
          {signingUp ? (
            <div className="App-spinner">
              <PulseLoader color="blue" />
            </div>
          ) : (
            <Button block color="primary" onClick={() => this.handleSignUp()}>
              Sign Up
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Signup));
