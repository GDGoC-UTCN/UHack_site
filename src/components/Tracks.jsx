import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Tracks.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const themes = [
  {
    number: '01',
    title: 'Smart Match Insights',
    tagline: 'Transformă datele în decizii tactice',
    desc: 'Construiește un sistem AI care analizează meciuri și generează insight-uri acționabile: scor AI per jucător, unde s-a pierdut mingea, cine a rupt liniile adverse, ce tip de atac a funcționat.',
    bullets: [
      'Player performance scoring cu AI',
      'Heatmaps & ball possession analysis',
      'Tactical pattern recognition',
      'Match event detection',
    ],
    icon: '⚽',
    color: '#a78bfa',
  },
  {
    number: '02',
    title: 'Transfer & Scouting Assistant',
    tagline: 'Descoperă talentul înainte de concurență',
    desc: 'Dezvoltă un asistent inteligent care recomandă jucători bazat pe pozițiile libere din echipă, stilul de joc al antrenorului și compatibilitatea cu ceilalți jucători din lot.',
    bullets: [
      'Similarity matching între jucători',
      'Position & style fit scoring',
      'Integration cu date publice (Transfermarkt etc.)',
      'Natural language query interface',
    ],
    icon: '🔍',
    color: '#34d399',
  },
  {
    number: '03',
    title: 'Opponent Analysis',
    tagline: 'Cunoaște-ți adversarul înainte de fluier',
    desc: 'Creează un sistem care analizează jocul adversarului pentru a pregăti echipa să contracareze — identifică patterns de atac, vulnerabilități defensive și jucători cheie.',
    bullets: [
      'Opponent formation & style detection',
      'Key player identification',
      'Weakness exploitation recommendations',
      'Pre-match tactical briefing generator',
    ],
    icon: '🎯',
    color: '#fbbf24',
  },
]

export default function Tracks() {
  return (
    <section className="section" id="teme">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// teme</span>
          <h2>Cele 3 Provocări</h2>
          <p className="section-subtitle">
            Alege-ți tema și construiește soluția care va revoluționa fotbalul românesc
          </p>
        </Reveal>

        <div className={styles.grid}>
          {themes.map((t) => (
            <Reveal key={t.number} className={styles.card}>
              <div className={styles.cardInner} style={{ '--accent': t.color }}>
                <div className={styles.cardTop}>
                  <span className={styles.cardNum}>{t.number}</span>
                  <span className={styles.cardIcon}>{t.icon}</span>
                </div>
                <h3 className={styles.cardTitle}>{t.title}</h3>
                <p className={styles.cardTagline}>{t.tagline}</p>
                <p className={styles.cardDesc}>{t.desc}</p>
                <ul className={styles.bullets}>
                  {t.bullets.map((b, i) => (
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
