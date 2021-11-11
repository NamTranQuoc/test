import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {ADD_MEMBER, GET_MEMBER} from "../../constants/ActionTypes";
import axios from "axios";
import {host} from "../store/Host";
import {
    getListSuccess,
    hideLoader,
    hideLoaderTable,
    showLoader,
    showMessage,
    getListMember as getListMemberAction,
    uploadImage, onHideModal
} from "../actions";

const INSTRUCTOR_API_URL = `${host}/member`;

const getListMemberRequest = async (payload) =>
    await axios({
        method: "POST",
        url: `${INSTRUCTOR_API_URL}/get_list?page=` + payload.page + `&size=` + payload.size,
        data: {
            sort: payload.sort,
            types: payload.types,
            keyword: payload.keyword,
            from_date: payload.from_date,
            to_date: payload.to_date,
            genders: payload.genders
        },
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
        },
    }).then(response => response)
        .catch(error => error)

const addMemberRequest = async (payload) =>
    await axios.post(`${INSTRUCTOR_API_URL}/add`, {
        name: payload.name,
        email: payload.email,
        address: payload.address,
        gender: payload.gender,
        dob: payload.dob,
        phone_number: payload.phone_number,
        type: payload.type,
        salary: payload.salary,
        certificate: payload.certificate,
    }).then(response => response)
        .catch(error => error)

function* getListMemberGenerate({payload}) {
    try {
        const response = yield call(getListMemberRequest, payload);
        if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(getListSuccess(response.data.payload));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoaderTable());
    }
}

function* addMemberGenerate({payload}) {
    yield put(showLoader());
    try {
        const response = yield call(addMemberRequest, payload);
        console.log(response.data.code !== 9999)
        if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            yield put(uploadImage(payload.avatar, response.data.payload.avatar));
            yield put(onHideModal());
            yield put(getListMemberAction({
                page: 1,
                size: 10,
                sort: {
                    is_asc: false,
                    field: "_id"
                },
                types: ["student"],
            }));
            yield put(showMessage("success_add"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        yield put(hideLoader());
    }
}

export function* getListMember() {
    yield takeEvery(GET_MEMBER, getListMemberGenerate);
}

export function* addMember() {
    yield takeEvery(ADD_MEMBER, addMemberGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(getListMember),
        fork(addMember),
    ]);
}
