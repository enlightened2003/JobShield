function RecentAnalyses({ analyses }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
                Recent Analyses
            </h2>

            {analyses.length === 0 ? (

                <p className="text-gray-500">
                    No analyses available.
                </p>

            ) : (

                analyses.map((item) => (

                    <div
                        key={item.id}
                        className="flex justify-between border-b py-4"
                    >

                        <div>

                            <p className="font-semibold">

                                {item.job_description.substring(0, 40)}...

                            </p>

                            <p className="text-gray-500 text-sm">

                                {new Date(item.created_at).toLocaleDateString()}

                            </p>

                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-white ${
                                item.risk_level === "HIGH"
                                    ? "bg-red-600"
                                    : item.risk_level === "MEDIUM"
                                    ? "bg-yellow-500"
                                    : "bg-green-600"
                            }`}
                        >

                            {item.risk_level}

                        </span>

                    </div>

                ))

            )}

        </div>

    );

}

export default RecentAnalyses;