import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useConfig } from '../context/ConfigContext'
import styles from './Pages.module.css'
import TeamSelector from '../components/TeamSelector'
import MentorBooking from '../components/MentorBooking'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { config, updateSection } = useConfig()

  if (!user) return <div style={{ padding: '2rem' }}>Not logged in. <a href="#login">Login</a></div>

  const team = config.teams.find(t => t.id === user.teamId)

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem' }}>
        <h2>Dashboard — {user.name || user.email}</h2>
        <div>
          <button onClick={() => window.location.hash = '#'} style={{ marginRight: '1rem' }}>Back</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className={styles.dashboardWrap}>
        <aside className={styles.dashSidebar}>
          <div className={styles.smallCard}><strong>Role</strong><div>{user.role}</div></div>
          {user.role === 'team' && (
            <div className={styles.smallCard}>
              <strong>Team</strong>
              <div>{team ? team.name : 'No team'}</div>
            </div>
          )}
          <div className={styles.smallCard}><strong>Documents</strong>
            <ul>
              {(config.documents || []).map(d => <li key={d.id}><a href={d.url} target="_blank">{d.title}</a></li>)}
            </ul>
          </div>
        </aside>

        <main className={styles.dashContent}>
          {user.role === 'team' && (
            <>
              <h3>Your team</h3>
              <TeamSelector team={team} onChange={t => updateSection('teams', (config.teams || []).map(x => x.id === t.id ? t : x))} />
              <h3>Mentor Booking</h3>
              <MentorBooking team={team} />
            </>
          )}

          {user.role === 'mentor' && (
            <>
              <h3>Mentor dashboard</h3>
              <p>Slots and bookings</p>
              <ul>
                {(config.bookings || []).filter(b => b.mentorId === user.mentorId).map(b => (
                  <li key={b.id}>{b.slot} — team {b.teamId} — {b.note}</li>
                ))}
              </ul>
            </>
          )}

          {user.role === 'judge' && (
            <>
              <h3>Jury tools</h3>
              <p>Access to submissions, scoring sheet, etc.</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
