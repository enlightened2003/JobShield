import { Link } from 'react-router-dom'
import { ArrowRight, ScanLine, ImageUp, ListChecks, IndianRupee, Gauge, History } from 'lucide-react'
import Logo from '../components/Logo'
import RiskGauge from '../components/RiskGauge'

const flags = [
  { icon: IndianRupee, text: 'Requests upfront "registration" or "training" fee' },
  { icon: Gauge, text: 'Salary is inflated well above market rate' },
  { icon: ListChecks, text: 'Vague role with no verifiable company details' },
]

const steps = [
  {
    icon: ScanLine,
    title: 'Paste the posting',
    body: 'Drop in the job description text exactly as you received it, no cleanup needed.',
  },
  {
    icon: ImageUp,
    title: 'Or scan a screenshot',
    body: 'Forward a WhatsApp or email screenshot — OCR pulls the text out automatically.',
  },
  {
    icon: Gauge,
    title: 'Get a risk reading',
    body: 'A 0–100 score, a risk level, and the exact phrases that triggered each flag.',
  },
  {
    icon: History,
    title: 'Track every scan',
    body: 'Your history and stats stay saved, so you can compare postings over time.',
  },
]

export default function Landing() {
  return (
    <div className="overflow-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-semibold text-mist-50">JobShield</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-mist-200 hover:text-mist-50">
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-lg bg-signal-500 px-4 py-2 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/60 px-3 py-1 text-xs uppercase tracking-[0.14em] text-signal-400">
            <ScanLine className="h-3.5 w-3.5" />
            AI-powered scam detection
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-mist-50 sm:text-5xl">
            Know if a job offer<br />is a trap before you<br /><span className="text-signal-400">reply to it.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mist-400">
            JobShield reads a job posting the way a skeptical recruiter would —
            flagging upfront fees, inflated salaries, and vague roles — and hands
            you a risk score in seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
            >
              Scan your first posting
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="text-sm font-medium text-mist-200 hover:text-mist-50">
              I already have an account
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6 shadow-[0_0_60px_-15px_rgba(78,127,255,0.25)]">
            <div className="mb-5 flex items-center justify-between text-xs text-mist-400">
              <span className="font-mono-num">SCAN_RESULT.json</span>
              <span className="flex items-center gap-1.5 text-danger-500">
                <span className="h-1.5 w-1.5 rounded-full bg-danger-500" /> high risk
              </span>
            </div>
            <div className="flex justify-center">
              <RiskGauge score={82} level="HIGH" size={180} />
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {flags.map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-mist-400">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mist-400" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-600 bg-ink-950/60">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-mist-50">How a scan works</h2>
          <p className="mt-2 max-w-lg text-sm text-mist-400">
            Four steps stand between a suspicious message and a clear answer.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="rounded-2xl border border-ink-600 bg-ink-800/40 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-signal-500/10 text-signal-400">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="font-mono-num text-xs text-mist-400">0{i + 1}</span>
                <h3 className="font-display mt-1 text-base font-semibold text-mist-50">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-mist-50">
          Don't let a "confirmed" offer cost you a deposit.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-mist-400">
          Free to use. Your scan history stays private to your account.
        </p>
        <Link
          to="/register"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-signal-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90"
        >
          Create a free account
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <footer className="border-t border-ink-600 px-6 py-8 text-center text-xs text-mist-400">
        JobShield — built as a portfolio project. Not a substitute for your own judgment.
      </footer>
    </div>
  )
}
