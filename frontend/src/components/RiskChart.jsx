import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import {
    FaChartPie,
    FaArrowTrendUp,
} from "react-icons/fa6";

const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444",
];

function RiskChart({ stats }) {

    const data = [
        {
            name: "Low Risk",
            value: stats.low_risk,
        },
        {
            name: "Medium Risk",
            value: stats.medium_risk,
        },
        {
            name: "High Risk",
            value: stats.high_risk,
        },
    ];

    const total =
        stats.low_risk +
        stats.medium_risk +
        stats.high_risk;

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

            <div className="flex items-center justify-between mb-6">

                <div>

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">

                            <FaChartPie size={22} />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">

                                Risk Distribution

                            </h2>

                            <p className="text-gray-500 text-sm">

                                Overview of analyzed jobs

                            </p>

                        </div>

                    </div>

                </div>

                <div className="hidden md:flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">

                    <FaArrowTrendUp className="text-blue-600" />

                    <span className="font-semibold text-blue-700">

                        {total} Jobs

                    </span>

                </div>

            </div>

            {/* Chart */}

            <ResponsiveContainer
                width="100%"
                height={340}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={65}
                        outerRadius={110}
                        paddingAngle={5}
                        label
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />

                        ))}

                    </Pie>

                    <Tooltip />

                    <Legend
                        verticalAlign="bottom"
                        height={36}
                    />

                </PieChart>

            </ResponsiveContainer>

            {/* Summary */}

            <div className="grid grid-cols-3 gap-4 mt-6">

                <div className="bg-green-50 rounded-2xl p-4 text-center">

                    <p className="text-green-600 font-semibold">

                        Low

                    </p>

                    <h3 className="text-2xl font-bold">

                        {stats.low_risk}

                    </h3>

                </div>

                <div className="bg-yellow-50 rounded-2xl p-4 text-center">

                    <p className="text-yellow-600 font-semibold">

                        Medium

                    </p>

                    <h3 className="text-2xl font-bold">

                        {stats.medium_risk}

                    </h3>

                </div>

                <div className="bg-red-50 rounded-2xl p-4 text-center">

                    <p className="text-red-600 font-semibold">

                        High

                    </p>

                    <h3 className="text-2xl font-bold">

                        {stats.high_risk}

                    </h3>

                </div>

            </div>

        </div>

    );

}

export default RiskChart;