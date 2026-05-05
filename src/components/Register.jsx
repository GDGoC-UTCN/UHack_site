import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './Register.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const initialState = {
  name: '', email: '', role: '', team: '', gdpr: false,
}

export default function Register() {
  const { lang } = useApp()
  const tr = t[lang].register
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim())  errs.name  = tr.errors.name
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = tr.errors.email
    if (!form.role.trim())  errs.role  = tr.errors.role
    if (!form.gdpr)         errs.gdpr  = tr.errors.gdpr
    return errs
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  const Field = ({ id, label, type = 'text', placeholder, required }) => (
    <div className={`${styles.group} ${errors[id] ? styles.hasError : ''}`}>
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <input id={id} name={id} type={type} placeholder={placeholder}
        value={form[id] || ''} onChange={onChange} />
      {errors[id] && <span className={styles.error}>{errors[id]}</span>}
    </div>
  )

  return (
    <section className="section section-dark" id="inscriere">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">{tr.subtitle}</p>
        </Reveal>

        <Reveal className={styles.wrap}>
          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>{tr.successTitle}</h3>
              <p>{tr.successMsg}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Field id="name"  label={lang === 'ro' ? 'Nume complet' : 'Full name'} placeholder={tr.namePlaceholder}  required />
              <Field id="email" label="Email" type="email"  placeholder={tr.emailPlaceholder} required />
              <Field id="role"  label={lang === 'ro' ? 'Rol / Specializare' : 'Role / Specialization'} placeholder={tr.rolePlaceholder} required />
              <Field id="team"  label={lang === 'ro' ? 'Echipă (opțional)' : 'Team (optional)'} placeholder={tr.teamPlaceholder} />

              <div className={`${styles.check} ${errors.gdpr ? styles.hasError : ''}`}>
                <input type="checkbox" id="gdpr" name="gdpr" checked={form.gdpr} onChange={onChange} />
                <label htmlFor="gdpr">{tr.gdpr}</label>
                {errors.gdpr && <span className={styles.error}>{errors.gdpr}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? tr.btnBusy : tr.btnIdle}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
