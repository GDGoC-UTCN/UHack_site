import React, { useState } from 'react'
import { useConfig } from '../context/ConfigContext'

export default function MentorBooking({ team }) {
  const { config, setFullConfig } = useConfig()
  const [mentorId, setMentorId] = useState((config.mentors && config.mentors[0] && config.mentors[0].id) || '')
  const [slot, setSlot] = useState('')

  const submit = () => {
    if (!team) return alert('No team')
    const id = `b${Date.now()}`
    const booking = { id, teamId: team.id, mentorId, slot, note: '' }
    const next = { ...config, bookings: [...(config.bookings || []), booking] }
    setFullConfig(next)
    alert('Booked — saved in localStorage')
  }

  return (
    <div>
      <div style={{ marginBottom: '.6rem' }}>
        <label>Mentor</label>
        <select value={mentorId} onChange={e => setMentorId(e.target.value)}>
          {(config.mentors || []).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: '.6rem' }}>
        <label>Slot (ISO)</label>
        <input value={slot} onChange={e => setSlot(e.target.value)} placeholder="2026-04-25T12:00" />
      </div>

      <button onClick={submit}>Book Mentor</button>
    </div>
  )
}
