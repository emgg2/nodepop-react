import { 
    authLoginFailure, 
    authLoginRequest, 
    authLoginSuccess,
    advertsLoadedSuccess,
    tagsLoadedSuccess, 
    loginAction,
    advertsLoadAction
 } from './actions';
import { getAdvertsLoaded } from './selectors';

import { AUTH_LOGIN_REQUEST,
     AUTH_LOGIN_FAILURE,
     AUTH_LOGIN_SUCCESS,
     ADVERTS_LOADED_SUCCESS,
     ADVERTS_LOADED_REQUEST,
     ADVERTS_LOADED_FAILURE,
     TAGS_LOADED_SUCCESS,
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
        expect(result).toEqual(expectedAction);
    })
});

describe('TagsLoadedSuccess', () =>{
    test ('should return an TAGS_LOADED_SUCCESS action', ()=>{
        const adverts = 'tags';
        const expectedAction = {
            type:TAGS_LOADED_SUCCESS,
            payload: 'tags'
        };
        const result = tagsLoadedSuccess(adverts); 
        expect(result).toEqual(expectedAction);
    })
});


 describe('AdvertsLoadAction', () => {
     describe('when adverts api resolves', () => {       
        const action = advertsLoadAction();
        const dispatch = jest.fn();
        const getState = {adverts : { loaded: true  }};
        const api = {
            adverts: { getAdverts: jest.fn().mockResolvedValue()}
        };

        test('should return if there are adverts loaded', () => {
            const advertsLoaded = getAdvertsLoaded(getState);
            expect(advertsLoaded).toBeTruthy();            

        })

        
        test('should dispatch and ADVERTS_LOADED_REQUEST action', async() => {
            await action(dispatch, getState, { api });
            expect(dispatch).toHaveBeenNthCalledWith(1,{type: ADVERTS_LOADED_REQUEST});
            //expect(dispatch).toHaveBeenCalled();
        });

        test('should dispatch and AUTH_LOADED_SUCCESS action', async () => {            
            await action(dispatch, getState, { api });
            expect(dispatch).toHaveBeenNthCalledWith(2, {type: ADVERTS_LOADED_SUCCESS});
        });


         describe('when getAdverts api throws', () => {
            
            const action = advertsLoadAction();
            const dispatch = jest.fn();            
            const getState = () =>{};
            
            test('should dispatch and ADVERTS_LOADED_FAILURE action', async () => {            
                const error = 'error';
                const api = {
                    adverts: { getAdverts: jest.fn().mockRejectedValue(error)}
                };
                await action(dispatch, getState, { api });
                expect(dispatch).toHaveBeenCalledWith({type: ADVERTS_LOADED_FAILURE, payload: error, error:true});
            });  
            })   
    


      })

})

describe('LoginAction', () => {
    describe('when login api resolves', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const getState = () =>{};
        const api = {
            auth: { login: jest.fn().mockResolvedValue()}
        };
        const history = {
                location: { },
                replace: jest.fn()           
        };
        test('should dispatch and AUTH_LOGIN_REQUEST action', () => {
            action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_REQUEST});
            //expect(dispatch).toHaveBeenCalled();
        });

        test('should call api.auth.login', () => {
            action(dispatch, getState, { api, history });
            expect(api.auth.login).toHaveBeenCalledWith(credentials);
        });

        test('should dispatch and AUTH_LOGIN_SUCCESS action', async () => {            
            await action(dispatch, getState, { api, history });
            expect(dispatch).toHaveBeenNthCalledWith(2, {type: AUTH_LOGIN_SUCCESS});
        });

        test('should redirect to /', async () => {        
            await action(dispatch, getState, { api, history });
            expect(history.replace).toHaveBeenCalledWith({ pathname: '/'});
        });
    })

    describe('when login api throws', () => {
        const credentials = 'credentials';
        const action = loginAction(credentials);
        const dispatch = jest.fn();
        const error = 'Unauthorized';
        const getState = () =>{};
        
        test('should dispatch and AUTH_LOGIN_FAILURE action', async () => {            
            const api = {
                auth: { login: jest.fn().mockRejectedValue(error)}
            };
            await action(dispatch, getState, { api });
            expect(dispatch).toHaveBeenCalledWith({type: AUTH_LOGIN_FAILURE, payload: error, error:true});
        });     

    })
   
});