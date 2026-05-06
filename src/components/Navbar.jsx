import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import { t } from '../i18n'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp()
  const { user } = useAuth()
  const tr = t[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#despre',    label: tr.despre },
    { href: '#detalii',   label: tr.program },
    { href: '#teme',      label: tr.teme },
    { href: '#submit',    label: tr.submit },
    { href: '#galerie',   label: tr.galerie },
    { href: '#parteneri', label: tr.parteneri },
    { href: '#echipa',    label: tr.echipa },
    { href: '#contact',   label: t[lang].nav?.contact || 'Contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
              {tr.inscrieTE}
            </a>
          </li>
        </ul>

        {/* Controls: lang + theme + login + burger */}
        <div className={styles.controls}>
          {/* Language toggle */}
          <button
            className={styles.toggleBtn}
            onClick={toggleLang}
            aria-label="Schimbă limba / Change language"
            title={lang === 'ro' ? 'Switch to English' : 'Schimbă în Română'}
          >
            <span className={`${styles.langOption} ${lang === 'ro' ? styles.langActive : ''}`}>RO</span>
            <span className={styles.langSep}>/</span>
            <span className={`${styles.langOption} ${lang === 'en' ? styles.langActive : ''}`}>EN</span>
          </button>

          {/* Theme toggle */}
          <button
            className={`${styles.toggleBtn} ${styles.themeBtn}`}
            onClick={toggleTheme}
            aria-label="Schimbă tema / Toggle theme"
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Login / Dashboard button */}
          <button
            className={styles.loginBtn}
            onClick={() => { window.location.hash = user ? '#dashboard' : '#login' }}
            title={user ? `Go to dashboard (${user.name || user.email})` : 'Login'}
          >
            {user ? `👤 ${user.name?.split(' ')[0] || 'Dashboard'}` : (lang === 'ro' ? 'Intră' : 'Login')}
          </button>

          {/* Burger */}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Meniu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}
