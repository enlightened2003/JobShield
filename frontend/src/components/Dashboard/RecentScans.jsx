import { Link } from "react-router-dom";
import { ArrowRight, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import RiskBadge from "../RiskBadge";
import EmptyState from "../EmptyState";

export default function RecentScans({ recent }) {
  return (
    <motion.section
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Analyses
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest AI scam detections
          </p>
        </div>

        <Link
          to="/history"
          className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No analyses yet"
          description="Analyze your first job posting to see results here."
          action={
            <Link
              to="/analyze"
              className="mt-4 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Analyze Job
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {recent.map((item) => (
            <Link
              key={item.id}
              to={`/history/${item.id}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-blue-500/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm text-slate-200">
                    {item.job_description}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <RiskBadge level={item.risk_level} />

                    <span className="text-xs text-slate-500">
                      Score: {item.risk_score}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.section>
  );
}