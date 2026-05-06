import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
import styles from './Submission.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Submission() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].submission
  const sub = config.submission || {}

  const deadline = lang === 'ro'
    ? (sub.deadlineRO || tr.deadline)
    : (sub.deadlineEN || tr.deadline)

  const steps = lang === 'ro'
    ? (sub.stepsRO || tr.steps)
    : (sub.stepsEN || tr.steps)

  const rules = lang === 'ro'
    ? (sub.rulesRO || tr.rules)
    : (sub.rulesEN || tr.rules)

  const formUrl = sub.formUrl || 'https://forms.gle/placeholder'

  return (
    <section className="section section-dark" id="submit">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">
            {tr.subtitle} <span className={styles.deadline}>{deadline}</span>
          </p>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.steps}>
            {steps.map((s) => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className={styles.ctaCard}>
            <div className={styles.ctaHeader}>
              <span className={styles.ctaIcon}>⏱️</span>
              <div>
                <h3>{lang === 'ro' ? 'Deadline Submisie' : 'Submission Deadline'}</h3>
                <p className={styles.ctaDeadline}>{deadline}</p>
              </div>
            </div>

            <div className={styles.repoBox}>
              <span className={styles.repoLabel}>{tr.repoLabel}</span>
              <code className={styles.repoExample}>github.com/&lt;team&gt;/uhack-2026</code>
            </div>

            <div className={styles.rules}>
              <p>{tr.rulesTitle}</p>
              <ul>
                {rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>

            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
            >
              {tr.btn}
            </a>

            <p className={styles.note}>{tr.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
