import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { href: '#despre', label: 'Despre' },
  { href: '#detalii', label: 'Program' },
  { href: '#teme', label: 'Teme' },
  { href: '#submit', label: 'Submit' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#parteneri', label: 'Parteneri' },
  { href: '#echipa', label: 'Echipă' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo} onClick={(e) => handleNavClick(e, '#hero')}>
          <span className={styles.logoU}>"U"</span>
          <span className={styles.logoHack}>HACK</span>
        </a>

        <ul className={`${styles.links} ${open ? styles.open : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => handleNavClick(e, l.href)}>{l.label}</a>
            </li>
          ))}
          <li>
            <a
              href="#inscriere"
              className={styles.cta}
              onClick={(e) => handleNavClick(e, '#inscriere')}
            >
              Înscrie-te
            </a>
          </li>
        </ul>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Meniu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
