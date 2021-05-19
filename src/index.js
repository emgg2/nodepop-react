import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import Root from './Root';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';



const accessToken = storage.get('auth');
configureClient({ accessToken });

const store = configureStore({
  preloadedState: { auth: !!accessToken, adverts: []}
});


ReactDOM.render(
    <Root store = {store} />,
    document.getElementById('root')
);
