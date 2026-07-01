import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";

import {
    analyzeJob,
    analyzeImage
} from "../services/jobService";

function AnalyzeJob() {

    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!jobDescription.trim()) {
            alert("Please enter a job description.");
            return;
        }

        try {

            setLoading(true);

            const response = await analyzeJob(
                jobDescription
            );

            setResult(response);

        } catch (error) {

            console.error(error);

            alert("Analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    const handleImageUpload = async (image) => {

        try {

            setLoading(true);

            const response = await analyzeImage(image);

            setResult(response);

        } catch (error) {

            console.error(error);

            alert("Image analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        Analyze Job
                    </h1>

                    <div className="bg-white rounded-xl shadow-md p-8">

                        <h2 className="text-xl font-semibold mb-4">
                            Paste Job Description
                        </h2>

                        <textarea
                            rows="10"
                            value={jobDescription}
                            onChange={(e) =>
                                setJobDescription(e.target.value)
                            }
                            className="w-full border rounded-lg p-4"
                            placeholder="Paste the complete job description here..."
                        />

                        <button
                            onClick={handleAnalyze}
                            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                        >
                            Analyze Job
                        </button>

                        <hr className="my-8" />

                        <ImageUpload
                            onUpload={handleImageUpload}
                        />

                    </div>

                    {loading && (

                        <div className="mt-8 text-lg font-semibold">
                            Analyzing...
                        </div>

                    )}

                    {result && (

                        <div className="bg-white rounded-xl shadow-md p-8 mt-8">

                            <h2 className="text-2xl font-bold mb-6">
                                Analysis Result
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                                <div className="bg-blue-50 rounded-xl p-6">

                                    <h3 className="text-gray-500">
                                        Risk Score
                                    </h3>

                                    <p className="text-5xl font-bold text-blue-600 mt-3">
                                        {result.risk_score}
                                    </p>

                                </div>

                                <div className="bg-red-50 rounded-xl p-6">

                                    <h3 className="text-gray-500">
                                        Risk Level
                                    </h3>

                                    <p className="text-4xl font-bold text-red-600 mt-3">
                                        {result.risk_level}
                                    </p>

                                </div>

                            </div>

                            <h3 className="text-xl font-bold mb-4">
                                Red Flags
                            </h3>

                            <div className="space-y-3">

                                {result.red_flags.length > 0 ? (
                                    result.red_flags.map((flag, index) => (
                                        <div
                                            key={index}
                                            className="bg-red-100 border-l-4 border-red-600 rounded-lg p-4"
                                        >
                                            ⚠ {flag}
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-green-100 border-l-4 border-green-600 rounded-lg p-4">
                                        ✅ No suspicious red flags detected.
                                    </div>
                                )}

                            </div>

                        </div>

                    )}

                </main>

            </div>

        </div>

    );
}

export default AnalyzeJob;