import {
    FaClipboardList,
    FaExclamationTriangle,
    FaShieldAlt,
    FaCheckCircle,
} from "react-icons/fa";

function StatsCard({ title, value }) {

    const getCardData = () => {

        switch (title) {

            case "Total Analyses":
                return {
                    icon: <FaClipboardList className="text-3xl" />,
                    color: "from-blue-500 to-indigo-600",
                    bg: "bg-blue-50",
                    text: "Total jobs analyzed"
                };

            case "High Risk":
                return {
                    icon: <FaExclamationTriangle className="text-3xl" />,
                    color: "from-red-500 to-red-600",
                    bg: "bg-red-50",
                    text: "Potential scam jobs"
                };

            case "Medium Risk":
                return {
                    icon: <FaShieldAlt className="text-3xl" />,
                    color: "from-yellow-400 to-orange-500",
                    bg: "bg-yellow-50",
                    text: "Needs manual review"
                };

            case "Low Risk":
                return {
                    icon: <FaCheckCircle className="text-3xl" />,
                    color: "from-green-500 to-emerald-600",
                    bg: "bg-green-50",
                    text: "Likely safe jobs"
                };

            default:
                return {
                    icon: <FaClipboardList className="text-3xl" />,
                    color: "from-blue-500 to-indigo-600",
                    bg: "bg-blue-50",
                    text: ""
                };
        }

    };

    const card = getCardData();

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
                p-6
                border
                border-gray-100
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-gray-800">
                        {value}
                    </h2>

                    <p className="text-gray-400 text-sm mt-3">
                        {card.text}
                    </p>

                </div>

                <div
                    className={`
                        w-16
                        h-16
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-white
                        bg-gradient-to-r
                        ${card.color}
                        shadow-lg
                    `}
                >
                    {card.icon}
                </div>

            </div>

        </div>

    );

}

export default StatsCard;