import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './Pages.module.css'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')

  const submit = async () => {
    const res = login(email, pw)
    if (!res.ok) setErr(res.error)
    else window.location.hash = '#dashboard'
  }

  return (
    <div className={styles.pageWrap}>
      <div className={styles.card}>
        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} />
        <button onClick={submit}>Login</button>
        {err && <div className={styles.err}>{err}</div>}
      </div>
    </div>
  )
}
