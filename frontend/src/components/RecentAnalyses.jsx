import RecentAnalysis from "./RecentAnalysis";
import { FaHistory } from "react-icons/fa";

function RecentAnalyses({ analyses }) {
    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                border
                border-gray-100
                p-6
            "
        >
            {/* Header */}

            <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg">

                    <FaHistory size={22} />

                </div>

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Recent Analyses
                    </h2>

                    <p className="text-gray-500 text-sm">
                        Latest job scam detection reports
                    </p>

                </div>

            </div>

            {analyses.length === 0 ? (

                <div className="text-center py-16">

                    <h3 className="text-xl font-semibold text-gray-700">
                        No analyses yet
                    </h3>

                    <p className="text-gray-500 mt-2">
                        Start analyzing jobs to see your history here.
                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {analyses.map((item) => (

                        <RecentAnalysis
                            key={item.id}
                            item={item}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default RecentAnalyses;