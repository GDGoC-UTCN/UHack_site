import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './About.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function About() {
  return (
    <section className="section" id="despre">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// despre eveniment</span>
          <h2>O Premieră Națională</h2>
        </Reveal>

        <div className={styles.grid}>
          <Reveal className={styles.text}>
            <p>
              Pentru prima dată în România, <strong>FC Universitatea Cluj</strong> și{' '}
              <strong>Google Developer Group on Campus UTCN</strong> își unesc forțele
              în jurul unei viziuni comune: utilizarea tehnologiei pentru a dezvolta
              sportul de performanță.
            </p>
            <p>
              Timp de <strong>48 de ore</strong>, 120 de studenți vor construi soluții
              reale pentru provocările tehnice și operaționale ale clubului. Ceea ce
              diferențiază fundamental acest eveniment de hackathoanele clasice este
              miza sa concretă: soluțiile nu rămân exerciții academice, ci pot fi{' '}
              <strong>preluate și implementate efectiv</strong> de club.
            </p>
            <p>
              Cluj-Napoca devine astfel <strong>primul oraș din România</strong> care
              abordează utilizarea inteligenței artificiale ca instrument strategic
              în managementul cluburilor sportive.
            </p>
            <div className={styles.tags}>
              {['Inteligență Artificială', 'Sport de Performanță', 'Soluții Reale', '48h Non-Stop'].map(t => (
                <span className={styles.tag} key={t}>{t}</span>
              ))}
            </div>
          </Reveal>

          <Reveal className={styles.visual}>
            <div className={styles.terminalCard}>
              <div className={styles.termHeader}>
                <div className={styles.dots}><span /><span /><span /></div>
                <span className={styles.termTitle}>uhack_mission.txt</span>
              </div>
              <div className={styles.termBody}>
                {[
                  ['theme', 'AI în Sport'],
                  ['duration', '48 ore'],
                  ['participants', '120 studenți'],
                  ['teams', '24 echipe'],
                  ['location', 'Cluj-Napoca'],
                  ['date', '24-26 Apr 2026'],
                  ['organizers', 'GDGoC UTCN × U Cluj'],
                ].map(([k, v]) => (
                  <p key={k}><span className={styles.key}>{k}</span> → {v}</p>
                ))}
                <p><span className={styles.key}>output</span> → <span className={styles.highlight}>Produse reale</span></p>
                <p className={styles.cursor}><span className={styles.blink}>█</span></p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
