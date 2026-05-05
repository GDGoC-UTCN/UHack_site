import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DEFAULT_CONFIG } from '../config/defaults'

const AUTH_KEY = 'uhack-auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    else localStorage.removeItem(AUTH_KEY)
  }, [user])

  const login = useCallback((email, password) => {
    // Very small, in-browser auth: match against DEFAULT_CONFIG.users
    const u = (DEFAULT_CONFIG.users || []).find(x => x.email === email && x.password === password)
    if (u) {
      setUser({ id: u.id, email: u.email, role: u.role, name: u.name, teamId: u.teamId })
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials' }
  }, [])

  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
