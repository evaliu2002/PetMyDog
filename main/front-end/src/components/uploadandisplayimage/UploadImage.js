import React, {useState} from "react";

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    return (
        <div>
            <div>
                {selectedImage && (
                    <div>
                    <img className="circular-profile" alt="image not found" src={URL.createObjectURL(selectedImage)} />
                    </div>
                )}

            </div>

        <br />
            <div><i className="fa fa-plus" aria-hidden="true"></i></div>

        <input
            type="file"
            name="myImage"
            onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
                }
            }
        />
        </div>
    );
};

export default UploadImage;