import { useRef, useState } from 'react'
import { FileText, ImageUp, ScanSearch, RotateCcw, X } from 'lucide-react'
import { analyzeJobText, analyzeJobImage } from '../lib/api'
import RiskGauge from '../components/RiskGauge'
import RedFlags from '../components/RedFlags'
import ScanLoader from '../components/ScanLoader'

const TABS = [
  { id: 'text', label: 'Paste text', icon: FileText },
  { id: 'image', label: 'Upload screenshot', icon: ImageUp },
]

export default function Analyze() {
  const [tab, setTab] = useState('text')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  function reset() {
    setResult(null)
    setError('')
    setDescription('')
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResult(null)

    if (tab === 'text' && !description.trim()) {
      setError('Paste the job description first.')
      return
    }
    if (tab === 'image' && !file) {
      setError('Choose a screenshot to scan.')
      return
    }

    setLoading(true)
    try {
      const res = tab === 'text' ? await analyzeJobText(description) : await analyzeJobImage(file)
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.detail || 'The scan failed. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-mist-50">Scan a posting</h1>
        <p className="mt-1 text-sm text-mist-400">
          Paste the raw job description, or upload a screenshot — JobShield reads the text either way.
        </p>
      </div>

      {!result && !loading && (
        <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
          <div className="mb-5 flex gap-1 rounded-lg border border-ink-600 bg-ink-900 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  tab === id ? 'bg-ink-700 text-mist-50' : 'text-mist-400 hover:text-mist-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tab === 'text' ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={9}
                placeholder="Paste the full job description here, including any messages about pay, fees, or next steps…"
                className="resize-none rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-3 text-sm leading-relaxed text-mist-50 outline-none placeholder:text-mist-400 focus:border-signal-500"
              />
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-ink-600 bg-ink-900 px-4 py-10 text-center hover:border-signal-500/50">
                {preview ? (
                  <img src={preview} alt="Selected screenshot preview" className="max-h-56 rounded-lg object-contain" />
                ) : (
                  <>
                    <ImageUp className="h-6 w-6 text-mist-400" />
                    <span className="text-sm text-mist-200">Click to choose an image</span>
                    <span className="text-xs text-mist-400">PNG or JPG screenshot of the posting</span>
                  </>
                )}
                <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}

            {error && (
              <p className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-3 py-2 text-sm text-danger-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
            >
              <ScanSearch className="h-4 w-4" />
              Run scan
            </button>
          </form>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-ink-600 bg-ink-800/60">
          <ScanLoader label={tab === 'image' ? 'Reading screenshot…' : 'Scanning description…'} />
        </div>
      )}

      {result && !loading && (
        <div className="flex flex-col gap-5 rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
          <div className="flex justify-center">
            <RiskGauge score={result.risk_score} level={result.risk_level} />
          </div>

          {result.extracted_text && (
            <div className="rounded-lg border border-ink-600 bg-ink-900 p-3.5">
              <p className="mb-1.5 text-xs uppercase tracking-[0.1em] text-mist-400">Text extracted from image</p>
              <p className="text-sm leading-relaxed text-mist-200">{result.extracted_text}</p>
            </div>
          )}

          <div>
            <p className="mb-2.5 text-xs uppercase tracking-[0.1em] text-mist-400">
              {result.red_flags.length} {result.red_flags.length === 1 ? 'flag' : 'flags'} detected
            </p>
            <RedFlags flags={result.red_flags} />
          </div>

          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 rounded-lg border border-ink-600 px-4 py-2.5 text-sm font-medium text-mist-200 hover:border-ink-500"
          >
            <RotateCcw className="h-4 w-4" />
            Scan another posting
          </button>
        </div>
      )}

      {(file || description) && !loading && !result && (
        <button
          onClick={reset}
          className="flex w-fit items-center gap-1.5 self-end text-xs text-mist-400 hover:text-mist-200"
        >
          <X className="h-3.5 w-3.5" />
          Clear form
        </button>
      )}
    </div>
  )
}
