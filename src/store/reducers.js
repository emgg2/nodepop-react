import { func } from 'prop-types';
import { 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGOUT, 
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERT_CREATED_REQUEST,
    ADVERT_CREATED_SUCCESS,
    UI_RESET_ERROR,
    TAGS_LOADED_REQUEST,
    TAGS_LOADED_SUCCESS,

} from './types';


const initValue = {
    auth: false,    
    ui: {
        isLoading: false,
        error: null
    },
    tags: {
        data: [],
        loaded: false
    },
    adverts : {
        data: [],
        loaded: false
    }
}


export function auth (state = initValue.auth, action) {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            return true ;
        case AUTH_LOGOUT:
            return false ;        
        default:            
            return state;            
    }        
}

export function adverts (state = initValue.adverts, action) {   
    switch (action.type) {            
        case ADVERTS_LOADED_SUCCESS:      
            return {...state, loaded: true, data: action.payload};
        case ADVERT_CREATED_SUCCESS:
            return {...state, loaded: true, data: [ ...state.data, action.payload]};
            return 
        default:
            return state;
    }        
}

export function tags ( state = initValue.tags, action) {    
    switch (action.type) {
        case TAGS_LOADED_SUCCESS: 
        return {...state, loaded: true, data: action.payload};        
        default:
            return state;
    }
}
export function ui (state=initValue.ui, action) {
    if(action.error) {
        return { ...state, isLoading:false, error: action.payload}
    }
    
    switch (action.type) {
        case ADVERTS_LOADED_REQUEST:
        case TAGS_LOADED_REQUEST:
        case AUTH_LOGIN_REQUEST:
        case ADVERT_CREATED_REQUEST:
            return { ...state, isLoading: true, error:null }
        case AUTH_LOGIN_SUCCESS:
        case ADVERTS_LOADED_SUCCESS:
        case TAGS_LOADED_SUCCESS:
            return { ...state, isLoading:false}     
        case UI_RESET_ERROR:
            return {...state, error:null}                   
        default:
            return state;
    }
}

