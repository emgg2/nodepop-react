import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';
import { Provider } from 'react-redux';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';


const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({preloadedState: { auth: !!accessToken}});


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
