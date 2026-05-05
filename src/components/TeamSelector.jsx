import React, { useState } from 'react'

export default function TeamSelector({ team, onChange }) {
  const [local, setLocal] = useState(team || { themeId: null })

  const setTheme = (themeId) => {
    const t = { ...local, themeId }
    setLocal(t)
    if (onChange) onChange(t)
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>Selected theme: {local.themeId || 'None'}</div>
      <div style={{ display:'flex', gap:'.5rem', marginTop:'.5rem' }}>
        <button onClick={() => setTheme('th1')}>Theme 1</button>
        <button onClick={() => setTheme('th2')}>Theme 2</button>
        <button onClick={() => setTheme('th3')}>Theme 3</button>
      </div>
      <div style={{ marginTop: '.5rem' }}>
        <label>Upload document (client-side only)</label>
        <input type="file" disabled style={{ display: 'block', marginTop: '.3rem' }} />
      </div>
    </div>
  )
}
