import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Submission.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const STEPS = [
  { num: '01', title: 'Finalizează codul', desc: 'Asigură-te că tot codul este commis și pushat pe GitHub înainte de ora 12:00 Duminică, 26 Aprilie.' },
  { num: '02', title: 'Completează formularul', desc: 'Trimite link-ul repository-ului GitHub, numele echipei, tema aleasă și un scurt description al soluției.' },
  { num: '03', title: 'Pregătește prezentarea', desc: 'Pregătești un demo de ~5 minute al soluției tale + Q&A cu juriul, imediat după deadline.' },
]

export default function Submission() {
  const [copied, setCopied] = useState(false)
  const deadline = 'Duminică, 26 Aprilie — 12:00'

  const handleCopy = () => {
    navigator.clipboard.writeText('https://github.com/GDGoC-UTCN/UHack_site')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="section section-dark" id="submit">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// submisie</span>
          <h2>Trimite Proiectul</h2>
          <p className="section-subtitle">
            Deadline: <span className={styles.deadline}>{deadline}</span>
          </p>
        </Reveal>

        <div className={styles.layout}>
          {/* Steps */}
          <Reveal className={styles.steps}>
            {STEPS.map((s) => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* CTA card */}
          <Reveal className={styles.ctaCard}>
            <div className={styles.ctaHeader}>
              <span className={styles.ctaIcon}>⏱️</span>
              <div>
                <h3>Submission Deadline</h3>
                <p className={styles.ctaDeadline}>{deadline}</p>
              </div>
            </div>

            <div className={styles.repoBox}>
              <span className={styles.repoLabel}>Repository format:</span>
              <code className={styles.repoExample}>github.com/&lt;team&gt;/uhack-2026</code>
            </div>

            <div className={styles.rules}>
              <p>📌 <strong>Reguli importante:</strong></p>
              <ul>
                <li>Niciun commit după ora 12:00 nu va fi acceptat</li>
                <li>Repository-ul trebuie să fie <strong>public</strong></li>
                <li>Includeți un <code>README.md</code> cu instrucțiuni de rulare</li>
                <li>Demo video (max 3 min) este un plus, nu obligatoriu</li>
              </ul>
            </div>

            <a
              href="https://forms.gle/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
            >
              📤 Submit Proiectul
            </a>

            <p className={styles.note}>
              Link-ul de submisie va fi activat în ziua evenimentului
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
