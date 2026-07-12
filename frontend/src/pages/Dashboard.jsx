import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { fetchHistory, fetchStats } from "../lib/api";

import DashboardHero from "../components/Dashboard/DashboardHero";
import StatsGrid from "../components/Dashboard/StatsGrid";
import RecentScans from "../components/Dashboard/RecentScans";
import QuickActions from "../components/Dashboard/QuickActions";

import ScanLoader from "../components/ScanLoader";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const [statsRes, historyRes] = await Promise.all([
          fetchStats(),
          fetchHistory({
            page: 1,
            limit: 5,
          }),
        ]);

        if (!cancelled) {
          setStats(statsRes.data);
          setRecent(historyRes.data);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <ScanLoader label="Loading dashboard..." />;
  }

  const chartData = [
    {
      name: "High",
      value: stats?.high_risk ?? 0,
      color: "#ef4444",
    },
    {
      name: "Medium",
      value: stats?.medium_risk ?? 0,
      color: "#f59e0b",
    },
    {
      name: "Safe",
      value: stats?.low_risk ?? 0,
      color: "#10b981",
    },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-8">

      <DashboardHero />

      <StatsGrid stats={stats} />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">

        {/* Risk Chart */}

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-white">
              Risk Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Overview of analyzed job postings.
            </p>

          </div>

          {chartData.length === 0 ? (
            <div className="flex h-72 items-center justify-center text-slate-500">
              No analysis available.
            </div>
          ) : (
            <div className="h-72">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {chartData.map((item) => (
                      <Cell
                        key={item.name}
                        fill={item.color}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>
          )}

        </section>

        <RecentScans recent={recent} />

      </div>

      <QuickActions />

    </div>
  );
}