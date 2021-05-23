import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import App from './components/app';


export default function Root({store, history}) {
    return(
        <Provider store={store}>
            <React.StrictMode>
                <Router history={history}>
                    <App />
                </Router>
            </React.StrictMode>
        </Provider>
    )
}