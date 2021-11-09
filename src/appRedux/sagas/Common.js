import {all, fork, put, takeEvery} from "redux-saga/effects";
import {INIT_URL, SHOW_MESSAGE, SWITCH_LANGUAGE} from "../../constants/ActionTypes";
import {createNotification} from "../../components/Notification";
import {clearItems, userSignOut} from "../actions";

function* showNotificationGenerate({payload}) {
    yield createNotification(payload);
    if ("member_type_deny" === payload) {
        yield put(userSignOut());
    }
}

function* setInitUrlGenerate({payload}) {
    yield put(clearItems());
}

export function* setInitUrl() {
    yield takeEvery(INIT_URL, setInitUrlGenerate);
}

export function* setLocale() {
    yield takeEvery(SWITCH_LANGUAGE, (payload) => {localStorage.setItem("locale", JSON.stringify(payload.payload))});
}

export function* showNotification() {
    yield takeEvery(SHOW_MESSAGE, showNotificationGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(showNotification),
        fork(setInitUrl),
        fork(setLocale),
    ]);
}
