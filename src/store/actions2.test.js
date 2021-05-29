import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { adverts } from '../api';

import {  loginAction, advertsCreateAction } from './actions';


import { ADVERT_CREATED_FAILURE, ADVERT_CREATED_REQUEST, ADVERT_CREATED_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS  } from './types';

    
const createStore = extraArgument => state => {
    const middleware = [thunk.withExtraArgument(extraArgument)];
    const mockStore = configureStore(middleware);
    const store = mockStore(state);
    return store;
}


describe('AdvertsCreateAction', () => {
    describe('when advert create resolves', () => {
        const advert = 'advert';
        const mockHistoryPush = jest.fn();
        const history = { push: mockHistoryPush};
        
        test('should dispatch ADVERT_CREATED_REQUEST and ADVERT_CREATE_SUCCESS', async () => {
            const api = {
                adverts: { createAdvert: jest.fn().mockResolvedValue(advert)}
            };
            const store = createStore({api, history})();
            await store.dispatch(advertsCreateAction(advert));
            const actions = store.getActions();
            expect(actions).toEqual([
                {type: ADVERT_CREATED_REQUEST},
                {type: ADVERT_CREATED_SUCCESS, payload: advert}
            ])
        })

    })    
    describe('when advert create throws', () => {
        const advert = 'advert';        
        const mockHistoryPush = jest.fn();
        const history = { push: mockHistoryPush};
        const error = 'error';
        test('should dispatch ADVERT_CREATED_REQUEST and ADVERT_CREATE_FAILURE', async () => {
            const api = {
                adverts: { createAdvert: jest.fn().mockRejectedValue(error)}
            };
            const store = createStore({api, history})();
            await store.dispatch(advertsCreateAction(advert));
            const actions = store.getActions();
            expect(actions).toEqual([
                {type: ADVERT_CREATED_REQUEST},
                {type: ADVERT_CREATED_FAILURE, error: true, payload: error}
            ])
        })
    })    
})


describe('LoginAction', () => {

    describe('when login api resolves', () => {
        const credentials = 'credentials';
        const api = {
            auth: { login: jest.fn().mockResolvedValue()}
        };
        const history = {
                location: { },
                replace: jest.fn()           
        };

        const store = createStore({api, history})();
        
        test('should dispatch and AUTH_LOGIN_REQUEST and AUTH_LOGIN_SUCCESS action', async () => {
            await store.dispatch(loginAction(credentials));
             const actions = store.getActions();       
             
             expect(actions).toEqual([
                {type: AUTH_LOGIN_REQUEST},
                {type: AUTH_LOGIN_SUCCESS}
            ]);
            
        });       
        test('should be called with credentials ', async () => {
            await store.dispatch(loginAction(credentials));
            expect(api.auth.login).toBeCalledWith(credentials);
        })
    })

    describe('when login api throws', () => {
        const credentials = 'credentials';
        const error = 'Unauthorized';
        const history = {
            location: { },
            replace: jest.fn()           
        };
        
        
        test('should dispatch and AUTH_LOGIN_FAILURE action', async () => {            
            const api = {
                auth: { login: jest.fn().mockRejectedValue(error)}
            };
            const store = createStore({api, history})();
            await store.dispatch(loginAction(credentials));
            const actions = store.getActions();
            expect(actions).toEqual([
                {type: AUTH_LOGIN_REQUEST},
                {type: AUTH_LOGIN_FAILURE, error: true, payload: error}]);
        });     

    })
   
});