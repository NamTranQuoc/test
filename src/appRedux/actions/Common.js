import {
    CLEAR_ITEMS,
    HIDE_MESSAGE, HIDE_MODAL,
    INIT_URL,
    ON_HIDE_LOADER,
    ON_SHOW_LOADER,
    SHOW_MESSAGE, SHOW_MODAL, UPLOAD_IMAGE,
} from "../../constants/ActionTypes";

export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        payload: message
    }
};

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    }
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const showLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};

export const hideLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS,
    }
}

export const uploadImage = (image, path) => {
    return {
        type: UPLOAD_IMAGE,
        payload: {
            image: image,
            path: path
        }
    }
}

export const onShowModal = () => {
    return {
        type: SHOW_MODAL
    }
}

export const onHideModal = () => {
    return {
        type: HIDE_MODAL
    }
}





