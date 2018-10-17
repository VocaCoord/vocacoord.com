import React, { Component } from 'react';
import logo from './VCLogo.png';
import slide from './VCSlide.svg';
import './VocaCoord.css';
import { Button } from 'reactstrap';

class VocaCoord extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-logo-text">ocaCoord</h1>
          <div className="App-login-buttons">
            <Button color="primary">Log In</Button>{' '}
            <Button color="primary" outline>Sign Up</Button>
          </div>
        </div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
      </div>
    );
  }
}

export default VocaCoord;
