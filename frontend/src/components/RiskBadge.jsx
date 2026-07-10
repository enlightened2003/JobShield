const STYLES = {
  LOW: 'text-safe-500 bg-safe-500/10 border-safe-500/30',
  MEDIUM: 'text-caution-500 bg-caution-500/10 border-caution-500/30',
  HIGH: 'text-danger-500 bg-danger-500/10 border-danger-500/30',
}

export default function RiskBadge({ level }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${STYLES[level] || STYLES.LOW}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  )
}
