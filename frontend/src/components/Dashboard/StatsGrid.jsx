import {
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import StatCard from "../StatCard";

export default function StatsGrid({ stats }) {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Analyses"
        value={stats?.total_analyses ?? 0}
        icon={ScanSearch}
        accent="text-blue-400"
      />

      <StatCard
        label="High Risk"
        value={stats?.high_risk ?? 0}
        icon={ShieldAlert}
        accent="text-red-400"
      />

      <StatCard
        label="Medium Risk"
        value={stats?.medium_risk ?? 0}
        icon={ShieldQuestion}
        accent="text-amber-400"
      />

      <StatCard
        label="Safe Jobs"
        value={stats?.low_risk ?? 0}
        icon={ShieldCheck}
        accent="text-emerald-400"
      />
    </section>
  );
}