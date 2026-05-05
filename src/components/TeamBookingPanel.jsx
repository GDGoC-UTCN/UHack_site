import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import s from '../pages/Dashboard.module.css'

export default function TeamBookingPanel({ teamId }) {
  const { config, setFullConfig } = useConfig()
  const [note, setNote] = useState('')
  const [toast, setToast] = useState('')

  const bookings = (config.bookings || []).filter(b => b.teamId === teamId)
  const fmtDT = (dt) => {
    try { return new Date(dt).toLocaleString('ro-RO', { weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) }
    catch { return dt }
  }

  const book = (mentor, slot) => {
    const alreadyBooked = (config.bookings || []).find(b => b.slotId === slot.id)
    if (alreadyBooked) { setToast('This slot is already taken!'); setTimeout(()=>setToast(''),2500); return }
    const myBooking = bookings.find(b => b.mentorId === mentor.id)
    if (myBooking) { setToast(`You already have a booking with ${mentor.name}`); setTimeout(()=>setToast(''),2500); return }
    const booking = { id:`b${Date.now()}`, teamId, mentorId: mentor.id, slotId: slot.id, note }
    const next = { ...config, bookings: [...(config.bookings||[]), booking] }
    setFullConfig(next)
    setToast(`Booked with ${mentor.name} at ${fmtDT(slot.datetime)}`); setTimeout(()=>setToast(''),3000)
    setNote('')
  }

  const cancel = (bookingId) => {
    const next = { ...config, bookings: (config.bookings||[]).filter(b => b.id !== bookingId) }
    setFullConfig(next)
  }

  return (
    <div>
      {/* Note field */}
      <div className={s.card}>
        <div className={`${s.field} ${s.full}`} style={{ marginBottom:'.5rem' }}>
          <label>Booking note (optional — sent to mentor)</label>
          <input value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. We need help with Firebase setup" />
        </div>
      </div>

      {/* Mentors */}
      {(config.mentors || []).map(mentor => {
        const myBooking = bookings.find(b => b.mentorId === mentor.id)
        return (
          <div key={mentor.id} className={s.card}>
            <div style={{ display:'flex', gap:'.8rem', alignItems:'flex-start', marginBottom:'.8rem' }}>
              {mentor.photo
                ? <img src={mentor.photo} style={{ width:52, height:52, borderRadius:'50%', objectFit:'cover' }} alt="" />
                : <div style={{ width:52, height:52, borderRadius:'50%', background:'#222', display:'flex', alignItems:'center', justifyContent:'center', color:'#666', fontSize:'1.1rem' }}>{mentor.name?.[0]}</div>
              }
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700 }}>{mentor.name}</div>
                <div style={{ fontSize:'.82rem', color:'#888', marginBottom:'.35rem' }}>{mentor.bio}</div>
                <div className={s.tagRow}>{(mentor.expertise||[]).map(e=><span key={e} className={s.tag}>{e}</span>)}</div>
                {mentor.linkedin && <a href={mentor.linkedin} target="_blank" style={{ color:'#a78bfa', fontSize:'.8rem' }}>LinkedIn →</a>}
              </div>
            </div>

            {myBooking
              ? (
                <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'.55rem .8rem', background:'#0d1a0d', borderRadius:'7px', border:'1px solid #14532d' }}>
                  <span style={{ color:'#34d399', flex:1 }}>
                    ✓ Booked — slot: <strong>
                      {(mentor.slots||[]).find(sl=>sl.id===myBooking.slotId)
                        ? fmtDT((mentor.slots||[]).find(sl=>sl.id===myBooking.slotId).datetime)
                        : myBooking.slotId}
                    </strong>
                  </span>
                  <button className={`${s.btn} ${s.btnDanger}`} style={{ padding:'.3rem .7rem', fontSize:'.8rem' }} onClick={()=>cancel(myBooking.id)}>Cancel</button>
                </div>
              )
              : (
                <div>
                  <div style={{ fontSize:'.78rem', color:'#666', marginBottom:'.4rem', textTransform:'uppercase', letterSpacing:'.04em' }}>Available slots</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
                    {(mentor.slots||[]).length === 0 && <span style={{ color:'#555', fontSize:'.85rem' }}>No slots available yet.</span>}
                    {(mentor.slots||[]).map(sl => {
                      const taken = (config.bookings||[]).find(b => b.slotId === sl.id)
                      return (
                        <button
                          key={sl.id}
                          disabled={!!taken}
                          className={`${s.btn} ${taken ? s.btnSecondary : s.btnPrimary}`}
                          style={{ fontSize:'.82rem', padding:'.4rem .85rem', opacity: taken ? .4 : 1 }}
                          onClick={() => book(mentor, sl)}
                        >
                          {fmtDT(sl.datetime)} · {sl.durationMin}min {taken ? '(taken)' : ''}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            }
          </div>
        )
      })}
      {toast && <div className={s.toast}>{toast}</div>}
    </div>
  )
}
