import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
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

        <DashboardLayout>

            {/* Welcome Section */}

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 shadow-lg">

                <h1 className="text-2xl md:text-3xl font-bold">
                    👋 Welcome to JobShield
                </h1>

                <p className="mt-3 text-blue-100 text-sm md:text-base">
                    Protect yourself from fraudulent job offers using AI-powered job scam detection.
                </p>

            </div>

            {/* Statistics */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

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

            {/* Risk Chart */}

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

                <h2 className="text-xl md:text-2xl font-bold mb-6">
                    🚀 Quick Actions
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">

                    <Link
                        to="/analyze"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition text-center"
                    >
                        Analyze Job
                    </Link>

                    <Link
                        to="/history"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition text-center"
                    >
                        View History
                    </Link>

                </div>

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;