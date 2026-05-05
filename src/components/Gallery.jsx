import { useState, useEffect, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import styles from './Gallery.module.css'

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const photos = [
  { src: '/assets/img/gallery/photo1.jpg', caption: 'Kickoff · Deschiderea Oficială' },
  { src: '/assets/img/gallery/photo2.jpg', caption: 'Echipe la Lucru' },
  { src: '/assets/img/gallery/photo3.jpg', caption: 'Mentorat & Workshopuri', tall: true },
  { src: '/assets/img/gallery/photo4.jpg', caption: 'Prezentări Finale' },
  { src: '/assets/img/gallery/photo5.jpg', caption: 'Jurizare' },
  { src: '/assets/img/gallery/photo6.jpg', caption: 'Ceremonia de Premiere 🏆', wide: true },
]

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null) // index or null

  const open = (i) => { setLightbox(i); document.body.style.overflow = 'hidden' }
  const close = useCallback(() => { setLightbox(null); document.body.style.overflow = '' }, [])
  const prev = (e) => { e.stopPropagation(); setLightbox(i => (i - 1 + photos.length) % photos.length) }
  const next = (e) => { e.stopPropagation(); setLightbox(i => (i + 1) % photos.length) }

  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % photos.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, close])

  return (
    <section className="section section-dark" id="galerie">
      <div className="container">
        <Reveal className="section-header">
          <span className="section-tag">// momente</span>
          <h2>Galerie Foto</h2>
        </Reveal>

        <div className={styles.grid}>
          {photos.map((p, i) => (
            <Reveal
              key={i}
              className={`${styles.item} ${p.tall ? styles.tall : ''} ${p.wide ? styles.wide : ''}`}
            >
              <button className={styles.itemBtn} onClick={() => open(i)} aria-label={p.caption}>
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.caption}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                  />
                ) : null}
                <div className={styles.placeholder}>
                  <span>0{i + 1}</span>
                  <p>{p.caption}</p>
                </div>
                <div className={styles.overlay}><ExpandIcon /></div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox active" onClick={close}>
          <button className="lb-close" onClick={close}>&times;</button>
          <button className="lb-prev" onClick={prev}>&#8592;</button>
          <button className="lb-next" onClick={next}>&#8594;</button>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].caption} />
            <div className="lb-caption">{photos[lightbox].caption}</div>
          </div>
        </div>
      )}
    </section>
  )
}
