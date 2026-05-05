import { useConfig } from '../context/ConfigContext'
import s from '../pages/Dashboard.module.css'

export default function MentorBookingsView({ mentorId }) {
  const { config } = useConfig()
  const bookings = (config.bookings || []).filter(b => b.mentorId === mentorId)
  const fmtDT = (dt) => {
    try { return new Date(dt).toLocaleString('ro-RO', { weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) }
    catch { return dt }
  }

  if (bookings.length === 0) return <div className={s.card} style={{ color:'#555' }}>No bookings yet.</div>

  return (
    <div className={s.card}>
      <div className={s.sectionTitle}>Incoming bookings ({bookings.length})</div>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Team</th>
            <th>Location / Table</th>
            <th>Slot</th>
            <th>Duration</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => {
            const team = (config.teams || []).find(t => t.id === b.teamId)
            const mentor = (config.mentors || []).find(m => m.id === mentorId)
            const slot = (mentor?.slots || []).find(sl => sl.id === b.slotId)
            return (
              <tr key={b.id}>
                <td><strong>{team?.name || b.teamId}</strong></td>
                <td style={{ color:'#a78bfa' }}>{team?.tableLocation || '—'}</td>
                <td style={{ fontFamily:'Space Mono,monospace', fontSize:'.82rem' }}>{slot ? fmtDT(slot.datetime) : b.slotId}</td>
                <td>{slot?.durationMin || '—'} min</td>
                <td style={{ color:'#888' }}>{b.note || '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
