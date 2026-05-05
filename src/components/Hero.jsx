import { useCountdown } from '../hooks/useCountdown'
import styles from './Hero.module.css'

export default function Hero() {
  const { days, hours, mins, secs, ended } = useCountdown('2026-04-24T14:00:00')

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
        <div className={styles.badge}>24 – 26 Aprilie 2026 · Cluj-Napoca</div>

        <h1 className={styles.title}>
          <span className={styles.titleQuote}>"U"</span>
          <span className={styles.titleMain}>HACK!</span>
          <span className={styles.titleSub}>
            Code in Black <span className={styles.amp}>&amp;</span> White
          </span>
        </h1>

        <p className={styles.desc}>
          Prima colaborare din România între un club de fotbal de performanță și o
          comunitate tech universitară.
          <br />
          <strong>48 de ore · 120 de studenți · soluții reale</strong>
        </p>

        <div className={styles.actions}>
          <a href="#inscriere" className="btn btn-primary" onClick={(e) => scrollTo(e, '#inscriere')}>
            Înscrie-te acum
          </a>
          <a href="#despre" className="btn btn-outline" onClick={(e) => scrollTo(e, '#despre')}>
            Află mai mult
          </a>
        </div>
      </div>

      <div className={styles.countdownWrap}>
        <div className={styles.countdownLabel}>
          {ended ? '🎉 Evenimentul este în desfășurare!' : 'Timp până la eveniment'}
        </div>
        <div className={styles.countdown}>
          {[
            { val: days, label: 'Zile' },
            { val: hours, label: 'Ore' },
            { val: mins, label: 'Minute' },
            { val: secs, label: 'Secunde' },
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
