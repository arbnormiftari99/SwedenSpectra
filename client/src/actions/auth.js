import * as api from '../api/index';
import { AUTH, UPDATE } from '../constants/actionTypes';




export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data});
     
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
         dispatch({ type: AUTH, data});
    
    } catch (error) {
        console.log(error);
    }
}

export const editProfile = (_id,editedData) => async (dispatch) => {
    try {
        const { data } = await api.editProfile(_id, editedData);
         dispatch({ type: UPDATE, data});
         console.log(data);
    
    } catch (error) {
        console.log(error);
    }
}