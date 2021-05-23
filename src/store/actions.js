import { getAdverts } from '../api/adverts';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE}
    from './types';



export const authLoginRequest = () => {
    return {
        type: AUTH_LOGIN_REQUEST,
    }
}

export const authLoginSuccess = () => {
    return {
        type: AUTH_LOGIN_SUCCESS,
    }
}

export const authLoginFailure = (error) => {
    return {
        type: AUTH_LOGIN_FAILURE,
        payload: error,
        error: true
    }
}

export const loginAction = (credentials, location) => {
    return async function (dispatch, getState,  { api, history }) {
        dispatch(authLoginRequest());
        try {
            await api.auth.login(credentials);
            dispatch(authLoginSuccess());
            const { from } = location.state || { from : { pathname: '/'}};
            history.replace(from);
        } catch (error) {
            dispatch(authLoginFailure(error));            
        }
    }
}


export const authLogout = () => {
    return  {
        type: AUTH_LOGOUT
    }
}

export const advertsLoadedRequest = adverts => {
    return {
        type: ADVERTS_LOADED_REQUEST,             
    }
}

export const advertsLoadedSuccess = adverts => {
    return {
        type: ADVERTS_LOADED_SUCCESS,          
        payload: adverts,   
    }
}

export const advertsLoadedFailure = error => {
    return {
        type: ADVERTS_LOADED_FAILURE,
        payload: error,
        error: true                     
    }
}

export const advertsLoadAction = () => {
    return async function (dispatch, getState) {
        dispatch(advertsLoadedRequest());
        try {
            const adverts = await getAdverts();
            dispatch(advertsLoadedSuccess(adverts));
            //const { from } = location.state || { from : { pathname: '/'}};
            //history.replace(from);
        } catch (error) {
            dispatch(advertsLoadedFailure(error));            
        }
    }
}

export const resetError = () => {
    return {
        type: UI_RESET_ERROR
    }

}