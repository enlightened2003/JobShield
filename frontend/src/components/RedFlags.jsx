import { AlertTriangle, ShieldCheck } from 'lucide-react'

export default function RedFlags({ flags = [] }) {
  if (!flags.length) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-safe-500/25 bg-safe-500/5 p-4">
        <ShieldCheck className="h-5 w-5 shrink-0 text-safe-500" />
        <p className="text-sm text-mist-200">No red flags detected in the scan.</p>
      </div>
    )
  }
  return (
    <ul className="flex flex-col gap-2.5">
      {flags.map((flag, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-ink-600 bg-ink-800/60 p-3.5 animate-rise"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger-500" />
          <span className="text-sm text-mist-200">{flag}</span>
        </li>
      ))}
    </ul>
  )
}
