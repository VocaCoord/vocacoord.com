import React, { Component } from 'react';
import { Button } from "reactstrap";
import slide from './assets/VCLost.svg';
import './VocaCoord.css';

export default class Signup extends Component {
  render() {
    return (
      <div>
        <div className="App-homepage">
          <img src={slide} className="App-slide" alt="slide" />
        </div>
        <div className="App-lost-button">
          <Button block color="primary" onClick={() => this.props.history.goBack()}>
            Go back
          </Button>
        </div>
      </div>
    );
  }
}