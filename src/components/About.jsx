import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './About.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function About() {
  const { lang } = useApp()
  const tr = t[lang].about

  return (
    <section className="section" id="despre">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.text}>
            <p>{tr.p1}</p>
            <p>{tr.p2}</p>
            <p>{tr.p3}</p>
          </Reveal>

          <Reveal className={styles.visual}>
            <div className={styles.terminalCard}>
              <div className={styles.termHeader}>
                <div className={styles.dots}><span /><span /><span /></div>
                <span className={styles.termTitle}>{tr.terminalTitle}</span>
              </div>
              <div className={styles.termBody}>
                {tr.terminalLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <p className={styles.cursor}><span className={styles.blink}>█</span></p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
