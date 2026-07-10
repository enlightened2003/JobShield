import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loginUser, registerUser, fetchMe, setUnauthorizedHandler } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('jobshield_token'))
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('jobshield_token')
    setToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  useEffect(() => {
    let cancelled = false
    async function loadUser() {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const res = await fetchMe()
        if (!cancelled) setUser(res.data)
      } catch {
        if (!cancelled) logout()
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadUser()
    return () => { cancelled = true }
  }, [token, logout])

  async function login({ email, password }) {
    const res = await loginUser({ email, password })
    localStorage.setItem('jobshield_token', res.data.access_token)
    setToken(res.data.access_token)
    const me = await fetchMe()
    setUser(me.data)
  }

  async function register({ username, email, password }) {
    await registerUser({ username, email, password })
    await login({ email, password })
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
