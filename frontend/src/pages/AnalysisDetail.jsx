import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Trash2, Calendar } from 'lucide-react'
import { fetchAnalysis, deleteAnalysis } from '../lib/api'
import RiskGauge from '../components/RiskGauge'
import RedFlags from '../components/RedFlags'
import ScanLoader from '../components/ScanLoader'

export default function AnalysisDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setNotFound(false)
      try {
        const res = await fetchAnalysis(id)
        if (!cancelled) setItem(res.data)
      } catch (err) {
        if (!cancelled && err.response?.status === 404) setNotFound(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [id])

  async function handleDelete() {
    if (!confirm('Delete this scan? This cannot be undone.')) return
    setDeleting(true)
    try {
      await deleteAnalysis(id)
      navigate('/history', { replace: true })
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <ScanLoader label="Loading scan…" />

  if (notFound || !item) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <h2 className="font-display text-lg text-mist-50">Scan not found</h2>
        <p className="text-sm text-mist-400">It may have been deleted, or the link is incorrect.</p>
        <Link to="/history" className="mt-2 text-sm font-medium text-signal-400 hover:underline">
          Back to history
        </Link>
      </div>
    )
  }

  const flags = item.red_flags ? item.red_flags.split(', ').filter(Boolean) : []

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Link to="/history" className="flex w-fit items-center gap-1.5 text-sm text-mist-400 hover:text-mist-200">
        <ArrowLeft className="h-4 w-4" /> Back to history
      </Link>

      <div className="flex flex-col gap-5 rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-mist-400">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(item.created_at).toLocaleString()}
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-xs text-mist-200 transition-colors hover:border-danger-500/40 hover:text-danger-500 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>

        <div className="flex justify-center">
          <RiskGauge score={item.risk_score} level={item.risk_level} />
        </div>

        <div className="rounded-lg border border-ink-600 bg-ink-900 p-3.5">
          <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-mist-400">Job description</p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-mist-200">{item.job_description}</p>
        </div>

        <div>
          <p className="mb-2.5 text-xs uppercase tracking-[0.1em] text-mist-400">
            {flags.length} {flags.length === 1 ? 'flag' : 'flags'} detected
          </p>
          <RedFlags flags={flags} />
        </div>
      </div>
    </div>
  )
}
