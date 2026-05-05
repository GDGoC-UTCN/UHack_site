import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
import styles from './Tracks.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Tracks() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].tracks

  return (
    <section className="section" id="teme">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">{tr.subtitle}</p>
        </Reveal>

        <div className={styles.grid}>
          {(config.themes ? config.themes.map(th => ({ ...th, title: lang==='ro' ? th.titleRO : th.titleEN, tagline: lang==='ro' ? th.taglineRO : th.taglineEN, desc: lang==='ro' ? th.descRO : th.descEN, bullets: lang==='ro' ? th.bulletsRO : th.bulletsEN })) : tr.themes).map((theme) => (
            <Reveal key={theme.number} className={styles.card}>
              <div className={styles.cardInner} style={{ '--accent': theme.color }}>
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{theme.number}</span>
                  <span className={styles.cardIcon}>{theme.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{theme.title}</h3>
                <p className={styles.cardTagline}>{theme.tagline}</p>
                <p className={styles.cardDesc}>{theme.desc}</p>
                <ul className={styles.bullets}>
                  {theme.bullets.map((b, i) => (
                    <li key={i}>
                      <span className={styles.bulletDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
