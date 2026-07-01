import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageUpload({ onUpload, loading }) {

    const [image, setImage] = useState(null);

    const inputRef = useRef();

    const handleFile = (file) => {

        if (!file) return;

        // Allow only image files
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            return;
        }

        setImage(file);

        toast.success("Image selected successfully!");

    };

    const handleAnalyze = () => {

        if (!image) {
            toast.warning("Please choose an image first.");
            return;
        }

        onUpload(image);

    };

    return (

        <div className="mt-10">

            <h2 className="text-xl font-bold mb-5">
                Upload Job Poster
            </h2>

            <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleFile(e.dataTransfer.files[0]);
                }}
                className="border-2 border-dashed border-blue-400 rounded-xl p-10 text-center cursor-pointer hover:bg-blue-50 transition duration-300"
            >

                <FaCloudUploadAlt
                    size={60}
                    className="mx-auto text-blue-500 mb-4"
                />

                <h3 className="text-xl font-semibold">
                    Drag & Drop Image Here
                </h3>

                <p className="text-gray-500 mt-2">
                    or click to browse
                </p>

                <p className="text-sm text-gray-400 mt-2">
                    Supported: JPG • JPEG • PNG
                </p>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        handleFile(e.target.files[0])
                    }
                />

            </div>

            {image && (

                <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4">

                    <p className="font-semibold text-green-700">
                        ✅ Selected Image
                    </p>

                    <p className="text-gray-700 mt-1">
                        {image.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {(image.size / 1024).toFixed(1)} KB
                    </p>

                </div>

            )}

            <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`mt-6 px-8 py-3 rounded-lg text-white font-semibold transition ${
                    loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                }`}
            >
                {loading ? "Analyzing..." : "Analyze Image"}
            </button>

        </div>

    );

}

export default ImageUpload;