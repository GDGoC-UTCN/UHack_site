import { useState, useCallback } from 'react'
import { useConfig } from '../context/ConfigContext'
import { DEFAULT_CONFIG } from '../config/defaults'
import ImageUpload from '../components/ImageUpload'
import s from './AdminPage.module.css'

// ─────────────────────────────────────────────────────
// Tiny helpers
// ─────────────────────────────────────────────────────
function Field({ label, value, onChange, type = 'text', full = false }) {
  return (
    <div className={`${s.field} ${full ? s.formFull : ''}`}>
      <label>{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  )
}
function TextArea({ label, value, onChange, full = false }) {
  return (
    <div className={`${s.field} ${full ? s.formFull : ''}`}>
      <label>{label}</label>
      <textarea value={value || ''} onChange={e => onChange(e.target.value)} />
    </div>
  )
}
function SelectField({ label, value, onChange, options }) {
  return (
    <div className={s.field}>
      <label>{label}</label>
      <select value={value || ''} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
function Toggle({ label, checked, onChange }) {
  return (
    <div className={`${s.toggleRow}`}>
      <label>{label}</label>
      <label className={s.toggle}>
        <input type="checkbox" checked={!!checked} onChange={e => onChange(e.target.checked)} />
        <span className={s.toggleSlider} />
      </label>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// TAB: General
// ─────────────────────────────────────────────────────
function GeneralTab() {
  const { config, updateSection } = useConfig()
  const g = config.general
  const upd = (key, val) => updateSection('general', { [key]: val })

  return (
    <>
      <div className={s.sectionTitle}>General</div>
      <div className={s.formGrid}>
        <Field label="Event Name" value={g.eventName} onChange={v => upd('eventName', v)} />
        <Field label="Edition" value={g.edition} onChange={v => upd('edition', v)} />
        <Field label="Countdown Target (ISO)" value={g.countdownTarget} onChange={v => upd('countdownTarget', v)} />
        <Field label="Contact Email" value={g.emailContact} onChange={v => upd('emailContact', v)} />
        <TextArea label="Location (RO)" value={g.locationRO} onChange={v => upd('locationRO', v)} full />
        <TextArea label="Location (EN)" value={g.locationEN} onChange={v => upd('locationEN', v)} full />
        <Field label="Instagram URL" value={g.instagramUrl} onChange={v => upd('instagramUrl', v)} full />
        <Field label="LinkedIn URL" value={g.linkedinUrl} onChange={v => upd('linkedinUrl', v)} full />
        <Field label="Facebook URL" value={g.facebookUrl} onChange={v => upd('facebookUrl', v)} full />
        <Field label="Registration Form URL" value={g.registrationFormUrl} onChange={v => upd('registrationFormUrl', v)} full />
        <Field label="Admin Password" value={g.adminPassword} onChange={v => upd('adminPassword', v)} type="text" />
        <Toggle label="Registration Open" checked={g.registrationOpen} onChange={v => upd('registrationOpen', v)} />
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Schedule
// ─────────────────────────────────────────────────────
const EVENT_TYPES = ['logistics', 'ceremony', 'workshop', 'coding', 'break', 'deadline']

function EventCard({ event, onChange, onRemove }) {
  const upd = (k, v) => onChange({ ...event, [k]: v })
  return (
    <div className={s.eventCard}>
      <div className={s.eventCardHead}>
        <span className={s.eventTime}>{event.time}</span>
        <span className={s.eventTitle}>{event.titleRO || '(no title)'}</span>
        <span className={s.eventType}>{event.type}</span>
      </div>
      <div className={s.eventCardGrid}>
        <Field label="Time (HH:MM)" value={event.time} onChange={v => upd('time', v)} />
        <SelectField label="Type" value={event.type} onChange={v => upd('type', v)} options={EVENT_TYPES} />
        <Field label="Title RO" value={event.titleRO} onChange={v => upd('titleRO', v)} />
        <Field label="Title EN" value={event.titleEN} onChange={v => upd('titleEN', v)} />
        <TextArea label="Desc RO" value={event.descRO} onChange={v => upd('descRO', v)} />
        <TextArea label="Desc EN" value={event.descEN} onChange={v => upd('descEN', v)} />
        <Field label="Google Meet / Link (optional)" value={event.link} onChange={v => upd('link', v)} full />
      </div>
      <div className={s.eventCardActions}>
        <button className={s.btnRemove} onClick={onRemove}>Remove</button>
      </div>
    </div>
  )
}

function ScheduleTab() {
  const { config, updateSection } = useConfig()
  const [day, setDay] = useState('vineri')
  const days = ['vineri', 'sambata', 'duminica']
  const events = config.schedule[day] || []

  const updateEvents = useCallback((newEvents) => {
    updateSection('schedule', { ...config.schedule, [day]: newEvents })
  }, [config.schedule, day, updateSection])

  const updateEvent = (idx, evt) => {
    const copy = [...events]; copy[idx] = evt; updateEvents(copy)
  }
  const removeEvent = (idx) => {
    updateEvents(events.filter((_, i) => i !== idx))
  }
  const addEvent = () => {
    updateEvents([...events, {
      id: `${day[0]}${Date.now()}`, time: '12:00', type: 'coding',
      titleRO: '', titleEN: '', descRO: '', descEN: '', link: '',
    }])
  }

  return (
    <>
      <div className={s.sectionTitle}>Schedule</div>
      <div className={s.dayTabs}>
        {days.map(d => (
          <button key={d} className={`${s.dayTab} ${day === d ? s.dayTabActive : ''}`} onClick={() => setDay(d)}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </button>
        ))}
      </div>
      {events.map((ev, i) => (
        <EventCard key={ev.id || i} event={ev} onChange={e => updateEvent(i, e)} onRemove={() => removeEvent(i)} />
      ))}
      <button className={s.btnAdd} onClick={addEvent}>+ Add Event</button>
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Themes
// ─────────────────────────────────────────────────────
function ThemeCard({ theme, onChange }) {
  const upd = (k, v) => onChange({ ...theme, [k]: v })
  const updBullet = (arr, idx, val) => { const c = [...arr]; c[idx] = val; return c }
  const addBullet  = (arr) => [...arr, '']
  const delBullet  = (arr, idx) => arr.filter((_, i) => i !== idx)

  return (
    <div className={s.themeCard}>
      <div className={s.themeCardHead}>
        <span className={s.themeNum}>{theme.number}</span>
        <span style={{ fontSize: '1.5rem' }}>{theme.icon}</span>
        <span style={{ flex: 1, fontWeight: 600 }}>{theme.titleRO}</span>
        <Field label="Icon Emoji" value={theme.icon} onChange={v => upd('icon', v)} />
        <Field label="Accent Color" value={theme.color} onChange={v => upd('color', v)} type="color" />
      </div>
      <div className={s.themeGrid}>
        <Field label="Title RO" value={theme.titleRO} onChange={v => upd('titleRO', v)} />
        <Field label="Title EN" value={theme.titleEN} onChange={v => upd('titleEN', v)} />
        <Field label="Tagline RO" value={theme.taglineRO} onChange={v => upd('taglineRO', v)} />
        <Field label="Tagline EN" value={theme.taglineEN} onChange={v => upd('taglineEN', v)} />
        <TextArea label="Desc RO" value={theme.descRO} onChange={v => upd('descRO', v)} />
        <TextArea label="Desc EN" value={theme.descEN} onChange={v => upd('descEN', v)} />
      </div>

      <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div className={s.field}><label>Bullets RO</label></div>
          <div className={s.bulletList}>
            {(theme.bulletsRO || []).map((b, i) => (
              <div key={i} className={s.bulletRow}>
                <input value={b} onChange={e => upd('bulletsRO', updBullet(theme.bulletsRO, i, e.target.value))} />
                <button className={s.bulletDel} onClick={() => upd('bulletsRO', delBullet(theme.bulletsRO, i))}>×</button>
              </div>
            ))}
            <button className={s.btnAdd} onClick={() => upd('bulletsRO', addBullet(theme.bulletsRO))}>+ Add</button>
          </div>
        </div>
        <div>
          <div className={s.field}><label>Bullets EN</label></div>
          <div className={s.bulletList}>
            {(theme.bulletsEN || []).map((b, i) => (
              <div key={i} className={s.bulletRow}>
                <input value={b} onChange={e => upd('bulletsEN', updBullet(theme.bulletsEN, i, e.target.value))} />
                <button className={s.bulletDel} onClick={() => upd('bulletsEN', delBullet(theme.bulletsEN, i))}>×</button>
              </div>
            ))}
            <button className={s.btnAdd} onClick={() => upd('bulletsEN', addBullet(theme.bulletsEN))}>+ Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThemesTab() {
  const { config, updateSection } = useConfig()
  const themes = config.themes || []
  const upd = (i, t) => { const c = [...themes]; c[i] = t; updateSection('themes', c) }

  return (
    <>
      <div className={s.sectionTitle}>Themes</div>
      {themes.map((th, i) => <ThemeCard key={th.id || i} theme={th} onChange={t => upd(i, t)} />)}
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Submission
// ─────────────────────────────────────────────────────
function SubmissionTab() {
  const { config, updateSection } = useConfig()
  const sub = config.submission
  const upd = (k, v) => updateSection('submission', { [k]: v })

  const updRule = (arr, i, v) => { const c = [...arr]; c[i] = v; return c }
  const addRule  = (arr) => [...arr, '']
  const delRule  = (arr, i) => arr.filter((_, j) => j !== i)

  return (
    <>
      <div className={s.sectionTitle}>Submission</div>
      <div className={s.formGrid}>
        <Field label="Deadline (RO)" value={sub.deadlineRO} onChange={v => upd('deadlineRO', v)} />
        <Field label="Deadline (EN)" value={sub.deadlineEN} onChange={v => upd('deadlineEN', v)} />
        <Field label="Form URL" value={sub.formUrl} onChange={v => upd('formUrl', v)} full />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {['rulesRO', 'rulesEN'].map(key => (
          <div key={key}>
            <div className={s.field}><label>{key === 'rulesRO' ? 'Rules RO' : 'Rules EN'}</label></div>
            <div className={s.bulletList}>
              {(sub[key] || []).map((r, i) => (
                <div key={i} className={s.bulletRow}>
                  <input value={r} onChange={e => upd(key, updRule(sub[key], i, e.target.value))} />
                  <button className={s.bulletDel} onClick={() => upd(key, delRule(sub[key], i))}>×</button>
                </div>
              ))}
              <button className={s.btnAdd} onClick={() => upd(key, addRule(sub[key]))}>+ Add Rule</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Partners
// ─────────────────────────────────────────────────────
function PartnerRow({ partner, onChange, onRemove }) {
  return (
    <div className={s.listCard}>
      <div className={s.listCardGrid}>
        <Field label="Name" value={partner.name} onChange={v => onChange({ ...partner, name: v })} />
        {partner.tier !== undefined && (
          <SelectField label="Tier" value={partner.tier} onChange={v => onChange({ ...partner, tier: v })} options={['Gold', 'Silver', 'Bronze']} />
        )}
      </div>
      <ImageUpload
        label="Logo"
        value={partner.logo}
        onChange={v => onChange({ ...partner, logo: v })}
        shape="rect"
      />
      <button className={s.btnRemove} onClick={onRemove}>Remove</button>
    </div>
  )
}

function PartnersTab() {
  const { config, updateSection } = useConfig()
  const partners = config.partners

  const updGroup = (group, newArr) => updateSection('partners', { ...partners, [group]: newArr })
  const addPartner = (group, withTier = false) => updGroup(group, [...(partners[group] || []), { id: Date.now().toString(), name: '', logo: '', ...(withTier ? { tier: 'Gold' } : {}) }])

  return (
    <>
      <div className={s.sectionTitle}>Partners</div>

      {[
        { key: 'organizers', label: 'Organizers', withTier: false },
        { key: 'supporters', label: 'Supporters', withTier: false },
        { key: 'sponsors',   label: 'Sponsors',   withTier: true },
      ].map(({ key, label, withTier }) => (
        <div key={key} style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: '.75rem', fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</div>
          {(partners[key] || []).map((p, i) => (
            <PartnerRow
              key={p.id || i}
              partner={p}
              onChange={np => { const c = [...partners[key]]; c[i] = np; updGroup(key, c) }}
              onRemove={() => updGroup(key, partners[key].filter((_, j) => j !== i))}
            />
          ))}
          <button className={s.btnAdd} onClick={() => addPartner(key, withTier)}>+ Add {label.slice(0, -1)}</button>
        </div>
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Team
// ─────────────────────────────────────────────────────
function TeamTab() {
  const { config, updateSection } = useConfig()
  const members = config.team || []

  const upd = (i, m) => { const c = [...members]; c[i] = m; updateSection('team', c) }
  const add = () => updateSection('team', [...members, { id: Date.now().toString(), name: '', role: '', initials: '', img: '' }])
  const del = (i) => updateSection('team', members.filter((_, j) => j !== i))

  return (
    <>
      <div className={s.sectionTitle}>Team</div>
      {members.map((m, i) => (
        <div key={m.id || i} className={s.listCard}>
          <div className={s.listCardGrid}>
            <Field label="Name" value={m.name} onChange={v => upd(i, { ...m, name: v })} />
            <Field label="Role" value={m.role} onChange={v => upd(i, { ...m, role: v })} />
            <Field label="Initials" value={m.initials} onChange={v => upd(i, { ...m, initials: v })} />
          </div>
          <ImageUpload
            label="Photo"
            value={m.img}
            onChange={v => upd(i, { ...m, img: v })}
            shape="circle"
          />
          <button className={s.btnRemove} onClick={() => del(i)}>Remove</button>
        </div>
      ))}
      <button className={s.btnAdd} onClick={add}>+ Add Member</button>
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: FAQ
// ─────────────────────────────────────────────────────
function FAQTab() {
  const { config, updateSection } = useConfig()
  const items = config.faq || []

  const upd = (i, item) => { const c = [...items]; c[i] = item; updateSection('faq', c) }
  const add = () => updateSection('faq', [...items, { id: Date.now().toString(), questionRO: '', answerRO: '', questionEN: '', answerEN: '' }])
  const del = (i) => updateSection('faq', items.filter((_, j) => j !== i))

  return (
    <>
      <div className={s.sectionTitle}>FAQ</div>
      {items.map((item, i) => (
        <div key={item.id || i} className={s.listCard}>
          <div className={s.listCardGrid}>
            <Field label="Question RO" value={item.questionRO} onChange={v => upd(i, { ...item, questionRO: v })} />
            <Field label="Question EN" value={item.questionEN} onChange={v => upd(i, { ...item, questionEN: v })} />
            <TextArea label="Answer RO" value={item.answerRO} onChange={v => upd(i, { ...item, answerRO: v })} />
            <TextArea label="Answer EN" value={item.answerEN} onChange={v => upd(i, { ...item, answerEN: v })} />
          </div>
          <button className={s.btnRemove} onClick={() => del(i)}>Remove</button>
        </div>
      ))}
      <button className={s.btnAdd} onClick={add}>+ Add FAQ Item</button>
    </>
  )
}

// ─────────────────────────────────────────────────────
// TAB: Prizes
// ─────────────────────────────────────────────────────
function PrizesTab() {
  const { config, updateSection } = useConfig()
  const prizes = config.prizes || []

  const upd = (i, p) => { const c = [...prizes]; c[i] = p; updateSection('prizes', c) }
  const add = () => updateSection('prizes', [...prizes, { id: Date.now().toString(), place: '', valueRO: '', valueEN: '', descRO: '', descEN: '' }])
  const del = (i) => updateSection('prizes', prizes.filter((_, j) => j !== i))

  return (
    <>
      <div className={s.sectionTitle}>Prizes</div>
      {prizes.map((p, i) => (
        <div key={p.id || i} className={s.listCard}>
          <div className={s.listCardGrid}>
            <Field label="Place Label (e.g. 🥇 1st Place)" value={p.place} onChange={v => upd(i, { ...p, place: v })} />
            <Field label="Value RO" value={p.valueRO} onChange={v => upd(i, { ...p, valueRO: v })} />
            <Field label="Value EN" value={p.valueEN} onChange={v => upd(i, { ...p, valueEN: v })} />
            <TextArea label="Desc RO" value={p.descRO} onChange={v => upd(i, { ...p, descRO: v })} />
            <TextArea label="Desc EN" value={p.descEN} onChange={v => upd(i, { ...p, descEN: v })} />
          </div>
          <button className={s.btnRemove} onClick={() => del(i)}>Remove</button>
        </div>
      ))}
      <button className={s.btnAdd} onClick={add}>+ Add Prize</button>
    </>
  )
}

// ─────────────────────────────────────────────────────
// Main AdminPage
// ─────────────────────────────────────────────────────
const TABS = ['General', 'Schedule', 'Themes', 'Submission', 'Partners', 'Team', 'FAQ', 'Prizes']

export default function AdminPage() {
  const { config, setFullConfig, resetConfig } = useConfig()
  const [authed, setAuthed]   = useState(() => sessionStorage.getItem('uhack-admin') === '1')
  const [pw, setPw]           = useState('')
  const [pwErr, setPwErr]     = useState('')
  const [tab, setTab]         = useState('General')
  const [toast, setToast]     = useState(false)

  const login = () => {
    if (pw === config.general.adminPassword) {
      sessionStorage.setItem('uhack-admin', '1')
      setAuthed(true)
    } else {
      setPwErr('Incorrect password.')
    }
  }
  const logout = () => {
    sessionStorage.removeItem('uhack-admin')
    setAuthed(false)
  }

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 2000) }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'uhack-config.json'; a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = '.json'
    input.onchange = e => {
      const file = e.target.files[0]; if (!file) return
      const reader = new FileReader()
      reader.onload = ev => { try { setFullConfig(JSON.parse(ev.target.result)); showToast() } catch { alert('Invalid JSON file.') } }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    if (window.confirm('Reset all config to factory defaults?')) { resetConfig(); showToast() }
  }

  if (!authed) {
    return (
      <div className={s.loginWrap}>
        <div className={s.loginCard}>
          <h1>🔒 Admin Panel</h1>
          <p>Enter the admin password to continue.</p>
          <input
            type="password" placeholder="Password"
            value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            autoFocus
          />
          <button onClick={login}>Login</button>
          {pwErr && <div className={s.loginErr}>{pwErr}</div>}
        </div>
      </div>
    )
  }

  const tabContent = {
    General:    <GeneralTab />,
    Schedule:   <ScheduleTab />,
    Themes:     <ThemesTab />,
    Submission: <SubmissionTab />,
    Partners:   <PartnersTab />,
    Team:       <TeamTab />,
    FAQ:        <FAQTab />,
    Prizes:     <PrizesTab />,
  }

  return (
    <div className={s.adminRoot}>
      <div className={s.header}>
        <h1>⚡ UHack Admin Panel</h1>
        <div className={s.headerActions}>
          <button className={s.btnSecondary} onClick={handleImport}>📂 Import JSON</button>
          <button className={s.btnSecondary} onClick={handleExport}>📤 Export JSON</button>
          <button className={s.btnDanger}    onClick={handleReset}>↺ Reset</button>
          <button className={s.btnPrimary}   onClick={showToast}>✓ Saved</button>
          <button className={s.btnLogout}    onClick={logout}>Logout</button>
        </div>
      </div>

      <div className={s.body}>
        <nav className={s.sidebar}>
          {TABS.map(t => (
            <button
              key={t}
              className={`${s.sideTab} ${tab === t ? s.sideTabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
          <hr style={{ borderColor: '#222', margin: '1rem 0' }} />
          <button className={s.sideTab} onClick={() => window.location.hash = ''} style={{ color: '#555' }}>
            ← Back to Site
          </button>
        </nav>

        <main className={s.content}>
          {tabContent[tab]}
        </main>
      </div>

      {toast && <div className={s.toast}>✓ Config saved to localStorage</div>}
    </div>
  )
}
