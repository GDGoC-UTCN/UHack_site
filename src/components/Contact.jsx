import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import s from './Contact.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const MAX_MSG = 1000

function validate(fields, tr) {
  const errs = {}
  if (!fields.name.trim())    errs.name    = 'Required'
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errs.email = 'Valid email required'
  if (!fields.subject.trim()) errs.subject = 'Required'
  if (!fields.message.trim()) errs.message = 'Required'
  return errs
}

export default function Contact() {
  const { lang } = useApp()
  const tr = t[lang].contact

  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errs, setErrs]     = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const formRef = useRef(null)

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errs[k]) setErrs(e => { const n = {...e}; delete n[k]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(fields, tr)
    if (Object.keys(validation).length) { setErrs(validation); return }

    setStatus('sending')
    // Use mailto: as a reliable, dependency-free fallback.
    // To upgrade to a real backend, replace this block with fetch('/api/contact', …)
    // or integrate EmailJS: emailjs.send(serviceId, templateId, fields)
    try {
      const body = encodeURIComponent(
        `Nume: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
      )
      window.open(
        `mailto:contact@uhack.ro?subject=${encodeURIComponent(fields.subject)}&body=${body}`,
        '_blank'
      )
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
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
          <p className="section-sub">{tr.subtitle}</p>
        </Reveal>

        <div className={s.wrap}>
          <div className={s.inner}>
            {/* ── Left: contact info ── */}
            <Reveal>
              <div className={s.info}>
                <div className={s.infoItem}>
                  <span className={s.infoIcon}>📧</span>
                  <div>
                    <div className={s.infoLabel}>{tr.orEmail}</div>
                    <div className={s.infoValue}>
                      <a href="mailto:contact@uhack.ro">contact@uhack.ro</a>
                    </div>
                  </div>
                </div>

                <hr className={s.divider} />

                <div className={s.infoItem}>
                  <span className={s.infoIcon}>💬</span>
                  <div>
                    <div className={s.infoLabel}>{tr.orDiscord}</div>
                    <div className={s.infoValue}>
                      <a href="https://discord.gg/uhack" target="_blank" rel="noopener noreferrer">
                        discord.gg/uhack
                      </a>
                    </div>
                  </div>
                </div>

                <hr className={s.divider} />

                <div className={s.infoItem}>
                  <span className={s.infoIcon}>📍</span>
                  <div>
                    <div className={s.infoLabel}>Location</div>
                    <div className={s.infoValue}>Cluj-Napoca, România</div>
                  </div>
                </div>

                <div className={s.infoItem}>
                  <span className={s.infoIcon}>🏟️</span>
                  <div>
                    <div className={s.infoLabel}>Venue</div>
                    <div className={s.infoValue}>
                      <a href="https://maps.app.goo.gl/fcutcn" target="_blank" rel="noopener noreferrer">
                        FC Universitatea Cluj Campus
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Right: form ── */}
            <Reveal>
              {status === 'success' ? (
                <div className={`${s.banner} ${s.bannerSuccess}`}>{tr.success}</div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className={s.form}>
                  {status === 'error' && (
                    <div className={`${s.banner} ${s.bannerError}`}>{tr.error}</div>
                  )}

                  <div className={s.row}>
                    <div className={s.field}>
                      <label htmlFor="ct-name">{tr.name}</label>
                      <input
                        id="ct-name"
                        type="text"
                        placeholder={tr.namePh}
                        value={fields.name}
                        onChange={e => set('name', e.target.value)}
                        className={errs.name ? s.err : ''}
                      />
                      {errs.name && <span className={s.errMsg}>{errs.name}</span>}
                    </div>

                    <div className={s.field}>
                      <label htmlFor="ct-email">{tr.email}</label>
                      <input
                        id="ct-email"
                        type="email"
                        placeholder={tr.emailPh}
                        value={fields.email}
                        onChange={e => set('email', e.target.value)}
                        className={errs.email ? s.err : ''}
                      />
                      {errs.email && <span className={s.errMsg}>{errs.email}</span>}
                    </div>
                  </div>

                  <div className={s.field}>
                    <label htmlFor="ct-subject">{tr.subject}</label>
                    <input
                      id="ct-subject"
                      type="text"
                      placeholder={tr.subjectPh}
                      value={fields.subject}
                      onChange={e => set('subject', e.target.value)}
                      className={errs.subject ? s.err : ''}
                    />
                    {errs.subject && <span className={s.errMsg}>{errs.subject}</span>}
                  </div>

                  <div className={s.field}>
                    <label htmlFor="ct-msg">{tr.message}</label>
                    <textarea
                      id="ct-msg"
                      rows={6}
                      placeholder={tr.messagePh}
                      value={fields.message}
                      maxLength={MAX_MSG}
                      onChange={e => set('message', e.target.value)}
                      className={errs.message ? s.err : ''}
                    />
                    <span className={s.charCount}>{fields.message.length} / {MAX_MSG}</span>
                    {errs.message && <span className={s.errMsg}>{errs.message}</span>}
                  </div>

                  <button type="submit" disabled={status === 'sending'} className={s.submitBtn}>
                    {status === 'sending' ? tr.sending : tr.send}
                    {status !== 'sending' && <span>→</span>}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
