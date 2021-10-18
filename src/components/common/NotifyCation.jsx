import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {clearToken} from "./Utils";

const errors = {
    param_not_null: {
        vn: "Vui lòng điền đầy đủ dữ liệu!",
        type: "warn",
    },
    member_not_exist: {
        vn: "Người dùng này không tồn tại!",
        type: "info",
    },
    password_incorrect: {
        vn: "Mật khẩu không chính xác!",
        type: "info",
    },
    member_exist: {
        vn: "Người dùng này đã tồn tại!",
        type: "info",
    },
    member_type_deny: {
        vn: "Lỗi xác thực",
        type: "error",
        logout: true,
    },
    success_add: {
        vn: "Thêm thành công",
        type: "success",
    },
    success_update: {
        vn: "Chỉnh sửa thành công",
        type: "success",
    },
};

export function showNotification(message) {
    if (errors[message] === null) {
        toast.error(message);
    } else {
        if (errors[message].logout != null) {
            clearToken();
        }
        switch (errors[message].type) {
            case "info":
                toast.info(errors[message].vn);
                break;
            case "warn":
                toast.warn(errors[message].vn);
                break;
            case "success":
                toast.success(errors[message].vn);
                break;
            default:
                toast.error(errors[message].vn);
        }
    }
}
