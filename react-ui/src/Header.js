import React, { Component } from 'react';
import logo from './VCLogo.png';
import { Button } from 'reactstrap';
import './VocaCoord.css';
import { Link } from 'react-router-dom'

const logoStyle = {
  color: 'white'
}

export default class Header extends Component {
  render () {
    return (
      <div className="App-header">
        <Link to="/" style={logoStyle}>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-logo-text">ocaCoord</h1>
        </Link>
        <div className="App-login-buttons">
          <Link to="/login">
            <Button color="primary">Log In</Button>
          </Link>
          {' '}
          <Link to="/signup">
            <Button color="primary" outline>Sign Up</Button>
          </Link>
        </div>
      </div>
    )
  }
}

