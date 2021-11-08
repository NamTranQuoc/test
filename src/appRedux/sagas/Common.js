import {all, fork, put, takeEvery} from "redux-saga/effects";
import {SHOW_MESSAGE} from "../../constants/ActionTypes";
import {createNotification} from "../../components/Notification";
import {userSignOut} from "../actions";

function* showNotificationGenerate({payload}) {
    yield createNotification(payload);
    if ("member_type_deny" === payload) {
        yield put(userSignOut());
    }
}

export function* showNotification() {
    yield takeEvery(SHOW_MESSAGE, showNotificationGenerate);
}

export default function* rootSaga() {
    yield all([
        fork(showNotification),
    ]);
}
