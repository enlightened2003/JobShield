function AnalysisModal({ analysis, onClose }) {

    if (!analysis) return null;

    const getBadgeColor = (level) => {
        switch (level) {
            case "HIGH":
                return "bg-red-100 text-red-700";
            case "MEDIUM":
                return "bg-yellow-100 text-yellow-700";
            default:
                return "bg-green-100 text-green-700";
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Analysis Details
                </h2>

                <div className="space-y-6">

                    <div>
                        <h3 className="font-semibold mb-2">
                            Job Description
                        </h3>

                        <div className="bg-gray-100 rounded-lg p-4 max-h-48 overflow-y-auto">
                            {analysis.job_description}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <p className="text-gray-500">
                                Risk Score
                            </p>

                            <p className="text-3xl font-bold">
                                {analysis.risk_score}
                            </p>
                        </div>

                        <div>
                            <p className="text-gray-500">
                                Risk Level
                            </p>

                            <span className={`px-4 py-2 rounded-full font-semibold ${getBadgeColor(analysis.risk_level)}`}>
                                {analysis.risk_level}
                            </span>
                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-2">
                            Red Flags
                        </h3>

                        <div className="bg-gray-100 rounded-lg p-4">
                            {analysis.red_flags || "No red flags detected."}
                        </div>

                    </div>

                </div>

                <div className="mt-8 text-right">

                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AnalysisModal;