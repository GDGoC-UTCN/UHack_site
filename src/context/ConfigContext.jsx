import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { DEFAULT_CONFIG } from '../config/defaults'

// ── Deep-merge helper ─────────────────────────────────
function deepMerge(base, override) {
  const result = { ...base }
  for (const key of Object.keys(override)) {
    if (
      override[key] !== null &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key], override[key])
    } else {
      result[key] = override[key]
    }
  }
  return result
}

const LS_KEY = 'uhack-config'

const ConfigContext = createContext(null)

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const stored = localStorage.getItem(LS_KEY)
      if (stored) return deepMerge(DEFAULT_CONFIG, JSON.parse(stored))
    } catch (_) {}
    return DEFAULT_CONFIG
  })

  // Persist to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(config))
  }, [config])

  // Replace the full config (e.g. after JSON import)
  const setFullConfig = useCallback((newConfig) => {
    setConfig(deepMerge(DEFAULT_CONFIG, newConfig))
  }, [])

  // Update a top-level section: updateSection('general', { eventName: '...' })
  const updateSection = useCallback((section, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: typeof value === 'object' && !Array.isArray(value)
        ? { ...prev[section], ...value }
        : value,
    }))
  }, [])

  // Reset everything to factory defaults
  const resetConfig = useCallback(() => {
    localStorage.removeItem(LS_KEY)
    setConfig(DEFAULT_CONFIG)
  }, [])

  return (
    <ConfigContext.Provider value={{ config, updateSection, setFullConfig, resetConfig }}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be used inside <ConfigProvider>')
  return ctx
}
