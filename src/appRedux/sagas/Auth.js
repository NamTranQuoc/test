import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {SIGNIN_USER, SIGNOUT_USER,} from "../../constants/ActionTypes";
import {
    setInitUrl,
    showAuthMessage,
    showMessage,
    userSignInSuccess,
    userSignOutSuccess,
    userSignUpSuccess,
} from "../actions";
import axios from "axios";
import {host} from "../store/Host";

const INSTRUCTOR_API_URL = `${host}/auth`;

const signOutRequest = async () => {}
    // await auth.signOut()
    //     .then(authUser => authUser)
    //     .catch(error => error);

const signInUserWithEmailPasswordRequest = async (payload) =>
    await axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: payload.email,
        password: payload.password,
    }).then(response => response)
        .catch(error => error)

function* signInUserWithEmailPassword({payload}) {
    try {
        // yield put(showLoader());
        const response = yield call(signInUserWithEmailPasswordRequest, payload);
        if (response.data.code !== 9999) {
            yield put(showMessage(response.data.message));
        } else {
            localStorage.setItem('token', response.data.payload);
            yield put(userSignInSuccess(response.data.payload));
            yield put(setInitUrl("/admin/dashboard"));
        }
    } catch (error) {
        yield put(showMessage(error));
    } finally {
        // yield put(hideLoader());
    }
}

function* signOut() {
    try {
        const signOutUser = yield call(signOutRequest);
        if (signOutUser === undefined) {
            localStorage.removeItem('token');
            yield put(userSignOutSuccess(signOutUser));
        } else {
            yield put(showAuthMessage(signOutUser.message));
        }
    } catch (error) {
        yield put(showAuthMessage(error));
    }
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(signOutUser)]);
}
