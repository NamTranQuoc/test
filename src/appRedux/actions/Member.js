import {
    ADD_MEMBER,
    GET_LIST_SUCCESS,
    GET_MEMBER,
    ON_HIDE_LOADER_TABLE,
    UPDATE_MEMBER
} from "../../constants/ActionTypes";

export const getListMember = (param) => {
    return {
        type: GET_MEMBER,
        payload: param
    };
};

export const getListSuccess = (payload) => {
    return {
        type: GET_LIST_SUCCESS,
        payload: payload
    };
};


export const hideLoaderTable = () => {
    return {
        type: ON_HIDE_LOADER_TABLE,
    };
};

export const addMember = (member) => {
    return {
        type: ADD_MEMBER,
        payload: member
    };
};

export const updateMember = (member) => {
    return {
        type: UPDATE_MEMBER,
        payload: member
    };
};
