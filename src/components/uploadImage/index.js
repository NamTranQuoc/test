import React from 'react';
import './index.css';
import {Upload} from 'antd';
import {createNotification} from "../Notification";

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        createNotification("type_deny");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        createNotification("size_deny");
    }
    return isJpgOrPng && isLt2M;
}

const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

function Image(props) {
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={(file) => {
                let reader = new FileReader();
                props.setImage(file);
                reader.onloadend = () => {
                    props.setUrl(reader.result.toString());
                };
                reader.readAsDataURL(file);
            }}
            beforeUpload={beforeUpload}
            customRequest={dummyRequest}
            disabled={props.disabled}>
            {props.url != null ? <img src={props.url} alt="avatar" style={{width: '95%'}}/> : "Upload"}
        </Upload>
    );
}


export default Image;
