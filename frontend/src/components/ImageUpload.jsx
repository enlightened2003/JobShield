import { useState } from "react";

function ImageUpload({ onUpload }) {

    const [image, setImage] = useState(null);

    return (

        <div className="mt-10">

            <h2 className="text-xl font-bold mb-4">
                Upload Job Poster
            </h2>

            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setImage(e.target.files[0]);
                }}
            />

            <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg block"
                onClick={() => {
                    if (image) {
                        onUpload(image);
                    } else {
                        alert("Please choose an image.");
                    }
                }}
            >
                Analyze Image
            </button>

        </div>

    );

}

export default ImageUpload;