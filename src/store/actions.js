import { getAdvertsLoaded, getTagsLoaded, deleteAdvert, getAdvertDetail } from './selectors';
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    UI_RESET_ERROR,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERTS_LOADED_FAILURE,
    ADVERT_CREATED_REQUEST,
    ADVERT_CREATED_SUCCESS,
    ADVERT_CREATED_FAILURE,
    ADVERT_DELETED_REQUEST,
    ADVERT_DELETED_SUCCESS,
    ADVERT_DELETED_FAILURE,
    ADVERT_DETAIL_REQUEST,
    ADVERT_DETAIL_SUCCESS,
    ADVERT_DETAIL_FAILURE,
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

export const advertsCreatedRequest = () => {
    return {
        type: ADVERT_CREATED_REQUEST,             
    }
}

export const advertsCreatedSuccess = adverts => {
    return {
        type: ADVERT_CREATED_SUCCESS,          
        payload: adverts,   
    }
}

export const advertsCreatedFailure = error => {
    return {
        type: ADVERT_CREATED_FAILURE,
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

export const advertsCreateAction = advert => {
    return async function (dispatch, getState, { api, history }) {
            dispatch(advertsCreatedRequest());
        try {
            const createAdvert = await api.adverts.createAdvert(advert);
            dispatch(advertsCreatedSuccess(createAdvert));
            history.push(`/`)
        } catch (error) {
            dispatch(advertsCreatedFailure(error));            
        }
    }
}

export const advertsDeletedRequest = () => {
    return {
        type: ADVERT_DELETED_REQUEST,             
    }
}

export const advertsDeletedSuccess = adverts => {
    return {
        type: ADVERT_DELETED_SUCCESS,          
        payload: adverts,   
    }
}

export const advertsDeletedFailure = error => {
    return {
        type: ADVERT_DELETED_FAILURE,
        payload: error,
        error: true                     
    }
}

export const advertsDeleteAction = advertId => {
    return async function (dispatch, getState, { api, history }) {
            dispatch(advertsDeletedRequest());
        try {
            await api.adverts.deleteAdvert(advertId);
            const adverts = deleteAdvert(getState(),advertId);
            dispatch(advertsDeletedSuccess(adverts));
            history.push(`/`)
        } catch (error) {
            dispatch(advertsCreatedFailure(error));            
        }
    }
}

export const advertsDetailRequest = () => {
    return {
        type: ADVERT_DETAIL_REQUEST,             
    }
}

export const advertsDetailSuccess = adverts => {
    return {
        type: ADVERT_DETAIL_SUCCESS,          
        payload: adverts,   
    }
}

export const advertsDetailFailure = error => {
    return {
        type: ADVERT_DETAIL_FAILURE,
        payload: error,
        error: true                     
    }
}

export const advertsDetailAction = advertId => {
    return async function (dispatch, getState, { api, history }) {
        const advertLoaded = getAdvertDetail(getState(),advertId);
        if(advertLoaded){
            return;
        }
        dispatch(advertsDetailRequest());
        const advert = await api.adverts.getAdvert(advertId);
        try {
            dispatch(advertsDetailSuccess(advert));
            return advert;
        } catch (error) {
            dispatch(advertsDetailFailure(error));            
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
        try {
            const tagsLoaded = getTagsLoaded(getState());
            if(tagsLoaded)
            {
                return;
            }
            dispatch(tagsLoadedRequest());
            const tags = await api.adverts.getTags();
            dispatch(tagsLoadedSuccess(tags));
        } catch (error) {
            dispatch(tagsLoadedFailure(error));            
        }
    }
}
