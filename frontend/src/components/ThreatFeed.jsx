import { Link } from "react-router-dom";
import { ArrowRight, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import RiskBadge from "./RiskBadge";
import EmptyState from "./EmptyState";
import { Inbox } from "lucide-react";

function ThreatIcon(level) {
  switch (level) {
    case "HIGH":
      return <ShieldAlert className="h-5 w-5 text-red-500" />;
    case "MEDIUM":
      return <ShieldQuestion className="h-5 w-5 text-yellow-400" />;
    default:
      return <ShieldCheck className="h-5 w-5 text-emerald-400" />;
  }
}

export default function ThreatFeed({ scans = [] }) {
  if (!scans.length) {
    return (
      <div className="cyber-card p-6">
        <EmptyState
          icon={Inbox}
          title="No scans detected"
          description="Run your first analysis to populate the live threat feed."
          action={
            <Link
              to="/analyze"
              className="mt-2 inline-flex text-sm text-signal-400 hover:underline"
            >
              Start First Scan
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="cyber-card p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="font-display text-lg font-semibold text-mist-50">
            Live Threat Feed
          </h2>

          <p className="mt-1 text-sm text-mist-400">
            Latest analyzed job postings
          </p>

        </div>

        <Link
          to="/history"
          className="flex items-center gap-2 text-sm text-signal-400 hover:text-white"
        >
          View All

          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>

      <div className="space-y-4">

        {scans.map((item) => (

          <Link
            key={item.id}
            to={`/history/${item.id}`}
            className="group block rounded-xl border border-ink-600 bg-ink-900/50 p-5 transition-all duration-300 hover:border-signal-400/40 hover:bg-ink-800"
          >

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0 flex-1">

                <div className="mb-3 flex items-center gap-3">

                  {ThreatIcon(item.risk_level)}

                  <RiskBadge level={item.risk_level} />

                </div>

                <p className="line-clamp-2 break-words text-sm leading-6 text-mist-200">
                  {item.job_description}
                </p>

              </div>

              <div className="text-right">

                <div className="font-mono-num text-3xl font-bold text-signal-400">
                  {item.risk_score}
                </div>

                <div className="text-xs uppercase tracking-widest text-mist-400">
                  Threat Score
                </div>

              </div>

            </div>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-xs text-mist-400">
                Click to view complete analysis
              </span>

              <ArrowRight className="h-4 w-4 text-signal-400 transition group-hover:translate-x-1" />

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}