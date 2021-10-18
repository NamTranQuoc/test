import React from "react";

function UpDownButton(props) {
    return (
        <div className="d-flex flex-row">
            <div>{props.col_name}</div>
            <div className="custom-css-005">
                <img
                    alt="up"
                    width="10px"
                    height="10px"
                    src="https://training.omicrm.dev/_next/static/chunks/media/images/ic_sort_up_g.2a19aab73031112.png"
                    style={{
                        opacity:
                            props.asc &&
                            props.select_field === props.col_name
                                ? 1
                                : 0.3,
                    }}
                />
                <img
                    alt="down"
                    width="10px"
                    height="10px"
                    src="https://training.omicrm.dev/_next/static/chunks/media/images/ic_sort_down_g.69973dc0eebd94f.png"
                    style={{
                        opacity:
                            !props.asc &&
                            props.select_field === props.col_name
                                ? 1
                                : 0.3,
                    }}
                />
            </div>
        </div>
    );
}

export default UpDownButton;
