import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useConfig } from '../context/ConfigContext'
import MentorProfileEditor from '../components/MentorProfileEditor'
import MentorSlotsEditor from '../components/MentorSlotsEditor'
import MentorBookingsView from '../components/MentorBookingsView'
import TeamBookingPanel from '../components/TeamBookingPanel'
import Chat from '../components/Chat'
import s from './Dashboard.module.css'

// ── Theme picker for teams ────────────────────────────────────────────────────
function ThemePicker({ team, onSave }) {
  const { config, updateSection } = useConfig()
  const themes = config.themes || []
  const [selected, setSelected] = useState(team?.themeId || null)
  const { lang } = { lang: 'ro' }  // default to RO; could be wired to AppContext

  const save = () => {
    const updated = (config.teams || []).map(t => t.id === team.id ? { ...t, themeId: selected } : t)
    updateSection('teams', updated)
    if (onSave) onSave()
  }

  return (
    <div>
      <div className={s.themeGrid}>
        {themes.map(th => (
          <div
            key={th.id}
            className={`${s.themeCard} ${selected === th.id ? s.themeCardActive : ''}`}
            style={{ borderColor: selected === th.id ? (th.color || '#a78bfa') : '#222' }}
            onClick={() => setSelected(th.id)}
          >
            <div className={s.themeIcon}>{th.icon}</div>
            <div className={s.themeTitle} style={{ color: th.color || '#a78bfa' }}>{th.titleRO}</div>
            <div className={s.themeTagline}>{th.taglineRO}</div>
          </div>
        ))}
      </div>
      {selected && (
        <button className={`${s.btn} ${s.btnPrimary}`} style={{ marginTop:'1rem' }} onClick={save}>
          Confirm Theme Selection
        </button>
      )}
    </div>
  )
}

// ── Docs tab ──────────────────────────────────────────────────────────────────
function DocsTab() {
  const { config } = useConfig()
  return (
    <div>
      {(config.documents || []).length === 0 && <div style={{ color:'#555' }}>No documents uploaded yet.</div>}
      {(config.documents || []).map(d => (
        <div key={d.id} className={s.docRow}>
          <span>📄</span>
          <a href={d.url} target="_blank" rel="noopener noreferrer">{d.title}</a>
        </div>
      ))}
    </div>
  )
}

