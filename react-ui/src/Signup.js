import React, { Component } from 'react';
import { Input, Button } from "reactstrap";
import slide from './VCSignup.svg';
import './VocaCoord.css';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-login">
          <Input placeholder="First Name" align="center" style={{ marginBottom: "5px" }}/>
          <Input placeholder="Last Name" align="center" style={{ marginBottom: "5px" }}/>
          <Input placeholder="Email" align="center" style={{ marginBottom: "5px" }}/>
          <Input placeholder="Password" type="password" style={{ marginBottom: "5px" }}/>
          <Button block color="primary">Sign Up</Button>
        </div>
      </div>
    );
  }
}