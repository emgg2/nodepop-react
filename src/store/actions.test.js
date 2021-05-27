import { 
    authLoginFailure, 
    authLoginRequest, 
    authLoginSuccess,
    advertsLoadedSuccess
 } from './actions';

import { AUTH_LOGIN_REQUEST,
     AUTH_LOGIN_FAILURE,
     AUTH_LOGIN_SUCCESS,
     ADVERTS_LOADED_SUCCESS
     } from './types';

describe('authLoginRequest', () =>{
    test ('should return an AUTH_LOGIN_REQUEST action', ()=>{
        const expectedAction = {type:AUTH_LOGIN_REQUEST};
        const result = authLoginRequest(); 
        expect(result).toEqual(expectedAction)
    })
});

describe('authLoginFailure', () =>{
    test ('should return an AUTH_LOGIN_FAILURE action', ()=>{
        const expectedAction = {
            type:AUTH_LOGIN_FAILURE,
            payload: 'error',
            error: true
        };
        const result = authLoginFailure('error'); 
        expect(result).toEqual(expectedAction)
    })
});

describe('authLoginSuccess', () =>{
    test ('should return an AUTH_LOGIN_SUCCESS action', ()=>{
        const expectedAction = { type: AUTH_LOGIN_SUCCESS };
        const result = authLoginSuccess(); 
        expect(result).toEqual(expectedAction)
    })
});

describe('AdvertLoadedSuccess', () =>{
    test ('should return an ADVERT_LOADED_SUCCESS action', ()=>{
        const adverts = 'adverts';
        const expectedAction = {
            type:ADVERTS_LOADED_SUCCESS,
            payload: 'adverts'
        };
        const result = advertsLoadedSuccess(adverts); 
        expect(result).toEqual(expectedAction)
    })
});

