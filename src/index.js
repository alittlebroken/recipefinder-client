/* Packages needed */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/* Import the apps store */
import store from './store/store'

/* Components needed */
import App from './App';

/* Styles needed */
import './index.css';

const root = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);