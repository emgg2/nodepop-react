import {adverts, initValue, tags, ui} from './reducers';
import { 
    ADVERTS_LOADED_SUCCESS,
    ADVERT_DELETED_SUCCESS,
    ADVERT_DETAIL_SUCCESS,
    ADVERT_CREATED_SUCCESS,
    TAGS_LOADED_SUCCESS,
    AUTH_LOGIN_REQUEST, 
    TAGS_LOADED_REQUEST,
    ADVERTS_LOADED_REQUEST, 
    ADVERT_CREATED_REQUEST,
    ADVERT_DELETED_REQUEST, 
    ADVERT_DETAIL_REQUEST,
    AUTH_LOGIN_SUCCESS,
    UI_RESET_ERROR
 } from './types';


describe('ADVERTS', () => {
    test('should manage ANY action', () => {
        const state = initValue.adverts;
        const action = { type: 'ANY' };
        const nextState = adverts(state, action );
        expect(nextState).toBe(state);
    });

    test('should manage ADVERTS_LOADED_SUCCESS action', () => {
        const state = initValue.adverts;
        const action = { type: ADVERTS_LOADED_SUCCESS, payload: []}
        const expectedState = { ...state, loaded: true, data: action.payload}
        const nextState = adverts(state, action );
        expect(nextState).toStrictEqual(expectedState);   
    });

    test('should manage ADVERT_DELETED_SUCCESS action', () => {
        const state = initValue.adverts;
        const action = { type: ADVERT_DELETED_SUCCESS, payload: []}
        const expectedState = { ...state, loaded: true, data: action.payload}
        const nextState = adverts(state, action );
        expect(nextState).toStrictEqual(expectedState);  
    });

    test('should manage ADVERT_DETAIL_SUCCESS action', () => {
        const state = initValue.adverts;
        const advert = ['payload'];
        const action = { type: ADVERT_DETAIL_SUCCESS, payload: advert}
        const expectedState = { ...state, loaded: false, data: [ ...state.data, action.payload ]}
        const nextState = adverts(state, action );
        expect(nextState).toStrictEqual(expectedState);  
    });

    test('should manage ADVERT_CREATED_SUCCESS action', () => {
        const state = initValue.adverts;
        const advert = ['payload'];
        const action = { type: ADVERT_CREATED_SUCCESS, payload: advert}
        const expectedState = { ...state, loaded: true, data: [ ...state.data, action.payload ]}
        const nextState = adverts(state, action );
        expect(nextState).toStrictEqual(expectedState);  
    })

});

describe('TAGS', () => {
    test('should manage ANY action', () => {
        const state = initValue.tags;
        const action = { type: 'ANY' };
        const nextState = adverts(state, action );
        expect(nextState).toBe(state);
    });

    test('should manage TAGS_LOADED_SUCCESS action', () => {
        const state = initValue.tags;
        const action = { type: TAGS_LOADED_SUCCESS , payload: []}
        const expectedState = { ...state, loaded: true, data: action.payload}
        const nextState = tags(state, action );
        expect(nextState).toStrictEqual(expectedState);   
    });    
});

describe('UI', () => {
    test('should manage ANY action', () => {
        const state = initValue.ui;
        const action = { type: 'ANY' };
        const nextState = ui(state, action );
        expect(nextState).toBe(state);
    });

    test('should manage AUTH_LOGIN_REQUEST, TAGS_LOADED_REQUEST, ADVERTS_LOADED_REQUEST, ADVERT_CREATED_REQUEST, ADVERT_DELETED_REQUEST, ADVERT_DETAIL_REQUEST  action', () => {
        const state = initValue.ui;
        const action = { type: AUTH_LOGIN_REQUEST || 
            TAGS_LOADED_REQUEST || 
            ADVERTS_LOADED_REQUEST || 
            ADVERT_CREATED_REQUEST || 
            ADVERT_DELETED_REQUEST || 
            ADVERT_DETAIL_REQUEST , payload: []}
        const expectedState = { ...state, isLoading: true, error: null}
        const nextState = ui(state, action );
        expect(nextState).toStrictEqual(expectedState);   
    });    

    test('should manage AUTH_LOGIN_SUCCESS, TAGS_LOADED_SUCCESS, ADVERTS_LOADED_SUCCESS, ADVERT_DELETED_SUCCESS, ADVERT_CREATED_SUCCESS, ADVERT_DETAIL_SUCCESS action', () => {
        const state = initValue.ui;
        const action = { type: AUTH_LOGIN_SUCCESS || 
            TAGS_LOADED_SUCCESS || 
            ADVERTS_LOADED_SUCCESS || 
            ADVERT_DELETED_SUCCESS || 
            ADVERT_CREATED_SUCCESS || 
            ADVERT_DETAIL_SUCCESS , payload: []}
        const expectedState = { ...state, isLoading: false, error: null}
        const nextState = ui(state, action );
        expect(nextState).toStrictEqual(expectedState);   
    });    

    test('should manage UI_RESET_ERROR action', () => {
        const state = initValue.ui;
        const action = { type: UI_RESET_ERROR  , payload: []}
        const expectedState = { ...state, error: null}
        const nextState = ui(state, action );
        expect(nextState).toStrictEqual(expectedState);   
    });
});
