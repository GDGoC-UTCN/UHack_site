import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'
import { useConfig } from '../context/ConfigContext'
import { t } from '../i18n'
import styles from './FAQ.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${styles.item} ${open ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setOpen(o => !o)}>
        {q}
        <span className={styles.icon}>{open ? '−' : '+'}</span>
      </button>
      <div className={styles.answer} style={{ maxHeight: open ? '300px' : '0' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { lang } = useApp()
  const { config } = useConfig()
  const tr = t[lang].faq
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">{tr.tag}</span>
          <h2>{tr.title}</h2>
        </Reveal>
        <div className={styles.list}>
          {(config.faq
            ? config.faq.map(item => ({ q: lang==='ro' ? item.questionRO : item.questionEN, a: lang==='ro' ? item.answerRO : item.answerEN }))
            : tr.items
          ).map((f, i) => <FAQItem key={f.q || i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  )
}
