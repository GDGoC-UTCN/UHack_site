import { useState } from 'react'
import { useConfig } from '../context/ConfigContext'
import ImageUpload from './ImageUpload'
import s from '../pages/Dashboard.module.css'

export default function MentorProfileEditor({ mentorId, onSaved }) {
  const { config, updateSection } = useConfig()
  const mentor = (config.mentors || []).find(m => m.id === mentorId) || {}
  const [form, setForm] = useState({
    name:      mentor.name      || '',
    bio:       mentor.bio       || '',
    linkedin:  mentor.linkedin  || '',
    photo:     mentor.photo     || '',
    expertise: (mentor.expertise || []).join(', '),
  })
  const [toast, setToast] = useState(false)

  const save = () => {
    const updated = {
      ...mentor,
      name:      form.name,
      bio:       form.bio,
      linkedin:  form.linkedin,
      photo:     form.photo,
      expertise: form.expertise.split(',').map(s => s.trim()).filter(Boolean),
    }
    updateSection('mentors', (config.mentors || []).map(m => m.id === mentorId ? updated : m))
    setToast(true); setTimeout(() => setToast(false), 2000)
    if (onSaved) onSaved()
  }

  return (
    <div>
      <div className={s.grid2}>
        <div className={s.field}>
          <label>Name</label>
          <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div className={s.field}>
          <label>LinkedIn URL</label>
          <input value={form.linkedin} onChange={e => setForm(f => ({...f, linkedin: e.target.value}))} />
        </div>
        <div className={`${s.field} ${s.full}`}>
          <label>Bio</label>
          <textarea value={form.bio} onChange={e => setForm(f => ({...f, bio: e.target.value}))} />
        </div>
        <div className={s.field}>
          <label>Expertise (comma-separated)</label>
          <input value={form.expertise} placeholder="AI, Agents, Firebase" onChange={e => setForm(f => ({...f, expertise: e.target.value}))} />
        </div>
      </div>

      <ImageUpload
        label="Profile Photo"
        value={form.photo}
        onChange={v => setForm(f => ({...f, photo: v}))}
        shape="circle"
      />

      <div className={s.tagRow}>
        {form.expertise.split(',').map(e => e.trim()).filter(Boolean).map(e => <span key={e} className={s.tag}>{e}</span>)}
      </div>

      <button className={`${s.btn} ${s.btnPrimary}`} style={{ marginTop:'1rem' }} onClick={save}>Save Profile</button>
      {toast && <div className={s.toast}>✓ Profile saved</div>}
    </div>
  )
}
