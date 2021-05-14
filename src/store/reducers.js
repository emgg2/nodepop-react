import { AUTH_LOGIN, AUTH_LOGOUT } from './types';
const initialValue = {
    auth: false,
   // adverts:

}
function reducer (state=initialValue, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return { ...state, auth: true };
        case AUTH_LOGOUT:
            return { ...state, auth: false };
        default:
            return state;
    }
}

export default reducer;