import { useState } from "react";
import { toast } from "react-toastify";

import { analyzeJob } from "../services/jobService";
import { generateTextPDF } from "../utils/pdfGenerator";

function TextAnalyzer() {
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
            setResult(null);

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

    const copyResult = () => {
        navigator.clipboard.writeText(`
JobShield Analysis

Risk Score: ${result.risk_score}%

Risk Level: ${result.risk_level}

Red Flags:
${result.red_flags.join("\n")}
        `);

        toast.success("Copied to clipboard.");
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-8">

            <h2 className="text-2xl font-bold mb-6">
                📝 Analyze Job Description
            </h2>

            <textarea
                rows={10}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border rounded-lg p-4"
                placeholder="Paste the complete job description..."
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

            {result && (
                <div className="mt-8 border-t pt-8">

                    <h2 className="text-2xl font-bold">
                        Analysis Result
                    </h2>

                    <div className="mt-6 grid md:grid-cols-2 gap-6">

                        <div className="bg-blue-600 text-white rounded-xl p-6">

                            <h3>Risk Score</h3>

                            <p className="text-5xl font-bold mt-3">
                                {result.risk_score}%
                            </p>

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

                            <h3>Risk Level</h3>

                            <p className="text-4xl font-bold mt-3">
                                {result.risk_level}
                            </p>

                        </div>

                    </div>

                    <h3 className="text-xl font-bold mt-8 mb-4">
                        Detected Red Flags
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
                                No suspicious red flags detected.
                            </div>
                        )}

                    </div>

                    <div className="mt-8 flex gap-4 flex-wrap justify-end">

                        <button
                            onClick={copyResult}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            Copy Result
                        </button>

                        <button
                            onClick={() =>
                                generateTextPDF(result, jobDescription)
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                        >
                            Download Text Report
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default TextAnalyzer;