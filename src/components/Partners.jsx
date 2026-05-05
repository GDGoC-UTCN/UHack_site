import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Partners.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function PartnerLogo({ src, alt, fallback }) {
  return (
    <div className={styles.logoWrap}>
      <img
        src={src}
        alt={alt}
        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className={styles.fallback}><span>{fallback}</span></div>
    </div>
  )
}

export default function Partners() {
  return (
    <section className="section" id="parteneri">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// susținuți de</span>
          <h2>Parteneri & Sponsori</h2>
        </Reveal>

        {/* Main organizers */}
        <Reveal className={styles.tier}>
          <div className={styles.tierLabel}>Organizatori Principali</div>
          <div className={`${styles.row} ${styles.rowMain}`}>
            <div className={styles.partnerCard}>
              <PartnerLogo src="/assets/img/partners/ucluj.png" alt="FC Universitatea Cluj" fallback='FC "U" Cluj' />
              <p>FC Universitatea Cluj</p>
            </div>
            <span className={styles.x}>×</span>
            <div className={styles.partnerCard}>
              <PartnerLogo src="/assets/img/partners/gdgoc.png" alt="GDGoC UTCN" fallback="GDGoC UTCN" />
              <p>GDGoC UTCN</p>
            </div>
          </div>
        </Reveal>

        {/* Supported by */}
        <Reveal className={styles.tier}>
          <div className={styles.tierLabel}>Susținut de</div>
          <div className={styles.row}>
            <div className={styles.partnerCard}>
              <PartnerLogo src="/assets/img/partners/ucluj-site.png" alt="ucluj.ro" fallback="ucluj.ro" />
              <p>ucluj.ro</p>
            </div>
            <div className={styles.partnerCard}>
              <PartnerLogo src="/assets/img/partners/utcn.png" alt="UTCN" fallback="UTCN" />
              <p>Universitatea Tehnică Cluj-Napoca</p>
            </div>
          </div>
        </Reveal>

        {/* Sponsors */}
        <Reveal className={styles.tier}>
          <div className={styles.tierLabel}>Sponsori</div>
          <div className={styles.row}>
            {['Gold Sponsor', 'Silver Sponsor', 'Bronze Sponsor'].map(s => (
              <div className={styles.partnerCard} key={s}>
                <div className={`${styles.logoWrap} ${styles.sponsorSlot}`}>
                  <div className={styles.fallback}><span>{s}</span></div>
                </div>
                <p>Sponsor</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className={styles.sponsorCta}>
          <p>Vrei să devii partener al "U" Hack?</p>
          <a href="mailto:gdgoc.utcn@gmail.com" className="btn btn-outline">Contactează-ne</a>
        </Reveal>
      </div>
    </section>
  )
}
