import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Tracks.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const tracks = [
  { icon: '⚽', title: 'Analiză Performanță', desc: 'Soluții AI pentru analiza datelor sportive, urmărirea performanței jucătorilor și predicție tactică.' },
  { icon: '📊', title: 'Management Club', desc: 'Instrumente digitale pentru eficientizarea operațiunilor interne, comunicare și management financiar.' },
  { icon: '🎟️', title: 'Fan Experience', desc: 'Platforme inovatoare pentru îmbunătățirea experienței suporterilor înainte, în timpul și după meci.' },
  { icon: '🏥', title: 'Sănătate & Prevenție', desc: 'Aplicații pentru monitorizarea stării fizice a jucătorilor, prevenirea accidentărilor și recuperare.' },
]

export default function Tracks() {
  return (
    <section className="section" id="tematici">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// provocări</span>
          <h2>Tematicile Hackathonului</h2>
        </Reveal>
        <div className={styles.grid}>
          {tracks.map(t => (
            <Reveal key={t.title} className={styles.card}>
              <div className={styles.icon}>{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
