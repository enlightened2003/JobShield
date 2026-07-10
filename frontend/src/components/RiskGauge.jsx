import { useEffect, useState } from 'react'

const LEVEL_STYLES = {
  LOW: { color: 'var(--color-safe-500)', glow: 'rgba(53, 212, 140, 0.35)', label: 'Low risk' },
  MEDIUM: { color: 'var(--color-caution-500)', glow: 'rgba(242, 184, 75, 0.35)', label: 'Medium risk' },
  HIGH: { color: 'var(--color-danger-500)', glow: 'rgba(255, 92, 92, 0.35)', label: 'High risk' },
}

// Signature element: a radial scanner dial. The arc sweeps in on mount like a
// scan settling on its reading, echoing the "scan a posting" mental model.
export default function RiskGauge({ score = 0, level = 'LOW', size = 200 }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const style = LEVEL_STYLES[level] || LEVEL_STYLES.LOW

  useEffect(() => {
    setAnimatedScore(0)
    const raf = requestAnimationFrame(() => {
      const t = setTimeout(() => setAnimatedScore(score), 50)
      return () => clearTimeout(t)
    })
    return () => cancelAnimationFrame(raf)
  }, [score])

  const radius = 80
  const stroke = 14
  const circumference = Math.PI * radius // half circle (180deg arc)
  const clamped = Math.max(0, Math.min(100, animatedScore))
  const offset = circumference - (clamped / 100) * circumference

  const cx = size / 2
  const cy = size / 2

  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size / 1.55} viewBox={`0 0 ${size} ${size / 1.55}`}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* track */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="var(--color-ink-600)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* value arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={style.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: size / 1.55 - 58 }}>
        <span className="font-mono-num font-display text-4xl font-semibold text-mist-50" style={{ color: 'var(--color-mist-50)' }}>
          {Math.round(clamped)}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] mt-1" style={{ color: style.color }}>
          {style.label}
        </span>
      </div>
    </div>
  )
}
