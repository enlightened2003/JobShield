import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#22C55E",
    "#F59E0B",
    "#EF4444"
];

function RiskChart({ stats }) {

    const data = [
        {
            name: "Low",
            value: stats.low_risk
        },
        {
            name: "Medium",
            value: stats.medium_risk
        },
        {
            name: "High",
            value: stats.high_risk
        }
    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
                Risk Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
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

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}

export default RiskChart;