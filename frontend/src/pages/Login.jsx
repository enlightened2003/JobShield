import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(form)
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not sign in. Check your details and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Logo size={26} />
          <span className="font-display text-lg font-semibold text-mist-50">JobShield</span>
        </Link>

        <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-7">
          <div className="mb-6 flex items-center gap-2 text-signal-400">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs uppercase tracking-[0.14em]">Welcome back</span>
          </div>
          <h1 className="font-display mb-6 text-2xl font-semibold text-mist-50">Sign in to your account</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-mist-400">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-mist-50 outline-none placeholder:text-mist-400 focus:border-signal-500"
                placeholder="you@example.com"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-mist-400">Password</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="rounded-lg border border-ink-600 bg-ink-900 px-3.5 py-2.5 text-sm text-mist-50 outline-none placeholder:text-mist-400 focus:border-signal-500"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <p className="rounded-lg border border-danger-500/30 bg-danger-500/10 px-3 py-2 text-sm text-danger-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-signal-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? 'Signing in…' : 'Sign in'}
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-mist-400">
          New to JobShield?{' '}
          <Link to="/register" className="font-medium text-signal-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
