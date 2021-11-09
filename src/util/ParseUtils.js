import IntlMessages from "./IntlMessages";
import React from "react";

export function getDate(timestamp) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(timestamp)
}

export function getGender(gender) {
    if (gender === null) {
        return "-"
    }
    return <IntlMessages id={`admin.user.gender.${gender}`}/>
}