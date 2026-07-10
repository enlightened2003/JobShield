import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ScanSearch, ShieldAlert, ShieldCheck, ShieldQuestion, ArrowRight, Inbox } from 'lucide-react'
import { fetchStats, fetchHistory } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import EmptyState from '../components/EmptyState'
import ScanLoader from '../components/ScanLoader'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const [statsRes, historyRes] = await Promise.all([
          fetchStats(),
          fetchHistory({ page: 1, limit: 5 }),
        ])
        if (!cancelled) {
          setStats(statsRes.data)
          setRecent(historyRes.data)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const chartData = stats
    ? [
        { name: 'High', value: stats.high_risk, color: 'var(--color-danger-500)' },
        { name: 'Medium', value: stats.medium_risk, color: 'var(--color-caution-500)' },
        { name: 'Low', value: stats.low_risk, color: 'var(--color-safe-500)' },
      ].filter((d) => d.value > 0)
    : []

  if (loading) {
    return <ScanLoader label="Loading your dashboard…" />
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold text-mist-50">
          Welcome back{user?.username ? `, ${user.username}` : ''}
        </h1>
        <p className="text-sm text-mist-400">Here's what your scans have turned up so far.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total scans" value={stats?.total_analyses ?? 0} icon={ScanSearch} />
        <StatCard label="High risk" value={stats?.high_risk ?? 0} accent="text-danger-500" icon={ShieldAlert} />
        <StatCard label="Medium risk" value={stats?.medium_risk ?? 0} accent="text-caution-500" icon={ShieldQuestion} />
        <StatCard label="Low risk" value={stats?.low_risk ?? 0} accent="text-safe-500" icon={ShieldCheck} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
          <h2 className="font-display text-base font-semibold text-mist-50">Risk breakdown</h2>
          {chartData.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-sm text-mist-400">
              Scan a posting to see your breakdown.
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                    {chartData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--color-ink-800)',
                      border: '1px solid var(--color-ink-600)',
                      borderRadius: 8,
                      fontSize: 12,
                      color: 'var(--color-mist-50)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-mist-50">Recent scans</h2>
            <Link to="/history" className="flex items-center gap-1 text-xs font-medium text-signal-400 hover:underline">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recent.length === 0 ? (
            <EmptyState
              icon={Inbox}
              title="No scans yet"
              description="Paste a job description or upload a screenshot to run your first scan."
              action={
                <Link to="/analyze" className="mt-1 text-sm font-medium text-signal-400 hover:underline">
                  Scan a posting →
                </Link>
              }
            />
          ) : (
            <ul className="flex flex-col divide-y divide-ink-600">
              {recent.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/history/${item.id}`}
                    className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0 hover:opacity-80"
                  >
                    <span className="truncate text-sm text-mist-200">{item.job_description}</span>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono-num text-xs text-mist-400">{item.risk_score}</span>
                      <RiskBadge level={item.risk_level} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Link
        to="/analyze"
        className="flex items-center justify-between rounded-2xl border border-signal-500/30 bg-signal-500/5 px-6 py-5 transition-colors hover:bg-signal-500/10"
      >
        <div className="flex items-center gap-3">
          <ScanSearch className="h-5 w-5 text-signal-400" />
          <div>
            <p className="font-display text-sm font-semibold text-mist-50">Got a new posting to check?</p>
            <p className="text-xs text-mist-400">Paste the text or upload a screenshot for an instant read.</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-signal-400" />
      </Link>
    </div>
  )
}
