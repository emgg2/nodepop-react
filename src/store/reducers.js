import { 
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGOUT, 
    UI_RESET_ERROR,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,

} from './types';

const initialValue = {
    auth: false,
    adverts: [],
    ui: {
        loading: false,
        error: null
    },
    tags: []
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
        case ADVERTS_LOADED_SUCCESS:
            return  action.payload ;
        default:
            return state;
    }        
}

export function tags ( state=initialValue.tags, action) {
    switch (action.type) {
        case TAGS_LOADED_SUCCESS: 
            return action.payload;
        default:
            return state;
    }
}
export function ui (state=initialValue.ui, action) {
    if(action.error) {
        return { ...state, loading:false, error: action.payload}
    }
    switch (action.type) {
        case ADVERTS_LOADED_REQUEST:
        case TAGS_LOADED_REQUEST:
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

