import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Timeline.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const schedule = {
  vineri: {
    label: 'Vineri',
    date: '24 Aprilie',
    emoji: '🌙',
    events: [
      { time: '16:00', title: 'Check-in & Înregistrare Echipe', desc: 'Înregistrarea echipelor la sediul MSG, Strada Croitorilor nr. 12-14, Cluj-Napoca.', type: 'logistics' },
      { time: '17:30', title: 'Opening Ceremony & Anunțarea Temelor', desc: 'Ceremonia de deschidere oficială și anunțarea celor 3 teme ale hackathonului.', type: 'ceremony', link: 'https://meet.google.com/bjd-zpbk-igf' },
      { time: '18:00', title: 'Workshop 1 — Sports Analytics by "U" Cluj', desc: 'Susținut de Gabriel Giurgiu, Director Sportiv FC Universitatea Cluj. Introducere în analiza datelor sportive.', type: 'workshop' },
      { time: '19:00', title: 'Workshop 2 — Merge with Confidence', desc: 'Arta de a lucra în echipă fără conflicte (prea mari), susținut de .msg Romania.', type: 'workshop' },
      { time: '20:00', title: 'Dinner', desc: 'Pauză de masă.', type: 'break' },
      { time: '21:15', title: 'How to Redeem Google Cloud Credits', desc: 'Sesiune scurtă de activare a creditelor Google Cloud pentru toate echipele.', type: 'logistics', link: 'https://meet.google.com/dii-fcgj-wzc' },
      { time: '21:30', title: 'Hands-on Google Cloud Credits', desc: 'Practică directă cu activarea și configurarea creditelor Google Cloud.', type: 'logistics' },
      { time: '22:00', title: 'Start Coding Session 🚀', desc: 'Start oficial al sesiunii de coding. 48 de ore de inovație încep acum!', type: 'coding' },
    ],
  },
  sambata: {
    label: 'Sâmbătă',
    date: '25 Aprilie',
    emoji: '⚡',
    events: [
      { time: '00:00', title: 'Online Coding Session', desc: 'Sesiune de coding overnight pentru echipele care lucrează de acasă.', type: 'coding' },
      { time: '08:00', title: 'Coding Session Continues', desc: 'Continuarea dezvoltării proiectelor la sediu.', type: 'coding' },
      { time: '11:30', title: 'Lunch Break', desc: 'Pauză de prânz.', type: 'break' },
      { time: '12:00', title: 'Workshop 3 — Firebase Genkit + AI Agent', desc: 'Building a small AI agent end-to-end, susținut de Google Developer Expert Sasha Denisov.', type: 'workshop', link: 'https://meet.google.com/pjq-tkvc-nna' },
      { time: '13:00', title: 'Workshop 4 — Production-Ready Football AI', desc: 'ADK, Agent Engine & Intelligent Database, susținut de Google Developer Expert.', type: 'workshop', link: 'https://meet.google.com/edo-yqsn-rbv' },
      { time: '14:00', title: 'Sosirea Echipei Oficiale FC "U" Cluj ⚽', desc: 'Sosirea reprezentanților oficiali ai echipei FC Universitatea Cluj.', type: 'ceremony' },
      { time: '14:00', title: 'Coding Session', desc: 'Continuarea lucrului la proiecte.', type: 'coding' },
      { time: '17:30', title: 'Dinner Break', desc: 'Pauză de masă.', type: 'break' },
      { time: '18:00', title: 'Workshop 5 — Agentic AI with ADK', desc: 'Susținut de Google Developer Expert Gabriel Preda.', type: 'workshop', link: 'https://meet.google.com/hjv-emec-aiw' },
      { time: '19:00', title: 'Evening Coding Session', desc: 'Sesiune intensivă de coding — ultimele ore înainte de deadline.', type: 'coding' },
    ],
  },
  duminica: {
    label: 'Duminică',
    date: '26 Aprilie',
    emoji: '🏆',
    events: [
      { time: '00:00', title: 'Online Coding Session', desc: 'Ultima sesiune de coding overnight.', type: 'coding' },
      { time: '08:00', title: 'Final Coding Session', desc: 'Ultimele ore de development — finalizare și polish al proiectelor.', type: 'coding' },
      { time: '11:30', title: 'Lunch Break', desc: 'Ultima pauză de masă a hackathonului.', type: 'break' },
      { time: '12:00', title: '⏱️ CODE SUBMISSION DEADLINE', desc: 'Deadline-ul final pentru submisia proiectelor. Niciun commit ulterior nu va fi luat în considerare!', type: 'deadline', highlight: true },
      { time: '12:30', title: 'Project Presentations', desc: 'Fiecare echipă prezintă soluția în fața juriului — ~5 minute prezentare + Q&A.', type: 'ceremony' },
      { time: '15:00', title: 'Jury Deliberation', desc: 'Juriul deliberează și stabilește câștigătorii pe baza criteriilor anunțate.', type: 'logistics' },
      { time: '16:00', title: '🏆 Prize Ceremony', desc: 'Ceremonia de premiere — anunțarea câștigătorilor și înmânarea premiilor.', type: 'ceremony', highlight: true },
      { time: '17:00', title: 'Networking Session', desc: 'Sesiune de networking cu reprezentanții clubului, sponsorii și mentorii.', type: 'logistics' },
      { time: '19:00', title: 'Venue Closes', desc: 'Închiderea oficială a evenimentului. La revedere și mulțumim!', type: 'logistics' },
    ],
  },
}

const TYPE_LABEL = {
  workshop: 'workshop',
  coding: 'coding',
  ceremony: 'event',
  break: 'pauză',
  logistics: 'info',
  deadline: 'deadline',
}

export default function Timeline() {
  const [activeDay, setActiveDay] = useState('vineri')
  const day = schedule[activeDay]

  return (
    <section className="section section-dark" id="detalii">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// program</span>
          <h2>48 de Ore de Inovație</h2>
          <p className="section-subtitle">
            📍 Sediu MSG · Strada Croitorilor, nr. 12-14, Cluj-Napoca
          </p>
        </Reveal>

        <Reveal className={styles.tabs}>
          {Object.entries(schedule).map(([key, val]) => (
            <button
              key={key}
              className={`${styles.tab} ${activeDay === key ? styles.tabActive : ''}`}
              onClick={() => setActiveDay(key)}
            >
              <span className={styles.tabEmoji}>{val.emoji}</span>
              <strong>{val.label}</strong>
              <span className={styles.tabDate}>{val.date}</span>
            </button>
          ))}
        </Reveal>

        <div className={styles.eventList} key={activeDay}>
          {day.events.map((ev, i) => (
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
                    {TYPE_LABEL[ev.type]}
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
