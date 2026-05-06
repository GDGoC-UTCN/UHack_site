import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
import s from './Contact.module.css'

const EMAIL = 'gdgoncampustucn@gmail.com'
const MAX_MSG = 1200

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function validate(fields) {
  const errs = {}
  if (!fields.name.trim())    errs.name    = true
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = true
  if (!fields.category)       errs.category = true
  if (!fields.message.trim()) errs.message = true
  return errs
}

export default function Contact() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].contact
  const gen = config.general || {}

  const instagram = gen.instagramUrl || 'https://instagram.com/gdgoc.utcn'
  const linkedin  = gen.linkedinUrl  || 'https://linkedin.com/company/gdgoc-utcn'

  const EMPTY = { name: '', email: '', category: '', message: '' }
  const [fields, setFields] = useState(EMPTY)
  const [errs, setErrs]     = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errs[k]) setErrs(e => { const n = {...e}; delete n[k]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(fields)
    if (Object.keys(validation).length) { setErrs(validation); return }

    setStatus('sending')
    await new Promise(r => setTimeout(r, 600))
    try {
      const catLabel = (tr.categoryOpts.find(o => o.value === fields.category) || {}).label || fields.category
      const body = encodeURIComponent(
        `Nume: ${fields.name}\nEmail: ${fields.email}\nCategorie: ${catLabel}\n\n${fields.message}`
      )
      const subject = encodeURIComponent(`[UHack 2026] ${catLabel} — ${fields.name}`)
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">{tr.subtitle}</p>
        </Reveal>

        <div className={s.grid}>
          {/* ── Left: info panel ─────────────────────────── */}
          <Reveal className={s.infoPanel}>
            {/* Response time badge */}
            <div className={s.responseBadge}>
              <span className={s.badgeDot} />
              {tr.responseTime}
            </div>

            <div className={s.infoList}>
              {/* Email */}
              <a href={`mailto:${EMAIL}`} className={s.infoCard}>
                <span className={s.infoIcon}>📧</span>
                <div>
                  <div className={s.infoLabel}>{tr.emailLabel}</div>
                  <div className={s.infoValue}>{EMAIL}</div>
                </div>
              </a>

              {/* Instagram */}
              <a href={instagram} target="_blank" rel="noopener noreferrer" className={s.infoCard}>
                <span className={s.infoIcon}>📸</span>
                <div>
                  <div className={s.infoLabel}>{tr.instagramLabel}</div>
                  <div className={s.infoValue}>@gdgoc.utcn</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className={s.infoCard}>
                <span className={s.infoIcon}>💼</span>
                <div>
                  <div className={s.infoLabel}>{tr.linkedinLabel}</div>
                  <div className={s.infoValue}>GDGoC UTCN</div>
                </div>
              </a>

              {/* Location */}
              <div className={s.infoCard} style={{ cursor: 'default' }}>
                <span className={s.infoIcon}>📍</span>
                <div>
                  <div className={s.infoLabel}>{tr.locationLabel}</div>
                  <div className={s.infoValue}>Cluj-Napoca, România</div>
                </div>
              </div>

              {/* Venue */}
              <a
                href="https://maps.app.goo.gl/fcutcn"
                target="_blank"
                rel="noopener noreferrer"
                className={s.infoCard}
              >
                <span className={s.infoIcon}>🏟️</span>
                <div>
                  <div className={s.infoLabel}>{tr.venueLabel}</div>
                  <div className={s.infoValue}>{tr.venueValue}</div>
                </div>
              </a>
            </div>
          </Reveal>

          {/* ── Right: form ──────────────────────────────── */}
          <Reveal className={s.formWrap}>
            {status === 'success' ? (
              <div className={s.successCard}>
                <div className={s.successIcon}>✅</div>
                <h3>{tr.success}</h3>
                <p>{tr.successSub}</p>
                <button
                  className={s.resetBtn}
                  onClick={() => { setFields(EMPTY); setStatus('idle') }}
                >
                  {tr.successAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={s.form}>
                {status === 'error' && (
                  <div className={s.errorBanner}>
                    {tr.error} <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                )}

                {/* Name + Email */}
                <div className={s.row}>
                  <div className={`${s.field} ${errs.name ? s.fieldErr : ''}`}>
                    <label htmlFor="ct-name">{tr.name} <span className={s.req}>*</span></label>
                    <input
                      id="ct-name"
                      type="text"
                      placeholder={tr.namePh}
                      value={fields.name}
                      onChange={e => set('name', e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div className={`${s.field} ${errs.email ? s.fieldErr : ''}`}>
                    <label htmlFor="ct-email">{tr.email} <span className={s.req}>*</span></label>
                    <input
                      id="ct-email"
                      type="email"
                      placeholder={tr.emailPh}
                      value={fields.email}
                      onChange={e => set('email', e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className={`${s.field} ${errs.category ? s.fieldErr : ''}`}>
                  <label htmlFor="ct-cat">{tr.category} <span className={s.req}>*</span></label>
                  <div className={s.selectWrap}>
                    <select
                      id="ct-cat"
                      value={fields.category}
                      onChange={e => set('category', e.target.value)}
                    >
                      <option value="">{tr.categoryPh}</option>
                      {tr.categoryOpts.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <span className={s.selectArrow}>▾</span>
                  </div>
                </div>

                {/* Message */}
                <div className={`${s.field} ${errs.message ? s.fieldErr : ''}`}>
                  <label htmlFor="ct-msg">
                    {tr.message} <span className={s.req}>*</span>
                    <span className={s.charCount}>{fields.message.length} / {MAX_MSG}</span>
                  </label>
                  <textarea
                    id="ct-msg"
                    rows={6}
                    placeholder={tr.messagePh}
                    value={fields.message}
                    maxLength={MAX_MSG}
                    onChange={e => set('message', e.target.value)}
                  />
                </div>

                <button type="submit" disabled={status === 'sending'} className={s.submitBtn}>
                  {status === 'sending'
                    ? <><span className={s.spinner} /> {tr.sending}</>
                    : <>{tr.send} <span>→</span></>
                  }
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
