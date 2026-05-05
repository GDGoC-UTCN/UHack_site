import { useCounter } from '../hooks/useCounter'
import { useApp } from '../context/AppContext'
import { t } from '../i18n'
import styles from './StatsBar.module.css'

function StatItem({ target, unit, label }) {
  const [count, ref] = useCounter(target)
  return (
    <div className={styles.item} ref={ref}>
      <div className={styles.num}>
        <span>{count}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default function StatsBar() {
  const { lang } = useApp()
  const tr = t[lang].stats
  return (
    <section className={styles.bar}>
      <StatItem target={48}  unit="h"  label={tr.durationLabel} />
      <div className={styles.divider} />
      <StatItem target={120} unit="+"  label={tr.participantsLabel} />
      <div className={styles.divider} />
      <StatItem target={24}  unit=""   label={tr.teamsLabel} />
      <div className={styles.divider} />
      <StatItem target={1}   unit="st" label={tr.firstLabel} />
    </section>
  )
}
