import { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import { ConfigProvider } from './context/ConfigContext'
import AdminPage from './admin/AdminPage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Timeline from './components/Timeline'
import Tracks from './components/Tracks'
import Submission from './components/Submission'
import Gallery from './components/Gallery'
import Partners from './components/Partners'
import Team from './components/Team'
import FAQ from './components/FAQ'
import Register from './components/Register'
import Footer from './components/Footer'

export default function App() {
  const [showBackTop, setShowBackTop] = useState(false)
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === '#admin')
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <AppProvider>
      <ConfigProvider>
        {isAdmin ? (
          <AdminPage />
        ) : (
          <>
            <Navbar />
            <Hero />
            <StatsBar />
            <About />
            <Timeline />
            <Tracks />
            <Submission />
            <Gallery />
            <Partners />
            <Team />
            <FAQ />
            <Register />
            <Footer />

            <button
              className={`back-top ${showBackTop ? 'visible' : ''}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Înapoi sus"
            >
              ↑
            </button>
          </>
        )}
      </ConfigProvider>
    </AppProvider>
  )
}
