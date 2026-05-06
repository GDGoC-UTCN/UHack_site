import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 400)) // small UX delay
    const res = login(email, pw)
    setLoading(false)
    if (!res.ok) setErr(res.error)
    else window.location.hash = '#dashboard'
  }

  return (
    <div className={styles.wrap}>
      {/* Back link */}
      <button className={styles.backLink} onClick={() => { window.location.hash = '' }}>
        ← Înapoi la site
      </button>

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoU}>"U"</span>
          <span className={styles.logoHack}>HACK</span>
        </div>
        <p className={styles.subtitle}>Participant Portal</p>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@team.ro"
              value={email}
              onChange={e => { setEmail(e.target.value); setErr('') }}
              autoComplete="email"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Parolă</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr('') }}
              autoComplete="current-password"
              required
            />
          </div>

          {err && (
            <div className={styles.err}>
              <span>⚠️</span> {err}
            </div>
          )}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <span className={styles.spinner} /> : 'Intră în cont →'}
          </button>
        </form>

        <div className={styles.hint}>
          Cont creat de organizatori. Dacă nu ai primit credențialele,
          contactează-ne la{' '}
          <a href="mailto:contact@uhack.ro">contact@uhack.ro</a>
        </div>
      </div>
    </div>
  )
}
