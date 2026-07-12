import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { motion } from "framer-motion";

const variants = {
  LOW: {
    label: "Safe",
    icon: ShieldCheck,
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  },

  MEDIUM: {
    label: "Medium",
    icon: ShieldQuestion,
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },

  HIGH: {
    label: "High",
    icon: ShieldAlert,
    className:
      "border-red-500/20 bg-red-500/10 text-red-400",
  },
};

export default function RiskBadge({ level = "LOW" }) {
  const badge = variants[level] || variants.LOW;
  const Icon = badge.icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        duration: 0.2,
      }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        backdrop-blur-xl
        ${badge.className}
      `}
    >
      <Icon size={14} />

      {badge.label}
    </motion.div>
  );
}