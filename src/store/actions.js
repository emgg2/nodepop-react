import { login } from '../api/auth';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    ADVERTS_LOADED,
    UI_RESET_ERROR}
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

export const loginAction = (credentials, history, location) => {
    return async function (dispatch, getState) {
        dispatch(authLoginRequest());
        try {
            await login(credentials);
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

export const advertsLoaded = adverts => {
    return {
        type: ADVERTS_LOADED,
        payload: {
            adverts,
        }        
    }

}

export const resetError = () => {
    return {
        type: UI_RESET_ERROR
    }

}