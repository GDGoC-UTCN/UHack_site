import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Timeline.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const events = [
  { time: '24 Aprilie · 14:00', title: 'Deschiderea Oficială', desc: 'Înregistrarea echipelor, prezentarea provocărilor din partea FC "U" Cluj și kickoff-ul competiției.', side: 'left' },
  { time: '24 Aprilie · 16:00', title: 'Hacking Begins', desc: 'Start oficial al celor 48 de ore de dezvoltare. Echipele încep să construiască soluțiile.', side: 'right' },
  { time: '25 Aprilie · 12:00', title: 'Check-point Halfway', desc: 'Mentorii oferă feedback, sesiuni de consultanță cu reprezentanții clubului și workshopuri tehnice.', side: 'left' },
  { time: '26 Aprilie · 14:00', title: 'Freeze Code', desc: 'Submisia finală a proiectelor. Pregătirea prezentărilor pentru juriu.', side: 'right' },
  { time: '26 Aprilie · 16:00', title: 'Prezentări & Jurizare', desc: 'Fiecare echipă prezintă soluția în fața juriului format din reprezentanți ai clubului și industria tech.', side: 'left' },
  { time: '26 Aprilie · 19:00', title: '🏆 Ceremonia de Premiere', desc: 'Anunțarea câștigătorilor, premii și încheierea oficială a evenimentului.', side: 'right', highlight: true },
]

export default function Timeline() {
  return (
    <section className="section section-dark" id="detalii">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// program</span>
          <h2>48 de Ore de Inovație</h2>
        </Reveal>

        <div className={styles.timeline}>
          {events.map((ev, i) => (
            <Reveal key={i} className={`${styles.item} ${styles[ev.side]}`}>
              <div className={`${styles.card} ${ev.highlight ? styles.highlight : ''}`}>
                <div className={styles.time}>{ev.time}</div>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
              </div>
              <div className={`${styles.dot} ${ev.highlight ? styles.dotHighlight : ''}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
