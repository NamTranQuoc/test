import {CLEAR_ITEMS, GET_LIST_SUCCESS, GET_MEMBER, ON_HIDE_LOADER_TABLE,} from '../../constants/ActionTypes'

const INIT_STATE = {
    items: [],
    totalItems: 0,
    loaderTable: false
};

const GetListReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_MEMBER: {
            return {
                ...state,
                loaderTable: true,
                param: action.payload
            }
        }
        case GET_LIST_SUCCESS: {
            return {
                ...state,
                items: action.payload.items,
                totalItems: action.payload.total_items
            }
        }
        case ON_HIDE_LOADER_TABLE: {
            return {
                ...state,
                loaderTable: false,
            }
        }
        case CLEAR_ITEMS: {
            return {
                ...state,
                items: [],
                totalItems: 0,
            }
        }
        default:
            return state;
    }
}

export default GetListReducer;
