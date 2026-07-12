import { motion } from "framer-motion";
import { ArrowRight, ScanSearch, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHero() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
    >
      {/* Background Glow */}

      <div className="absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-xs font-medium text-blue-300">
            AI Job Scam Detection
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-white lg:text-5xl">
            {greeting}
            {user?.username ? `, ${user.username}` : ""} 👋
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            Analyze job descriptions and posters using AI to detect
            suspicious offers before you apply.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/analyze"
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              <ScanSearch size={18} />
              Analyze Job
            </Link>

            <Link
              to="/analyze"
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-white transition hover:bg-white/10"
            >
              <Upload size={18} />
              Upload Poster
            </Link>
          </div>
        </div>

        {/* AI Card */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="w-full max-w-sm rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">
              Latest Analysis
            </span>

            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
              High Risk
            </span>
          </div>

          <div className="mt-8">
            <p className="text-6xl font-bold text-white">
              82%
            </p>

            <p className="mt-2 text-slate-400">
              Scam Probability
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Company Verified
              </span>

              <span className="text-red-400">
                No
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Salary Suspicious
              </span>

              <span className="text-amber-400">
                Yes
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                External Contact
              </span>

              <span className="text-red-400">
                WhatsApp
              </span>
            </div>
          </div>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-medium text-white transition hover:bg-white/20">
            View Details

            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}