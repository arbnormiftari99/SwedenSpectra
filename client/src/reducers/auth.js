 
 import { AUTH, LOGOUT } from "../constants/actionTypes";

 const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            action && action.data && localStorage.setItem('profile', JSON.stringify({ ...action.data }));

                return { ...state, authData: action && action.data ? action.data : undefined };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
    
        default:
            return state;
       
    }
 }

 export default authReducer;