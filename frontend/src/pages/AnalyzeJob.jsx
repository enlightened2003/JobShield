import { useState } from "react";
import { toast } from "react-toastify";
import { generatePDF } from "../utils/pdfGenerator";

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
            toast.warning("Please enter a job description.");
            return;
        }

        try {

            setLoading(true);

            const response = await analyzeJob(jobDescription);

            setResult(response);

            toast.success("Analysis completed successfully!");

        } catch (error) {

            console.error(error);

            toast.error("Analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    const handleImageUpload = async (image) => {

        try {

            setLoading(true);

            const response = await analyzeImage(image);

            setResult(response);

            toast.success("Image analyzed successfully!");

        } catch (error) {

            console.error(error);

            toast.error("Image analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    const copyResult = () => {

        navigator.clipboard.writeText(
            `JobShield Analysis

Risk Score: ${result.risk_score}%

Risk Level: ${result.risk_level}

Red Flags:
${result.red_flags.join("\n")}`
        );

        toast.success("Analysis copied to clipboard!");

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
                            disabled={loading}
                            className={`mt-6 px-8 py-3 rounded-lg text-white transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Analyzing..." : "Analyze Job"}
                        </button>

                        <hr className="my-8" />

                        <ImageUpload
                            onUpload={handleImageUpload}
                            loading={loading}
                        />

                    </div>

                    {loading && (

                        <div className="bg-white rounded-xl shadow-md p-8 mt-8">

                            <div className="flex flex-col items-center">

                                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>

                                <h2 className="text-2xl font-bold mt-6">
                                    Analyzing Job...
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Please wait while JobShield analyzes the job posting.
                                </p>

                            </div>

                        </div>

                    )}

                    {result && (

                        <div className="bg-white rounded-xl shadow-md p-8 mt-8">

                            <h2 className="text-3xl font-bold">
                                🛡️ Analysis Complete
                            </h2>

                            <p className="text-gray-500 mt-2 mb-8">
                                JobShield has completed analyzing the job posting.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">

                                    <h3 className="text-lg">
                                        Risk Score
                                    </h3>

                                    <p className="text-6xl font-extrabold mt-3">
                                        {result.risk_score}%
                                    </p>

                                    <div className="w-full bg-white/30 rounded-full h-3 mt-6">

                                        <div
                                            className="bg-white h-3 rounded-full"
                                            style={{
                                                width: `${result.risk_score}%`
                                            }}
                                        />

                                    </div>

                                </div>

                                <div
                                    className={`rounded-xl p-6 text-white ${
                                        result.risk_level === "HIGH"
                                            ? "bg-red-600"
                                            : result.risk_level === "MEDIUM"
                                            ? "bg-yellow-500"
                                            : "bg-green-600"
                                    }`}
                                >

                                    <h3 className="text-lg">
                                        Risk Level
                                    </h3>

                                    <p className="text-5xl font-bold mt-3">
                                        {result.risk_level}
                                    </p>

                                </div>

                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                ⚠ Detected Red Flags
                            </h3>

                            <div className="space-y-3">

                                {result.red_flags.length > 0 ? (

                                    result.red_flags.map((flag, index) => (

                                        <div
                                            key={index}
                                            className="bg-red-100 border-l-4 border-red-600 rounded-lg p-4"
                                        >
                                            ✔ {flag}
                                        </div>

                                    ))

                                ) : (

                                    <div className="bg-green-100 border-l-4 border-green-600 rounded-lg p-4">
                                        ✅ No suspicious red flags detected.
                                    </div>

                                )}

                            </div>

                            <div className="mt-8 flex flex-wrap justify-end gap-4">

                                <button
                                    onClick={copyResult}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                                >
                                    📋 Copy Result
                                </button>

                                <button
                                    onClick={() =>
                                        generatePDF(result, jobDescription)
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                                >
                                    📄 Download Report
                                </button>

                            </div>

                        </div>

                    )}

                </main>

            </div>

        </div>

    );

}

export default AnalyzeJob;