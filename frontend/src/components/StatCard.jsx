import { motion } from "framer-motion";

export default function StatCard({
  label,
  value,
  accent = "text-blue-400",
  icon: Icon,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
    >
      {/* Glow */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {label}
          </p>

          <h2 className={`mt-5 text-4xl font-bold ${accent}`}>
            {value}
          </h2>

          <div className="mt-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

            <span className="text-xs text-slate-400">
              Updated just now
            </span>
          </div>
        </div>

        {Icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Icon className={`h-6 w-6 ${accent}`} />
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">
          AI Protected
        </span>

        <span className="text-xs text-blue-400 font-medium">
          Live
        </span>
      </div>
    </motion.div>
  );
}