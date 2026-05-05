import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './Timeline.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const DAY_KEYS = ['vineri', 'sambata', 'duminica']
const DAY_EMOJIS = { vineri: '🌙', sambata: '⚡', duminica: '🏆' }

export default function Timeline() {
  const [activeDay, setActiveDay] = useState('vineri')
  const { lang } = useApp()
  const tr = t[lang].timeline
  const events = tr.events[activeDay]

  return (
    <section className="section section-dark" id="detalii">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
          <p className="section-subtitle">{tr.subtitle}</p>
        </Reveal>

        <Reveal className={styles.tabs}>
          {DAY_KEYS.map((key) => {
            const day = tr.days[key]
            return (
              <button
                key={key}
                className={`${styles.tab} ${activeDay === key ? styles.tabActive : ''}`}
                onClick={() => setActiveDay(key)}
              >
                <span className={styles.tabEmoji}>{DAY_EMOJIS[key]}</span>
                <strong>{day.label}</strong>
                <span className={styles.tabDate}>{day.date}</span>
              </button>
            )
          })}
        </Reveal>

        <div className={styles.eventList} key={activeDay + lang}>
          {events.map((ev, i) => (
            <div
              key={i}
              className={`${styles.eventRow} ${styles['type_' + ev.type]} ${ev.highlight ? styles.eventHighlight : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={styles.eventTime}>{ev.time}</div>
              <div className={styles.eventBar} />
              <div className={styles.eventContent}>
                <div className={styles.eventHead}>
                  <h3>{ev.title}</h3>
                  <span className={`${styles.badge} ${styles['badge_' + ev.type]}`}>
                    {tr.typeLabels[ev.type]}
                  </span>
                </div>
                <p>{ev.desc}</p>
                {ev.link && (
                  <a href={ev.link} target="_blank" rel="noopener noreferrer" className={styles.meetLink}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg>
                    Join Google Meet
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
