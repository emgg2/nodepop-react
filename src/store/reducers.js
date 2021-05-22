import { 
    ADVERTS_LOADED, 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGOUT, 
    UI_RESET_ERROR
} from './types';

const initialValue = {
    auth: false,
    adverts: [],
    ui: {
        loading: false,
        error: null
    }
}

export function auth (state = initialValue.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true ;
        case AUTH_LOGOUT:
            return false ;
        
        default:
            return state;
    }        
}

export function adverts (state=initialValue.adverts, action) {
    switch (action.type) {        
        case ADVERTS_LOADED:
            return action.payload.adverts 
        default:
            return state;
    }        
}

export function ui (state=initialValue.ui, action) {
    if(action.error) {
        return { ...state, loading:false, error: action.payload}
    }
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return { ...state, loading: true, error:null }
        case AUTH_LOGIN_SUCCESS:
            return { ...state, loading:false}     
        case UI_RESET_ERROR:
            return {...state, error:null}                   
        default:
            return state;
    }
}

