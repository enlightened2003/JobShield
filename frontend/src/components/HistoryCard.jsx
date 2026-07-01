import { FaTrash, FaEye } from "react-icons/fa";

function HistoryCard({ item, onDelete }) {

    const getBadge = (level) => {

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

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-lg font-semibold">

                        {item.job_description.length > 70
                            ? item.job_description.substring(0, 70) + "..."
                            : item.job_description}

                    </h2>

                    <p className="text-gray-500 mt-2">

                        {new Date(item.created_at).toLocaleString()}

                    </p>

                </div>

                <span
                    className={`px-4 py-2 rounded-full font-semibold ${getBadge(item.risk_level)}`}
                >
                    {item.risk_level}
                </span>

            </div>

            <div className="mt-5 flex justify-between items-center">

                <div>

                    <p className="text-gray-500">
                        Risk Score
                    </p>

                    <p className="text-2xl font-bold">

                        {item.risk_score}

                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                        <FaEye />
                        View
                    </button>

                    <button
                        onClick={() => onDelete(item.id)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                        <FaTrash />
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default HistoryCard;