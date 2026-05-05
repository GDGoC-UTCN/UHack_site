import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── Theme ──────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('uhack-theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('uhack-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  // ── Language ───────────────────────────────────────────
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('uhack-lang') || 'ro'
  })

  useEffect(() => {
    localStorage.setItem('uhack-lang', lang)
  }, [lang])

  const toggleLang = () => setLang(l => (l === 'ro' ? 'en' : 'ro'))

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

/** Convenience: returns the translation object for current lang */
export function useLang() {
  const { lang } = useApp()
  return lang
}
