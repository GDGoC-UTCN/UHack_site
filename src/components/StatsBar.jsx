import { useCounter } from '../hooks/useCounter'
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
  return (
    <section className={styles.bar}>
      <StatItem target={48} unit="h" label="Hackathon" />
      <div className={styles.divider} />
      <StatItem target={120} unit="+" label="Participanți" />
      <div className={styles.divider} />
      <StatItem target={24} unit="" label="Echipe" />
      <div className={styles.divider} />
      <StatItem target={1} unit="st" label="în România" />
    </section>
  )
}
