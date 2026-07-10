import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Inbox, ScanSearch } from 'lucide-react'
import { fetchHistory } from '../lib/api'
import RiskBadge from '../components/RiskBadge'
import EmptyState from '../components/EmptyState'
import ScanLoader from '../components/ScanLoader'

const LIMIT = 10

export default function History() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      try {
        const res = await fetchHistory({ page, limit: LIMIT })
        if (!cancelled) setItems(res.data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [page])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-semibold text-mist-50">Scan history</h1>
        <p className="text-sm text-mist-400">Every posting you've run through JobShield.</p>
      </div>

      {loading ? (
        <ScanLoader label="Loading history…" />
      ) : items.length === 0 && page === 1 ? (
        <EmptyState
          icon={Inbox}
          title="No scans yet"
          description="Your scanned postings will show up here."
          action={
            <Link
              to="/analyze"
              className="mt-1 flex items-center gap-1.5 text-sm font-medium text-signal-400 hover:underline"
            >
              <ScanSearch className="h-3.5 w-3.5" /> Scan a posting
            </Link>
          }
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-ink-600 bg-ink-800/60">
            <ul className="flex flex-col divide-y divide-ink-600">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/history/${item.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-ink-700/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm text-mist-100">{item.job_description}</p>
                      <p className="font-mono-num mt-1 text-xs text-mist-400">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono-num text-sm text-mist-200">{item.risk_score}</span>
                      <RiskBadge level={item.risk_level} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-200 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> Previous
            </button>
            <span className="font-mono-num text-xs text-mist-400">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={items.length < LIMIT}
              className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-200 disabled:opacity-40"
            >
              Next <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
