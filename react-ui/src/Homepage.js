import React, { Component } from 'react';
import slide from './VCSlide.svg';
import './VocaCoord.css';

export default class Homepage extends Component {
  render() {
    return (
      <div className="App-homepage">
        <img src={slide} className="App-slide" alt="slide" />
      </div>
    );
  }
}
