export default function StatCard({ label, value, accent = 'text-mist-50', icon: Icon }) {
  return (
    <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.14em] text-mist-400">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-mist-400" />}
      </div>
      <p className={`font-mono-num font-display mt-3 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  )
}
