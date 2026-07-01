function RecentAnalysis({ item }) {

    const getRiskColor = (level) => {

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

        <div className="flex justify-between items-center border-b py-4">

            <div>

                <h3 className="font-semibold">
                    {item.job_description.length > 40
                        ? item.job_description.substring(0, 40) + "..."
                        : item.job_description}
                </h3>

                <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                </p>

            </div>

            <div
                className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(item.risk_level)}`}
            >
                {item.risk_level}
            </div>

        </div>

    );

}

export default RecentAnalysis;