import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Register.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const initialState = {
  fname: '', lname: '', email: '', phone: '',
  university: '', faculty: '', year: '', experience: '',
  skills: '', team: '', motivation: '', gdpr: false, newsletter: false,
}

const required = ['fname', 'lname', 'email', 'university', 'faculty', 'year', 'experience', 'motivation']

export default function Register() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const errs = {}
    required.forEach(k => {
      if (!form[k]) errs[k] = 'Câmp obligatoriu.'
    })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email invalid.'
    if (!form.gdpr) errs.gdpr = 'Trebuie să accepți politica de confidențialitate.'
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
    await new Promise(r => setTimeout(r, 1500)) // Simulate API
    setLoading(false)
    setSuccess(true)
  }

  const Field = ({ id, label, type = 'text', placeholder, children }) => (
    <div className={`${styles.group} ${errors[id] ? styles.hasError : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children || (
        <input id={id} name={id} type={type} placeholder={placeholder}
          value={form[id]} onChange={onChange} />
      )}
      {errors[id] && <span className={styles.error}>{errors[id]}</span>}
    </div>
  )

  return (
    <section className="section section-dark" id="inscriere">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// join us</span>
          <h2>Înscrie-te la "U" Hack!</h2>
          <p className="section-subtitle">Locurile sunt limitate — 120 de participanți. Fii printre primii!</p>
        </Reveal>

        <Reveal className={styles.wrap}>
          {success ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Înregistrare Primită!</h3>
              <p>Mulțumim! Vei primi un email de confirmare în curând. Ne vedem la "U" Hack! 🚀</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <Field id="fname" label="Prenume *" placeholder="Ex: Andrei" />
                <Field id="lname" label="Nume *" placeholder="Ex: Popescu" />
              </div>
              <div className={styles.row}>
                <Field id="email" label="Email *" type="email" placeholder="andrei@student.utcluj.ro" />
                <Field id="phone" label="Telefon" placeholder="+40 7XX XXX XXX" />
              </div>
              <div className={styles.row}>
                <Field id="university" label="Universitate *" placeholder="Ex: UTCN" />
                <Field id="faculty" label="Facultate / Specializare *" placeholder="Ex: Automatică și Calculatoare" />
              </div>
              <div className={styles.row}>
                <Field id="year" label="An de studiu *">
                  <select id="year" name="year" value={form.year} onChange={onChange}>
                    <option value="">Selectează...</option>
                    {['Anul I','Anul II','Anul III','Anul IV','Master I','Master II','Doctorand'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </Field>
                <Field id="experience" label="Nivel de experiență *">
                  <select id="experience" name="experience" value={form.experience} onChange={onChange}>
                    <option value="">Selectează...</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </Field>
              </div>
              <Field id="skills" label="Skill-uri / Tehnologii" placeholder="Ex: Python, React, Machine Learning, UI/UX..." />
              <Field id="team" label="Ai deja o echipă formată?" placeholder="Numele echipei sau lasă gol dacă participi individual" />
              <Field id="motivation" label="De ce vrei să participi? *">
                <textarea id="motivation" name="motivation" rows={4}
                  placeholder="Spune-ne ce te motivează să participi la U Hack..."
                  value={form.motivation} onChange={onChange} />
              </Field>

              <div className={`${styles.check} ${errors.gdpr ? styles.hasError : ''}`}>
                <input type="checkbox" id="gdpr" name="gdpr" checked={form.gdpr} onChange={onChange} />
                <label htmlFor="gdpr">
                  Sunt de acord cu{' '}
                  <a href="#" target="_blank" rel="noopener noreferrer">politica de confidențialitate</a>. *
                </label>
                {errors.gdpr && <span className={styles.error}>{errors.gdpr}</span>}
              </div>
              <div className={styles.check}>
                <input type="checkbox" id="newsletter" name="newsletter" checked={form.newsletter} onChange={onChange} />
                <label htmlFor="newsletter">Doresc să primesc noutăți despre GDGoC UTCN și evenimentele viitoare.</label>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Se trimite...' : 'Trimite Înscrierea'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
