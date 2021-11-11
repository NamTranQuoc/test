import {
    ADD_MEMBER, DELETE_MEMBER,
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

export const updateMember = (member, param) => {
    return {
        type: UPDATE_MEMBER,
        payload: {
            member: member,
            param: param
        }
    };
};

export const deleteMember = (id, type, param) => {
    return {
        type: DELETE_MEMBER,
        payload: {
            id: id,
            type: type,
            param: param
        }
    };
};
