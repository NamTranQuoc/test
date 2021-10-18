import React, {useState} from "react";
import {addMember, updateMember} from "../../service/MemberService";
import {showNotification} from "../common/NotifyCation";
import ImageUpload from "../common/ImageUpload";
import {storage} from "../common/firebase/Config";
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import {getTimestamp, timeNow} from "../common/Utils";
import moment from "moment";

const dateFormatList = "DD/MM/YYYY";

function AddEditStudent(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState(moment(props.student.dob != null ? props.student.dob : timeNow()));
    const [phone_number, setPhone_number] = useState("");
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(props.url_avatar);

    function onSubmit(e) {
        if (props.student._id === -1) {
            addMember(name, email, password, address, gender, getTimestamp(dob), phone_number).then((Response) => {
                if (Response.data.code !== -9999) {
                    handleUpload("avatar-" + Response.data.payload._id);
                    showNotification("success_add");
                    props.close_modal();
                    props.reload();
                } else {
                    showNotification(Response.data.message);
                }
            });
        } else {
            updateMember(props.student._id, name).then(
                (Response) => {
                    if (Response.data.code !== -9999) {
                        handleUpload("avatar-" + props.student._id);
                        showNotification("success_update");
                        props.close_modal();
                        props.reload();
                    } else {
                        showNotification(Response.data.message);
                    }
                }
            );
        }
    }

    function handleUpload(name) {
        console.log(image);
        storage.ref(`images/${name}.png`).put(image);
    }

    function handleImageChange(e) {
        if (e.target.files.length > 0) {
            let reader = new FileReader();
            let file = e.target.files[0];
            setImage(file);
            reader.onloadend = () => {
                setUrl(reader.result.toString());
            };

            reader.readAsDataURL(file);
        }
    }

    function onChangeGender(e) {
        setGender(e.target.value);
    }

    function onChangeDob(date) {
        console.log(date);
        setDob(date);
    }
console.log(timeNow());
    return (
        <div hidden={!props.show_add} className="custom-css-001">
            <div
                className="custom-css-002"
                onClick={() => props.close_modal()}
            />
            <div className="modal-content custom-css-003">
                {/*<form className="needs-validation" noValidate>*/}
                <div className="modal-header">
                    <h4>Thông tin học viên</h4>
                    <button
                        className="btn btn-link"
                        onClick={() => props.close_modal()}
                    >
                        <i className="fas fa-times"/>
                    </button>
                </div>
                <div className="modal-body custom-css-004">
                    <div className="form-group"/>
                    <div className="form-group">
                        <ImageUpload url={url} handleImageChange={handleImageChange}/>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Họ và tên</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                                required
                                value={
                                    name === ""
                                        ? props.student.name
                                        : name
                                }
                            />
                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                        <div className="form-group col-6">
                            <label>Giới tính</label>
                            <select className="custom-select" onChange={onChangeGender} defaultValue={gender}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="different">Khác</option>
                            </select>

                            <div className="invalid-feedback">What's your name?</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Số điện thoại</label>
                            <input
                                id="phone_number"
                                type="phone"
                                className="form-control"
                                onChange={(event) => {
                                    setPhone_number(event.target.value)
                                }}
                                required
                                value={
                                    phone_number === ""
                                        ? props.student.phone_number
                                        : phone_number
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                        <div
                            className="form-group col-6"
                        >
                            <label>Ngày sinh</label>
                            <div className="form-control">
                                <DatePicker
                                    onChange={onChangeDob}
                                    defaultValue={dob}
                                    bordered={false}
                                    style={{padding: 0, width: "inherit"}}
                                    format={dateFormatList}/>
                            </div>
                            <div className="valid-feedback">Good job!</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label>Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                                required
                                value={
                                    email === ""
                                        ? props.student.email
                                        : email
                                }
                            />
                            <div className="invalid-feedback">Oh no! Email is invalid.</div>
                        </div>
                        <div
                            className="form-group  col-6"
                            hidden={props.student._id !== -1}
                        >
                            <label>Mật khẩu</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                onChange={(event) => {
                                    setPassword(event.target.value)
                                }}
                                required
                                value={password}
                            />
                            <div className="valid-feedback">Good job!</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <textarea
                            className="form-control"
                            style={{height: "100px"}}
                            onChange={(event) => {
                                setAddress(event.target.value)
                            }}
                            required
                            value={
                                address === ""
                                    ? props.student.address
                                    : address
                            }
                        />
                    </div>
                </div>
                <div className="modal-footer text-right">
                    <button className="btn btn-primary" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>
            {/*</form>*/}
        </div>
    );
}

AddEditStudent.defaultProps = {
    show_add: false,
    student: {
        name: "",
        email: "",
        avatar: null,
        dob: timeNow(),
        gender: "male",
        address: "",
        phone_number: "",
    },
};

export default AddEditStudent;
