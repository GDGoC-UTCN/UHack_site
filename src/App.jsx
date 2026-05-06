import { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import { ConfigProvider } from './context/ConfigContext'
import { AuthProvider } from './context/AuthContext'
import AdminPage from './admin/AdminPage'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import About from './components/About'
import Timeline from './components/Timeline'
import Tracks from './components/Tracks'
import Gallery from './components/Gallery'
import Partners from './components/Partners'
import Team from './components/Team'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Register from './components/Register'
import Footer from './components/Footer'

export default function App() {
  const [showBackTop, setShowBackTop] = useState(false)
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin')
  const [route, setRoute] = useState(window.location.hash || '')

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = () => { setIsAdmin(window.location.hash === '#admin'); setRoute(window.location.hash || '') }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return (
    <AppProvider>
      <ConfigProvider>
        <AuthProvider>
          {isAdmin ? (
            <AdminPage />
          ) : route === '#login' ? (
            <Login />
          ) : route === '#dashboard' ? (
            <Dashboard />
          ) : (
            <>
              <Navbar />
              <Hero />
              <StatsBar />
              <About />
              <Timeline />
              <Tracks />
              <Gallery />
              <Partners />
              <Team />
              <FAQ />
              <Contact />
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
        </AuthProvider>
      </ConfigProvider>
    </AppProvider>
  )
}
