import React from "react";
import image from "../../assets/images/loader.svg"
import {useSelector} from "react-redux";

const CircularProgress = () => {
    const {loading} = useSelector(({common}) => common);
    if (loading) {
        return (
            <div style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                zIndex: "99999"
            }}>
                <img height={100} width={100} src={image} alt="loader"/>
            </div>
        );
    }
    return null;
}

export default CircularProgress;
