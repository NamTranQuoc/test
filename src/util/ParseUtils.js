import IntlMessages from "./IntlMessages";
import React from "react";
import {storage} from "../firebase/firebase";

export function getDate(timestamp) {
    const date = new Date(timestamp);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export function getGender(gender) {
    if (gender === null) {
        return "-"
    }
    return <IntlMessages id={`admin.user.gender.${gender}`}/>
}

export async function getImageURL(path) {
    let result;
    if (path !== null) {
        let promise = new Promise((resolve) => {
            storage
                .ref("images/" + path)
                .getMetadata()
                .then((Response) => {
                    if (Response.contentType === "image/png") {
                        resolve("https://firebasestorage.googleapis.com/v0/b/englishcenter-2021.appspot.com/o/images%2F" + path + "?alt=media&token=" + Response.md5Hash);
                    } else {
                        resolve("");
                    }
                })
                .catch((error) => {
                    resolve("");
                })
        });
        result = await promise;
    } else {
        result = "";
    }
    return result + "";
}
