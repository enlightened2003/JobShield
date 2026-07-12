import { motion } from "framer-motion";
import {
  ArrowRight,
  ScanSearch,
  Upload,
  History,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Analyze Job",
    description: "Paste a job description and let AI detect scams.",
    icon: ScanSearch,
    to: "/analyze",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    title: "Upload Poster",
    description: "Upload a screenshot or job poster for OCR analysis.",
    icon: Upload,
    to: "/analyze",
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    title: "View History",
    description: "Browse your previous analyses and reports.",
    icon: History,
    to: "/history",
    color: "from-emerald-500/20 to-green-500/10",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Jump straight into your next task.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
            >
              <Link
                to={action.to}
                className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${action.color} p-6 backdrop-blur-xl transition`}
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-3xl" />

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Icon
                      size={26}
                      className="text-white"
                    />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {action.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {action.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white">
                    Open

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}