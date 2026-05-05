import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { useConfig } from '../context/ConfigContext'
import s from '../pages/Dashboard.module.css'

const LS_KEY = 'uhack-chat'

function loadMsgs() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}
function saveMsgs(msgs) { localStorage.setItem(LS_KEY, JSON.stringify(msgs)) }

export default function Chat({ rooms }) {
  const { user } = useAuth()
  const { config } = useConfig()
  const [msgs, setMsgs] = useState(loadMsgs)
  const [roomId, setRoomId] = useState(rooms && rooms[0] ? rooms[0].id : '')
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  // Poll localStorage every 2 s for new messages from other tabs/users
  useEffect(() => {
    const t = setInterval(() => setMsgs(loadMsgs()), 2000)
    return () => clearInterval(t)
  }, [])

  // Scroll to bottom when messages change or room changes
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, roomId])

  const send = () => {
    if (!text.trim()) return
    const msg = { id: Date.now().toString(), roomId, senderName: user.name || user.email, senderId: user.id, text: text.trim(), ts: Date.now() }
    const next = [...loadMsgs(), msg]
    saveMsgs(next)
    setMsgs(next)
    setText('')
  }

  const roomMsgs = msgs.filter(m => m.roomId === roomId)

  const roomLabel = (r) => {
    const team = (config.teams || []).find(t => t.id === r.teamId)
    const mentor = (config.mentors || []).find(m => m.id === r.mentorId)
    return `${team?.name || r.teamId} ↔ ${mentor?.name || r.mentorId}`
  }

  return (
    <div className={s.chatWrap}>
      {rooms && rooms.length > 1 && (
        <div className={s.chatRoomPicker}>
          {rooms.map(r => (
            <button key={r.id} className={`${s.chatRoomBtn} ${roomId === r.id ? s.chatRoomBtnActive : ''}`} onClick={() => setRoomId(r.id)}>
              {roomLabel(r)}
            </button>
          ))}
        </div>
      )}

      <div className={s.chatMessages}>
        {roomMsgs.length === 0 && <div style={{ color:'#555', fontSize:'.85rem' }}>No messages yet. Start the conversation!</div>}
        {roomMsgs.map(m => {
          const isSelf = m.senderId === user.id
          return (
            <div key={m.id}>
              {!isSelf && <div className={s.chatMeta}>{m.senderName}</div>}
              <div className={`${s.chatBubble} ${isSelf ? s.chatBubbleSelf : s.chatBubbleOther}`}>
                {m.text}
              </div>
              <div className={s.chatMeta} style={{ textAlign: isSelf ? 'right' : 'left' }}>
                {new Date(m.ts).toLocaleTimeString('ro-RO', { hour:'2-digit', minute:'2-digit' })}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className={s.chatInput}>
        <input
          className={`${s.field} ${s.full}`}
          style={{ padding:'.55rem .8rem', background:'#0f0f0f', border:'1px solid #2a2a2a', borderRadius:'7px', color:'#f0f0f0', fontFamily:'inherit', fontSize:'.9rem' }}
          value={text} onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message… (Enter to send)"
        />
        <button className={`${s.btn} ${s.btnPrimary}`} onClick={send}>Send</button>
      </div>
    </div>
  )
}
