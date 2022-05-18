import React, {useRef, useState} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const imgUpload = useRef(null);

    return (
        <div>

            <div>
                {selectedImage && (
                    <div onClick={() => imgUpload.current.click()}>
                    <img className="circular-profile" alt="image not found" src={URL.createObjectURL(selectedImage)} />
                    </div>
                )}
            </div>

        <br />
            <div><i className="fa fa-plus" aria-hidden="true"/></div>

        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <label htmlFor="imgInput" className="create-button">
                Add Profile Photo
            </label>
            <input
                id="imgInput"
                type="file"
                name="dogImage"
                onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
                    }
                }
                ref={imgUpload}
                style = {{
                    display: "none"
                }}
            />
            </div>
        </div>
    );
};

export default UploadImage;