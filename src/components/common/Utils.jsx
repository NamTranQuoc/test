import {storage} from "./firebase/Config";

export function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export function getKeyByValue(map, object) {
    return Object.keys(map).find((i) => map[i] === object);
}

export function getTimestamp(moment) {
    return moment != null ? moment.unix() * 1000 : null
}

export async function getImageURL(path, image_default) {
    let result = "";
    if (path !== null) {
        let promise = new Promise((resolve) => {
            storage
                .ref("images/" + path)
                .getMetadata()
                .then((Response) => {
                    if (Response.contentType === "image/png") {
                        resolve("https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2F" + path + "?alt=media&token=" + Response.md5Hash);
                    } else {
                        resolve(image_default);
                    }
                })
                .catch((error) => {
                    resolve(image_default);
                })
        });
        result = await promise;
    } else {
        result = image_default;
    }
    return result + "";
}

export function range(a, b) {
    const result = [];
    for (let i = a; i <= b; i++) {
        result.push(i);
    }
    return result;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function clearToken() {
    localStorage.removeItem('token');
}

export function timeNow() {
    return new Date().getTime();
}

// export const host = "http://localhost:8080";
export const host = "https://english-center-api.herokuapp.com";