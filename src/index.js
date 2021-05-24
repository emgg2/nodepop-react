import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import Root from './Root';
import  { createBrowserHistory } from 'history';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';


const history = createBrowserHistory();
const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({
  preloadedState: { auth: !!accessToken},
  history
});


ReactDOM.render(
    <Root store = {store} history = {history}/>,
    document.getElementById('root')
);
