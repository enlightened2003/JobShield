import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ScanSearch, History, LogOut } from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/analyze', label: 'Scan a posting', icon: ScanSearch },
  { to: '/history', label: 'History', icon: History },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-ink-600 bg-ink-900/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <NavLink to="/dashboard" className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-display text-base font-semibold text-mist-50">JobShield</span>
        </NavLink>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-700 text-mist-50'
                    : 'text-mist-400 hover:bg-ink-800 hover:text-mist-200'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono-num text-xs text-mist-400 sm:inline">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-ink-600 px-3 py-1.5 text-sm text-mist-200 transition-colors hover:border-danger-500/40 hover:text-danger-500"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-ink-600 px-4 py-2 sm:hidden">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                isActive ? 'bg-ink-700 text-mist-50' : 'text-mist-400'
              }`
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
