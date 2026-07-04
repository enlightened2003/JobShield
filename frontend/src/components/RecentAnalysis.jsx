import {
    FaCalendarAlt,
    FaShieldAlt,
    FaExclamationTriangle,
    FaCheckCircle,
} from "react-icons/fa";

function RecentAnalysis({ item }) {

    const getRiskData = (level) => {

        switch (level) {

            case "HIGH":
                return {
                    color: "bg-red-100 text-red-700 border border-red-200",
                    icon: <FaExclamationTriangle />
                };

            case "MEDIUM":
                return {
                    color: "bg-yellow-100 text-yellow-700 border border-yellow-200",
                    icon: <FaShieldAlt />
                };

            default:
                return {
                    color: "bg-green-100 text-green-700 border border-green-200",
                    icon: <FaCheckCircle />
                };

        }

    };

    const risk = getRiskData(item.risk_level);

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                p-5
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
            "
        >

            <div className="flex-1">

                <h3 className="font-semibold text-gray-800 text-lg">

                    {item.job_description.length > 70
                        ? item.job_description.substring(0, 70) + "..."
                        : item.job_description}

                </h3>

                <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">

                    <FaCalendarAlt />

                    <span>

                        {new Date(item.created_at).toLocaleString()}

                    </span>

                </div>

            </div>

            <div
                className={`
                    flex
                    items-center
                    gap-2
                    px-5
                    py-3
                    rounded-full
                    font-semibold
                    ${risk.color}
                `}
            >

                {risk.icon}

                {item.risk_level}

            </div>

        </div>

    );

}

export default RecentAnalysis;