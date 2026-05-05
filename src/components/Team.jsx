import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Team.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const members = [
  { name: 'Ștefania Mozacu',       role: 'Coordonator',          initials: 'ȘM', img: '/assets/img/team/stefania.jpg' },
  { name: 'Szecsi Antonia',        role: 'Coordonator',          initials: 'SA', img: '/assets/img/team/antonia.jpg' },
  { name: 'Alexandru Mihoc',       role: 'Coordonator',          initials: 'AM', img: '/assets/img/team/alexandru.jpg' },
  { name: 'Raisa Butuza',          role: 'Coordonator',          initials: 'RB', img: '/assets/img/team/raisa.jpg' },
  { name: 'Alexandra Homiuc',      role: 'Coordonator',          initials: 'AH', img: '/assets/img/team/alexandra.jpg' },
  { name: 'Ioana Ghineț',          role: 'Coordonator',          initials: 'IG', img: '/assets/img/team/ioana.jpg' },
  { name: 'prof. ing. Adrian Sabou', role: 'Coordonator Academic', initials: 'AS', img: '/assets/img/team/sabou.jpg' },
]

function MemberCard({ name, role, initials, img }) {
  return (
    <Reveal className={styles.card}>
      <div className={styles.avatar}>
        <img
          src={img}
          alt={name}
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        <div className={styles.fallback}>{initials}</div>
      </div>
      <h3>{name}</h3>
      <span className={styles.role}>{role}</span>
    </Reveal>
  )
}

export default function Team() {
  return (
    <section className="section section-dark" id="echipa">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// oamenii din spate</span>
          <h2>Echipa Organizatoare</h2>
          <p className="section-subtitle">
            GDGoC UTCN — fondată în noiembrie 2025, parte din rețeaua globală Google Developer Groups on Campus
          </p>
        </Reveal>

        <div className={styles.grid}>
          {members.map(m => <MemberCard key={m.name} {...m} />)}
          <Reveal className={`${styles.card} ${styles.volunteers}`}>
            <div className={`${styles.avatar} ${styles.avatarGroup}`}>
              <span>30+</span>
            </div>
            <h3>Voluntari GDGoC</h3>
            <span className={styles.role}>Organizare & Suport</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
