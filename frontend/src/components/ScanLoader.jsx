export default function ScanLoader({ label = 'Scanning posting…' }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="relative h-28 w-28 overflow-hidden rounded-full border border-ink-600 bg-ink-800">
        <div
          className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-signal-500/50 to-transparent animate-scan"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-signal-400 shadow-[0_0_12px_2px_rgba(78,127,255,0.7)]" />
        </div>
        <div className="absolute inset-0 rounded-full border border-signal-500/20" />
      </div>
      <p className="font-mono-num text-sm text-mist-400">{label}</p>
    </div>
  )
}
