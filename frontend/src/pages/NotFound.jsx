import { Link } from 'react-router-dom'
import { ShieldQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
      <ShieldQuestion className="h-8 w-8 text-mist-400" />
      <h1 className="font-display text-2xl font-semibold text-mist-50">Page not found</h1>
      <p className="text-sm text-mist-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-2 text-sm font-medium text-signal-400 hover:underline">
        Back to home
      </Link>
    </div>
  )
}
