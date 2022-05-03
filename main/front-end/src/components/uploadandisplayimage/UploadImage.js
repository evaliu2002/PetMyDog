import React, {useState} from "react";

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            <div>
                {selectedImage && (
                    <div>
                    <img className="circular-profile" alt="image not found" src={URL.createObjectURL(selectedImage)} />
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                    </div>
                )}

            </div>

        <br />
        <input
            type="file"
            name="myImage"
            className="circular-profile"
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