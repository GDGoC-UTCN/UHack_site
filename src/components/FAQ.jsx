import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './FAQ.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const faqs = [
  { q: 'Cine poate participa?', a: 'Orice student, indiferent de facultate sau nivel de experiență. Evenimentul este deschis tuturor celor cu pasiune pentru tehnologie.' },
  { q: 'Trebuie să vin cu o echipă formată?', a: 'Nu este obligatoriu. Te poți înscrie individual și îți vom ajuta să găsești o echipă la eveniment. Echipele au între 3 și 5 membri.' },
  { q: 'Ce nivel de experiență este necesar?', a: 'Niciun nivel minim nu este impus! Avem workshopuri și mentori care îți vor oferi suport pe parcursul celor 48 de ore.' },
  { q: 'Ce trebuie să aduc cu mine?', a: 'Laptopul tău, încărcătorul, haine confortabile pentru 48h și multă energie! Mâncarea și băuturile sunt asigurate de organizatori.' },
  { q: 'Care sunt premiile?', a: 'Premiile vor fi anunțate în curând. Cel mai important premiu: soluția ta poate fi implementată real de FC "U" Cluj!' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${styles.item} ${open ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setOpen(o => !o)}>
        {q}
        <span className={styles.icon}>{open ? '−' : '+'}</span>
      </button>
      <div className={styles.answer} style={{ maxHeight: open ? '200px' : '0' }}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// întrebări</span>
          <h2>Întrebări Frecvente</h2>
        </Reveal>
        <div className={styles.list}>
          {faqs.map(f => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  )
}
