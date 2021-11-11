import React from "react";
import {NotificationManager} from "react-notifications";
import IntlMessages from "../../util/IntlMessages";

const errors = {
    param_not_null: {
        message: <IntlMessages id="notification.param_not_null"/>,
        type: "warning",
    },
    member_not_exist: {
        message: <IntlMessages id="notification.member_not_exist"/>,
        type: "info",
    },
    password_incorrect: {
        message: <IntlMessages id="notification.password_incorrect"/>,
        type: "info",
    },
    member_exist: {
        message: <IntlMessages id="notification.member_exist"/>,
        type: "info",
    },
    member_type_deny: {
        message: <IntlMessages id="notification.member_type_deny"/>,
        type: "error",
    },
    success_add: {
        message: <IntlMessages id="notification.success_add"/>,
        type: "success",
    },
    success_update: {
        message: <IntlMessages id="notification.success_update"/>,
        type: "success",
    },
    type_deny: {
        message: <IntlMessages id="notification.type_deny"/>,
        type: "error",
    },
    size_deny: {
        message: <IntlMessages id="notification.size_deny"/>,
        type: "error",
    },
};

export function createNotification(message) {
    try {
        if (!errors.hasOwnProperty(message)) {
            return NotificationManager.error(message);
        } else {
            switch (errors[message].type) {
                case "info":
                    return NotificationManager.info(errors[message].message);
                case "success":
                    return NotificationManager.success(errors[message].message);
                case "warning":
                    return NotificationManager.warning(errors[message].message);
                case "error":
                    return NotificationManager.error(errors[message].message);
                default:
                    return NotificationManager.error(errors[message].message);
            }
        }
    } catch (e) {
        return NotificationManager.error(e);
    }
}
