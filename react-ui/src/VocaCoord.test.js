import React from 'react';
import ReactDOM from 'react-dom';
import VocaCoord from './VocaCoord';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VocaCoord />, div);
});
