import {HIDE_MESSAGE, INIT_URL, ON_HIDE_LOADER, ON_SHOW_LOADER, SHOW_MESSAGE,} from '../../constants/ActionTypes'

const INIT_STATE = {
    loading: false,
    message: '',
    navCollapsed: true,
    width: window.innerWidth,
    pathname: '/',
};

const CommonReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case INIT_URL: {
            return {
                ...state,
                pathname: action.payload
            }
        }
        case SHOW_MESSAGE: {
            return {
                ...state,
                message: action.payload.message,
                loading: false
            }
        }
        case HIDE_MESSAGE: {
            return {
                ...state,
                loading: false
            }
        }
        case ON_SHOW_LOADER: {
            return {
                ...state,
                loading: true
            }
        }
        case ON_HIDE_LOADER: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    }
}

export default CommonReducer;
