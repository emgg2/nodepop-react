import { getAdvertsLoaded } from './selectors';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,
    TAGS_LOADED_FAILURE,
    }
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

export const loginAction = credentials => {
    return async function (dispatch, getState,  { api, history }) {
        dispatch(authLoginRequest());
        try {
            await api.auth.login(credentials);
            dispatch(authLoginSuccess());
            const { from } = history.location.state || { from : { pathname: '/'}};
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

export const advertsLoadedRequest = () => {
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

    return async function (dispatch, getState, { api }) {
        const adverts = getAdvertsLoaded(getState());
        if(adverts) {
            return;
        }
        dispatch(advertsLoadedRequest());
        try {
            const adverts = await api.adverts.getAdverts();
            dispatch(advertsLoadedSuccess(adverts));
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

export const tagsLoadedRequest = () => {
    return {
        type: TAGS_LOADED_REQUEST,             
    }
}

export const tagsLoadedSuccess = tags => {
    return {
        type: TAGS_LOADED_SUCCESS,          
        payload: tags,   
    }
}

export const tagsLoadedFailure = error => {
    return {
        type: TAGS_LOADED_FAILURE,
        payload: error,
        error: true                     
    }
}

export const tagsLoadAction = () => {
    return async function (dispatch, getState, { api }) {
        dispatch(tagsLoadedRequest());
        try {
            const tags = await api.adverts.getTags();
            dispatch(tagsLoadedSuccess(tags));
        } catch (error) {
            dispatch(tagsLoadedFailure(error));            
        }
    }
}
