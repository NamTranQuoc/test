import {all, fork, put, takeEvery} from "redux-saga/effects";
import {INIT_URL, SHOW_MESSAGE, SWITCH_LANGUAGE, UPLOAD_IMAGE} from "../../constants/ActionTypes";
import {createNotification} from "../../components/Notification";
import {clearItems, userSignOut} from "../actions";
import {storage} from "../../firebase/firebase";

function* showNotificationGenerate({payload}) {
    yield createNotification(payload);
    if ("member_type_deny" === payload) {
        yield put(userSignOut());
    }
}

function* setInitUrlGenerate({payload}) {
    yield put(clearItems());
}

function* uploadImageGenerate({payload}) {
    if (payload.image != null) {
        yield storage.ref(`images/${payload.path}`).put(payload.image);
    }
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

export function* uploadImage() {
    yield takeEvery(UPLOAD_IMAGE, uploadImageGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(showNotification),
        fork(setInitUrl),
        fork(setLocale),
        fork(uploadImage)
    ]);
}
