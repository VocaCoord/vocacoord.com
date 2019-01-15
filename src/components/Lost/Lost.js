import React from 'react';
import { Button } from 'reactstrap';
import slide from '../../assets/VCLost.svg';
import '../../VocaCoord.css';

const Lost = ({ history }) => (
  <div>
    <img src={slide} className="slide" alt="slide" />
    <div className="App-lost-button">
      <Button block color="primary" onClick={() => history.goBack()}>
        Go back
      </Button>
    </div>
  </div>
);

export default Lost;
