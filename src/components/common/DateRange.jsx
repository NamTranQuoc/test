import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from "react";

const { RangePicker } = DatePicker;

function DateRange(props) {
    const [style, setStyle] = useState("130px");

    function onChange(dates) {
        props.setDates(dates);
        if (dates !== null) {
            setStyle("330px");
        } else {
            setStyle("130px");
        }
    }

    return (
        <div>
            <RangePicker
                placeholder={["Từ", "Đến"]}
                showTime
                bordered={false}
                style={{width: style}}
                onChange={onChange}
            />
        </div>
    );
}

export default DateRange;