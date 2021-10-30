import axios from "axios";
import {host} from "./Host";

const INSTRUCTOR_API_URL = `${host}/auth`;
export function login(user) {
    return axios.post(`${INSTRUCTOR_API_URL}/login`, {
        username: user.email,
        password: user.password,
    });
}
