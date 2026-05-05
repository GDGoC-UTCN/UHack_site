import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './Submission.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Submission() {
  const { lang } = useApp()
  const tr = t[lang].submission

  return (
    <section className="section section-dark" id="submit">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">
            {tr.subtitle} <span className={styles.deadline}>{tr.deadline}</span>
          </p>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.steps}>
            {tr.steps.map((s) => (
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
                <p className={styles.ctaDeadline}>{tr.deadline}</p>
              </div>
            </div>

            <div className={styles.repoBox}>
              <span className={styles.repoLabel}>{tr.repoLabel}</span>
              <code className={styles.repoExample}>github.com/&lt;team&gt;/uhack-2026</code>
            </div>

            <div className={styles.rules}>
              <p>{tr.rulesTitle}</p>
              <ul>
                {tr.rules.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </div>

            <a
              href="https://forms.gle/placeholder"
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
