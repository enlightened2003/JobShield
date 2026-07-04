import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    FaArrowRight,
    FaSearch,
    FaHistory,
    FaShieldAlt,
} from "react-icons/fa";

import DashboardLayout from "../layouts/DashboardLayout";
import StatsCard from "../components/StatsCard";
import RiskChart from "../components/RiskChart";
import RecentAnalyses from "../components/RecentAnalyses";

import {
    getDashboardStats,
    getRecentAnalyses,
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

                console.error(error);

            }

        };

        fetchDashboardData();

    }, []);

    return (

        <DashboardLayout>

            {/* Hero */}

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 md:p-10 shadow-xl">

                <div className="absolute right-0 top-0 opacity-10 text-[180px] hidden lg:block">

                    <FaShieldAlt />

                </div>

                <div className="relative z-10">

                    <h1 className="text-3xl md:text-5xl font-bold">

                        Welcome to JobShield

                    </h1>

                    <p className="mt-4 text-blue-100 text-lg max-w-2xl">

                        Protect yourself from fraudulent job offers using AI-powered
                        scam detection, OCR analysis and intelligent risk scoring.

                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            to="/analyze"
                            className="flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
                        >
                            Analyze Job

                            <FaArrowRight />

                        </Link>

                        <Link
                            to="/history"
                            className="flex items-center gap-2 border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
                        >
                            View History

                            <FaHistory />

                        </Link>

                    </div>

                </div>

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

            {/* Chart + Quick Actions */}

            <div className="grid xl:grid-cols-3 gap-8 mt-10">

                <div className="xl:col-span-2">

                    <RiskChart
                        stats={stats}
                    />

                </div>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        shadow-lg
                        border
                        border-gray-100
                        p-6
                    "
                >

                    <h2 className="text-2xl font-bold">

                        Quick Actions

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Start analyzing jobs instantly.

                    </p>

                    <div className="space-y-4 mt-8">

                        <Link
                            to="/analyze"
                            className="
                                flex
                                items-center
                                justify-between
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                rounded-2xl
                                p-5
                                transition
                            "
                        >

                            <div className="flex items-center gap-4">

                                <FaSearch size={22} />

                                <span className="font-semibold">

                                    Analyze New Job

                                </span>

                            </div>

                            <FaArrowRight />

                        </Link>

                        <Link
                            to="/history"
                            className="
                                flex
                                items-center
                                justify-between
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                rounded-2xl
                                p-5
                                transition
                            "
                        >

                            <div className="flex items-center gap-4">

                                <FaHistory size={22} />

                                <span className="font-semibold">

                                    View History

                                </span>

                            </div>

                            <FaArrowRight />

                        </Link>

                    </div>

                </div>

            </div>

            {/* Recent */}

            <div className="mt-10">

                <RecentAnalyses
                    analyses={recentAnalyses}
                />

            </div>

        </DashboardLayout>

    );

}

export default Dashboard;