import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import s from '../pages/Dashboard.module.css'

export default function MentorSlotsEditor({ mentorId }) {
  const { config, updateSection } = useConfig()
  const mentor = (config.mentors || []).find(m => m.id === mentorId) || {}
  const slots = mentor.slots || []
  const bookings = config.bookings || []

  const [newDatetime, setNewDatetime] = useState('')
  const [newDuration, setNewDuration] = useState('30')
  const [toast, setToast] = useState('')

  const saveSlots = (newSlots) => {
    updateSection('mentors', (config.mentors || []).map(m => m.id === mentorId ? { ...m, slots: newSlots } : m))
  }

  const addSlot = () => {
    if (!newDatetime) return
    const slot = { id: `sl${Date.now()}`, datetime: newDatetime, durationMin: parseInt(newDuration) || 30 }
    saveSlots([...slots, slot])
    setNewDatetime(''); setNewDuration('30')
    setToast('Slot added'); setTimeout(() => setToast(''), 2000)
  }

  const removeSlot = (id) => {
    if (bookings.find(b => b.slotId === id)) { alert("This slot is already booked — cannot remove it."); return }
    saveSlots(slots.filter(s => s.id !== id))
  }

  const isBooked = (slotId) => bookings.some(b => b.slotId === slotId)

  const fmtDT = (dt) => {
    try { return new Date(dt).toLocaleString('ro-RO', { weekday:'short', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) }
    catch { return dt }
  }

  return (
    <div>
      <div className={s.card}>
        <div className={s.sectionTitle}>Add availability slot</div>
        <div className={s.grid2}>
          <div className={s.field}>
            <label>Date & Time</label>
            <input type="datetime-local" value={newDatetime} onChange={e => setNewDatetime(e.target.value)} />
          </div>
          <div className={s.field}>
            <label>Duration (minutes)</label>
            <input type="number" value={newDuration} min="15" step="15" onChange={e => setNewDuration(e.target.value)} />
          </div>
        </div>
        <button className={`${s.btn} ${s.btnPrimary}`} style={{ marginTop:'.8rem' }} onClick={addSlot}>+ Add Slot</button>
      </div>

      <div className={s.card}>
        <div className={s.sectionTitle}>Your availability slots</div>
        {slots.length === 0 && <div style={{ color:'#555' }}>No slots added yet.</div>}
        {slots.map(sl => {
          const booked = isBooked(sl.id)
          const booking = bookings.find(b => b.slotId === sl.id)
          const team = booking ? (config.teams || []).find(t => t.id === booking.teamId) : null
          return (
            <div key={sl.id} className={s.slotRow}>
              <span className={`${s.slotBadge} ${booked ? s.slotBooked : ''}`}>{fmtDT(sl.datetime)}</span>
              <span style={{ color:'#555', fontSize:'.8rem' }}>{sl.durationMin} min</span>
              {booked
                ? <span style={{ color:'#fbbf24', fontSize:'.82rem' }}>📌 Booked by <strong>{team?.name || booking.teamId}</strong> — {team?.tableLocation || 'no location set'}</span>
                : <span style={{ color:'#34d399', fontSize:'.82rem' }}>✓ Available</span>
              }
              {!booked && <button className={`${s.btn} ${s.btnDanger}`} style={{ padding:'.3rem .65rem', fontSize:'.78rem' }} onClick={() => removeSlot(sl.id)}>×</button>}
            </div>
          )
        })}
      </div>
      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  )
}
