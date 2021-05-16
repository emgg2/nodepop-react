import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app';


export default function Root({store}) {
    return(
        <Provider store={store}>
            <React.StrictMode>
                <Router>
                    <App />
                </Router>
            </React.StrictMode>
        </Provider>
    )
}