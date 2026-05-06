import { useCountdown } from '../hooks/useCountdown'
import { useConfig } from '../context/ConfigContext'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './Hero.module.css'

export default function Hero() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].hero
  const { days, hours, mins, secs, ended } = useCountdown(
    config.general.countdownTarget || '2026-04-24T17:30:00'
  )

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <header className={styles.hero} id="hero">
      <div className={styles.bg}>
        <div className={styles.grid} />
        <div className={styles.noise} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>{tr.tag}</div>
        <h1 className={styles.title}>
          <span className={styles.titleQuote}>{tr.title1}</span>
          <span className={styles.titleMain}>{tr.title2}</span>
          <span className={styles.titleSub}>
            Code in Black <span className={styles.amp}>&amp;</span> White
          </span>
        </h1>

        <p className={styles.desc}>{tr.subtitle}</p>

        <div className={styles.actions}>
          <a
            href={config.general?.registrationFormUrl || '#inscriere'}
            className="btn btn-primary"
            onClick={config.general?.registrationFormUrl ? undefined : (e) => scrollTo(e, '#inscriere')}
            target={config.general?.registrationFormUrl ? '_blank' : undefined}
            rel={config.general?.registrationFormUrl ? 'noopener noreferrer' : undefined}
          >
            {tr.cta1}
          </a>
          <a href="#despre" className="btn btn-outline" onClick={(e) => scrollTo(e, '#despre')}>
            {tr.cta2}
          </a>
        </div>
      </div>

      <div className={styles.countdownWrap}>
        <div className={styles.countdownLabel}>
          {ended ? tr.ended : (lang === 'ro' ? 'Timp până la eveniment' : 'Time until event')}
        </div>
        <div className={styles.countdown}>
          {[
            { val: days,  label: tr.days },
            { val: hours, label: tr.hours },
            { val: mins,  label: tr.mins },
            { val: secs,  label: tr.secs },
          ].map((item, i) => (
            <>
              <div className={styles.cdBlock} key={item.label}>
                <span>{item.val}</span>
                <small>{item.label}</small>
              </div>
              {i < 3 && <div className={styles.cdSep} key={`sep-${i}`}>:</div>}
            </>
          ))}
        </div>
      </div>

      <a href="#despre" className={styles.scrollArrow} onClick={(e) => scrollTo(e, '#despre')} aria-label="Scroll down">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </header>
  )
}