// ── Overview tab for teams ─────────────────────────────────────────────────────
function TeamOverview({ team }) {
  const { config } = useConfig()
  const theme = team?.themeId ? (config.themes || []).find(t => t.id === team.themeId) : null
  return (
    <div className={s.card}>
      <div className={s.grid2}>
        <div className={s.field}>
          <label>Team name</label>
          <div>{team?.name || '—'}</div>
        </div>
        <div className={s.field}>
          <label>Table / Location</label>
          <div style={{ color:'#a78bfa' }}>{team?.tableLocation || '—'}</div>
        </div>
        <div className={s.field}>
          <label>Selected theme</label>
          <div>
            {theme
              ? <span>{theme.icon} {theme.titleRO}</span>
              : <span style={{ color:'#555' }}>Not selected yet</span>
            }
          </div>
        </div>
        <div className={s.field}>
          <label>Members</label>
          <div>{(team?.members || []).map(m => m.name).join(', ') || '—'}</div>
        </div>
      </div>
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, logout } = useAuth()
  const { config } = useConfig()
  const [tab, setTab] = useState(null)

  if (!user) {
    return (
      <div style={{ padding:'3rem', textAlign:'center', color:'#888' }}>
        Not logged in. <a href="#login" style={{ color:'#a78bfa' }}>Go to Login</a>
      </div>
    )
  }

  const team = user.teamId ? (config.teams || []).find(t => t.id === user.teamId) : null
  const isMentor = user.role === 'mentor'
  const isTeam   = user.role === 'team'
  const isJudge  = user.role === 'judge'

  // Chat rooms for this user
  const chatRooms = isTeam
    ? (config.bookings || []).filter(b => b.teamId === user.teamId).map(b => ({ id:`${b.teamId}__${b.mentorId}`, teamId: b.teamId, mentorId: b.mentorId }))
    : isMentor
    ? (config.bookings || []).filter(b => b.mentorId === user.mentorId).map(b => ({ id:`${b.teamId}__${b.mentorId}`, teamId: b.teamId, mentorId: b.mentorId }))
    : []

  const mentorTabs = [
    { key: 'profile',   label: '👤 Profile' },
    { key: 'slots',     label: '��️  Availability' },
    { key: 'bookings',  label: '📋 Bookings' },
    { key: 'chat',      label: '💬 Chat' },
  ]
  const teamTabs = [
    { key: 'overview',  label: '🏠 Overview' },
    { key: 'theme',     label: '🎯 Choose Theme' },
    { key: 'book',      label: '👨‍🏫 Book Mentor' },
    { key: 'chat',      label: '💬 Chat' },
    { key: 'docs',      label: '📁 Documents' },
  ]
  const judgeTabs = [
    { key: 'overview',  label: '📊 Overview' },
    { key: 'docs',      label: '📁 Documents' },
  ]

  const tabs    = isMentor ? mentorTabs : isTeam ? teamTabs : isJudge ? judgeTabs : []
  const activeTab = tab || (tabs[0]?.key || '')
  const mentorId = isMentor ? user.mentorId : null

  return (
    <div className={s.wrap}>
      {/* Header */}
      <div className={s.header}>
        <h2>
          {isMentor && '🧑‍💻 '}
          {isTeam   && '🚀 '}
          {isJudge  && '⚖️ '}
          {user.name || user.email}
          <span style={{ marginLeft:'.6rem', color:'#555', fontWeight:400, fontSize:'.85rem' }}>({user.role})</span>
        </h2>
        <button className={s.headerBtn} onClick={() => { window.location.hash = '' }}>← Site</button>
        <button className={s.headerBtn} onClick={logout}>Logout</button>
      </div>

      <div className={s.body}>
        {/* Sidebar */}
        <nav className={s.sidebar}>
          {tabs.map(t => (
            <button key={t.key} className={`${s.tab} ${activeTab === t.key ? s.tabActive : ''}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main className={s.content}>
          {/* ── Mentor tabs ── */}
          {isMentor && activeTab === 'profile'  && (
            <><div className={s.sectionTitle}>Your Profile</div><MentorProfileEditor mentorId={user.mentorId} /></>
          )}
          {isMentor && activeTab === 'slots'    && (
            <><div className={s.sectionTitle}>Availability Slots</div><MentorSlotsEditor mentorId={user.mentorId} /></>
          )}
          {isMentor && activeTab === 'bookings' && (
            <><div className={s.sectionTitle}>Incoming Bookings</div><MentorBookingsView mentorId={user.mentorId} /></>
          )}
          {isMentor && activeTab === 'chat' && (
            <><div className={s.sectionTitle}>Messages</div><Chat rooms={chatRooms} /></>
          )}

          {/* ── Team tabs ── */}
          {isTeam && activeTab === 'overview' && (
            <><div className={s.sectionTitle}>Your Team</div><TeamOverview team={team} /></>
          )}
          {isTeam && activeTab === 'theme' && (
            <><div className={s.sectionTitle}>Choose your theme</div><ThemePicker team={team} /></>
          )}
          {isTeam && activeTab === 'book' && (
            <><div className={s.sectionTitle}>Book a Mentor</div><TeamBookingPanel teamId={user.teamId} /></>
          )}
          {isTeam && activeTab === 'chat' && (
            <>
              <div className={s.sectionTitle}>Messages</div>
              {chatRooms.length === 0
                ? <div style={{ color:'#555' }}>Book a mentor first to unlock chat with them.</div>
                : <Chat rooms={chatRooms} />
              }
            </>
          )}
          {isTeam && activeTab === 'docs' && (
            <><div className={s.sectionTitle}>Documents</div><DocsTab /></>
          )}

          {/* ── Judge tabs ── */}
          {isJudge && activeTab === 'overview' && (
            <div className={s.card}>
              <p>Welcome, {user.name}. Submission scoring sheets and team presentations will be linked here.</p>
            </div>
          )}
          {isJudge && activeTab === 'docs' && (
            <><div className={s.sectionTitle}>Documents</div><DocsTab /></>
          )}
        </main>
      </div>
    </div>
  )
}
