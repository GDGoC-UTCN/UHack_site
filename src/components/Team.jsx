import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
import styles from './Team.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const members = [
  { name: 'Ștefania Mozacu',        role: 'Coordonator', initials: 'ȘM', img: '/assets/img/team/stefania.jpg' },
  { name: 'Szecsi Antonia',         role: 'Coordonator', initials: 'SA', img: '/assets/img/team/antonia.jpg' },
  { name: 'Alexandru Mihoc',        role: 'Coordonator', initials: 'AM', img: '/assets/img/team/alexandru.jpg' },
  { name: 'Raisa Butuza',           role: 'Coordonator', initials: 'RB', img: '/assets/img/team/raisa.jpg' },
  { name: 'Alexandra Homiuc',       role: 'Coordonator', initials: 'AH', img: '/assets/img/team/alexandra.jpg' },
  { name: 'Ioana Ghineț',           role: 'Coordonator', initials: 'IG', img: '/assets/img/team/ioana.jpg' },
  { name: 'prof. ing. Adrian Sabou', role: 'Coordonator Academic', initials: 'AS', img: '/assets/img/team/sabou.jpg' },
]

function MemberCard({ name, role, initials, img }) {
  return (
    <Reveal className={styles.card}>
      <div className={styles.avatar}>
        <img src={img} alt={name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
        <div className={styles.fallback}>{initials}</div>
      </div>
      <h3>{name}</h3>
      <span className={styles.role}>{role}</span>
    </Reveal>
  )
}

export default function Team() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].team
  return (
    <section className="section section-dark" id="echipa">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
        </Reveal>
        <div className={styles.grid}>
          {(config.team || members).map(m => <MemberCard key={m.name || m.id} name={m.name} role={m.role} initials={m.initials} img={m.img} />)}
          <Reveal className={`${styles.card} ${styles.volunteers}`}>
            <div className={`${styles.avatar} ${styles.avatarGroup}`}>
              <span>{tr.volunteerCount}</span>
            </div>
            <h3>{tr.volunteerLabel}</h3>
            <span className={styles.role}>{tr.volunteerDesc}</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
