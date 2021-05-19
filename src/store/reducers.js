import { 
    ADVERTS_LOADED, 
    AUTH_LOGIN, 
    AUTH_LOGOUT 
} from './types';

const initialValue = {
    auth: false,
    adverts: [],
    ui: {}

}

export function auth (state = initialValue.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN:
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
    return state;
}

