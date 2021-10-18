import axios from "axios";
import {host} from "../components/common/Utils";

const INSTRUCTOR_API_URL = `${host}/auth`;
export function login(username, password) {
    return axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: username,
        password: password,
    });
}
