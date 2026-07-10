import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jobshield_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let onUnauthorized = null
export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn
}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && onUnauthorized) {
      onUnauthorized()
    }
    return Promise.reject(err)
  }
)

// ---- Auth ----
export function registerUser({ username, email, password }) {
  return api.post('/auth/register', { username, email, password })
}

export function loginUser({ email, password }) {
  const form = new URLSearchParams()
  form.append('username', email)
  form.append('password', password)
  return api.post('/auth/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}

export function fetchMe() {
  return api.get('/auth/me')
}

// ---- Jobs ----
export function analyzeJobText(job_description) {
  return api.post('/jobs/analyze', { job_description })
}

export function analyzeJobImage(file) {
  const form = new FormData()
  form.append('file', file)
  return api.post('/jobs/analyze-image', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export function fetchHistory({ page = 1, limit = 10 } = {}) {
  return api.get('/jobs/history', { params: { page, limit } })
}

export function fetchStats() {
  return api.get('/jobs/stats')
}

export function fetchAnalysis(id) {
  return api.get(`/jobs/${id}`)
}

export function deleteAnalysis(id) {
  return api.delete(`/jobs/${id}`)
}
