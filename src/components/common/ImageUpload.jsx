import React from "react";

function ImageUpload(props) {
    return (
        <div className="text-center">
            <label htmlFor="up-image-0" className="col-4">
                <img
                    id="img-upload-0"
                    alt="avatar"
                    className="img-thumbnail"
                    src={props.url}
                />
            </label>
            <div className="custom-file">
                <input
                    type="file"
                    className="custom-file-input"
                    id="up-image-0"
                    name="up-image-0"
                    accept="image/*"
                    onChange={props.handleImageChange}
                />
            </div>
        </div>
    );
}

export default ImageUpload;
