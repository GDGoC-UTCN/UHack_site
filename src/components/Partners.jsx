import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
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
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].partners
  const pt = config.partners || {}
  const organizers = pt.organizers || []
  const supporters = pt.supporters || []
  const sponsors   = pt.sponsors   || []
  const email = (config.general || {}).emailContact || 'gdgoc.utcn@gmail.com'

  return (
    <section className="section" id="parteneri">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
        </Reveal>

        {organizers.length > 0 && (
          <Reveal className={styles.tier}>
            <div className={styles.tierLabel}>{tr.tier1}</div>
            <div className={`${styles.row} ${styles.rowMain}`}>
              {organizers.map((o, i) => (
                <div className={styles.partnerCard} key={o.id || i}>
                  <PartnerLogo src={o.logo} alt={o.name} fallback={o.name} />
                  <p>{o.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {supporters.length > 0 && (
          <Reveal className={styles.tier}>
            <div className={styles.tierLabel}>{tr.tier2}</div>
            <div className={styles.row}>
              {supporters.map((s, i) => (
                <div className={styles.partnerCard} key={s.id || i}>
                  <PartnerLogo src={s.logo} alt={s.name} fallback={s.name} />
                  <p>{s.name}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {sponsors.length > 0 && (
          <Reveal className={styles.tier}>
            <div className={styles.tierLabel}>{tr.tier3}</div>
            <div className={styles.row}>
              {sponsors.map((sp, i) => (
                <div className={styles.partnerCard} key={sp.id || i}>
                  {sp.logo ? (
                    <PartnerLogo src={sp.logo} alt={sp.name} fallback={sp.name || sp.tier} />
                  ) : (
                    <div className={`${styles.logoWrap} ${styles.sponsorSlot}`}>
                      <div className={styles.fallback}><span>{sp.tier || 'Sponsor'}</span></div>
                    </div>
                  )}
                  <p>{sp.name || sp.tier || 'Sponsor'}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal className={styles.sponsorCta}>
          <p>{tr.sponsorDesc}</p>
          <a href={`mailto:${email}`} className="btn btn-outline">{tr.sponsorCta}</a>
        </Reveal>
      </div>
    </section>
  )
}
