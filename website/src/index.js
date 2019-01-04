import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Root } from './components/Root';
import configureStore from './store/configureStore';
import './index.css';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
