import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import RecentAnalysis from "../components/RecentAnalysis";

import {
    getDashboardStats,
    getRecentHistory
} from "../services/jobService";

function Dashboard() {

    const [stats, setStats] = useState({
        total_analyses: 0,
        high_risk: 0,
        medium_risk: 0,
        low_risk: 0,
    });

    const [recentHistory, setRecentHistory] = useState([]);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const statsData = await getDashboardStats();

                const historyData = await getRecentHistory();

                setStats(statsData);

                setRecentHistory(historyData);

            } catch (error) {

                console.error(error);

            }

        };

        fetchDashboard();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    {/* Welcome */}

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg mb-8">

                        <h1 className="text-3xl font-bold">
                            Welcome to JobShield 👋
                        </h1>

                        <p className="mt-3 text-blue-100">
                            Analyze job descriptions and recruitment posters
                            to detect scams before applying.
                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <StatsCard
                            title="Total Analyses"
                            value={stats.total_analyses}
                        />

                        <StatsCard
                            title="High Risk"
                            value={stats.high_risk}
                        />

                        <StatsCard
                            title="Medium Risk"
                            value={stats.medium_risk}
                        />

                        <StatsCard
                            title="Low Risk"
                            value={stats.low_risk}
                        />

                    </div>

                    {/* Quick Actions */}

                    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

                        <h2 className="text-2xl font-bold mb-5">
                            🚀 Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-4">

                            <Link
                                to="/analyze"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Analyze Job
                            </Link>

                            <Link
                                to="/history"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                            >
                                View History
                            </Link>

                        </div>

                    </div>

                    {/* Recent Analysis */}

                    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-2xl font-bold">
                                📈 Recent Analyses
                            </h2>

                            <Link
                                to="/history"
                                className="text-blue-600 hover:underline"
                            >
                                View All
                            </Link>

                        </div>

                        {recentHistory.length > 0 ? (

                            recentHistory.map((item) => (

                                <RecentAnalysis
                                    key={item.id}
                                    item={item}
                                />

                            ))

                        ) : (

                            <p className="text-gray-500">
                                No analyses found.
                            </p>

                        )}

                    </div>

                </main>

            </div>

        </div>

    );

}

export default Dashboard;