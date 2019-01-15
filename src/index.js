import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Root } from './components/Root';
import configureStore from './store/configureStore';
import './index.css';
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DB_URL,
  FB_PROJECT_ID,
  FB_MESSAGING_ID,
  FB_STORAGE
} from './env';

const config = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  databaseURL: FB_DB_URL,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE,
  messagingSenderId: FB_MESSAGING_ID
};

firebase.initializeApp(config);

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
