import React from 'react';
import { Button } from 'reactstrap';
import slide from './assets/VCLost.svg';
import './VocaCoord.css';

const Signup = ({ history }) => (
  <div>
    <div className="App-homepage">
      <img src={slide} className="App-slide" alt="slide" />
    </div>
    <div className="App-lost-button">
      <Button block color="primary" onClick={() => history.goBack()}>
        Go back
      </Button>
    </div>
  </div>
);

export default Signup;
