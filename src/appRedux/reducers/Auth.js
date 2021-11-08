import {
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS
} from "../../constants/ActionTypes";

const INIT_STATE = {
    authUser: localStorage.getItem('token'),
};

const AuthReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                authUser: null,
            }
        }
        default:
            return state;
    }
}

export default AuthReducer;
