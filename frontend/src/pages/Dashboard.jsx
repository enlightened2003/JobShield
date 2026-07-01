import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import RiskChart from "../components/RiskChart";
import RecentAnalyses from "../components/RecentAnalyses";

import {
    getDashboardStats,
    getRecentAnalyses
} from "../services/jobService";

function Dashboard() {

    const [stats, setStats] = useState({
        total_analyses: 0,
        high_risk: 0,
        medium_risk: 0,
        low_risk: 0,
    });

    const [recentAnalyses, setRecentAnalyses] = useState([]);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const statsData = await getDashboardStats();
                setStats(statsData);

                const historyData = await getRecentAnalyses();
                setRecentAnalyses(historyData);

            } catch (error) {

                console.error("Dashboard Error:", error);

            }

        };

        fetchDashboardData();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    {/* Welcome Section */}

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg">

                        <h1 className="text-3xl font-bold">
                            👋 Welcome to JobShield
                        </h1>

                        <p className="mt-3 text-blue-100">
                            Protect yourself from fraudulent job offers using AI-powered job scam detection.
                        </p>

                    </div>

                    {/* Statistics */}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

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

                    {/* Charts */}

                    <div className="mt-10">

                        <RiskChart
                            stats={stats}
                        />

                    </div>

                    {/* Recent Analyses */}

                    <div className="mt-10">

                        <RecentAnalyses
                            analyses={recentAnalyses}
                        />

                    </div>

                    {/* Quick Actions */}

                    <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

                        <h2 className="text-2xl font-bold mb-6">
                            🚀 Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-4">

                            <Link
                                to="/analyze"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                            >
                                Analyze Job
                            </Link>

                            <Link
                                to="/history"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
                            >
                                View History
                            </Link>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

}

export default Dashboard;