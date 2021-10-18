import React, {useState} from "react";

function CustomInput(props) {
    const [value, setValue] = useState("");

    function handleChange(e) {
        setValue(e.target.value);
    }

    function onKeyPress(e) {
        if (e.charCode === 13) {
            props.onSubmit(value);
        }
    }

    return (
        <input
            className="form-control"
            type="text"
            value={value}
            onChange={handleChange}
            onKeyPress={onKeyPress}
        />
    )
}

export default CustomInput;