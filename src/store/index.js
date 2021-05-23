import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';



import * as api from '../api';
import  * as reducers from './reducers';


//a new custom middleware

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}


const configureStore = ({ preloadedState, history }) => {
    const middleware = [thunk.withExtraArgument({ api, history }), logger];
    const store = createStore(
        combineReducers(reducers),
        preloadedState,
        composeWithDevTools(applyMiddleware(...middleware))
        );
    return store;
}

export default configureStore;
