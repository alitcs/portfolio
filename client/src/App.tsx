import { useEffect, useState } from 'react'
import './App.css'
import WorkShowcase from './WorkShowcase'
import './Browsing.css'
import WorkSceneMedia from './WorkSceneMedia'
import WorkDetailContent from './WorkDetailContent'
import ProjectInquiryPage from './ProjectInquiryPage'
import { galleryHref, legacyGalleryFilter } from './galleryNavigation'
import { workItems, type WorkItem } from './data/work'

type Page = 'home' | 'index' | 'project' | 'work'
type BlobOverlay = {
  canvas: HTMLCanvasElement
  setActive: (active: boolean) => void
  destroy: () => void
}

declare global {
  interface Window {
    BlobOverlay?: {
      create: (target: HTMLElement, options: { count: number; speed: number; zIndex: number; active?: boolean }) => BlobOverlay
    }
  }
}

function getPage(): Page {
  const route = window.location.pathname.replace(/^\/+|\/+$/g, '')
  if (route === '' || route === 'home') return 'home'
  if (route === 'index' || legacyGalleryFilter(window.location.pathname)) return 'index'
  if (route.startsWith('work/')) return 'work'
  if (route === 'start-project' || route === 'note') return 'project'
  return 'home'
}

function getWorkSlug() {
  return window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[1] ?? ''
}

function App() {
  const [page, setPage] = useState<Page>(getPage)
  const [workSlug, setWorkSlug] = useState(getWorkSlug)
  const [section, setSection] = useState(() => window.location.hash.slice(1))
  const isPortfolio = page === 'home' || page === 'index'

  useEffect(() => {
    const createOverlay = window.BlobOverlay?.create
    const main = document.getElementById('main-content')
    if (!createOverlay || !main) return

    const records = new Map<HTMLElement, { overlay: BlobOverlay; inView: boolean }>()
    const sections = '#overview, .gallery-screen, .inquiry-page, .detail-main > .work-detail'
    let maskFrame = 0
    let disposed = false

    const updateMasks = () => {
      maskFrame = 0
      if (disposed) return
      const elements = Array.from(document.querySelectorAll(
        'h1, h2, h3, p, label, input, textarea, button, .header-contacts a, .hero-actions, .gallery-toolbar, .gallery-position, .inquiry-nav',
      )).map((element) => element.getBoundingClientRect()).filter((bounds) => bounds.width && bounds.height)

      for (const [target, { overlay, inView }] of records) {
        if (!inView) continue
        const sectionBounds = target.getBoundingClientRect()
        const masks = elements.flatMap((bounds) => {
          if (bounds.bottom <= sectionBounds.top || bounds.top >= sectionBounds.bottom || bounds.right <= sectionBounds.left || bounds.left >= sectionBounds.right) return []
          const x = bounds.left - sectionBounds.left + bounds.width / 2
          const y = bounds.top - sectionBounds.top + bounds.height / 2
          const radiusX = bounds.width / 2 + 20
          const radiusY = bounds.height / 2 + 16
          return [`radial-gradient(ellipse ${radiusX}px ${radiusY}px at ${x}px ${y}px, rgba(0,0,0,.3) 0%, rgba(0,0,0,.3) 65%, #000 100%)`]
        })
        overlay.canvas.style.maskImage = masks.join(', ')
        overlay.canvas.style.maskComposite = masks.map(() => 'intersect').join(', ')
      }
    }
    const scheduleMasks = () => {
      if (!disposed && !maskFrame) maskFrame = requestAnimationFrame(updateMasks)
    }

    const visibilityObserver = new IntersectionObserver((entries) => {
      if (disposed) return
      for (const entry of entries) {
        const record = records.get(entry.target as HTMLElement)
        if (!record) continue
        record.inView = entry.isIntersecting
        record.overlay.setActive(record.inView && !document.hidden)
      }
      scheduleMasks()
    }, { rootMargin: '100px 0px' })

    const syncSections = () => {
      if (disposed) return
      const targets = new Set(main.querySelectorAll<HTMLElement>(sections))
      // Give error screens and any page without individual sections an anchored layer too.
      if (!targets.size) targets.add(main)
      for (const [target, record] of records) {
        if (targets.has(target)) continue
        visibilityObserver.unobserve(target)
        record.overlay.destroy()
        records.delete(target)
      }
      for (const target of targets) {
        if (records.has(target)) continue
        const overlay = createOverlay(target, {
          count: page === 'project' ? 14 : page === 'work' ? 30 : 38,
          speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.7,
          zIndex: 35,
          active: false,
        })
        const lightWork = target.classList.contains('work-detail-tutoring') || target.classList.contains('work-detail-ontario-government-govtechon')
        overlay.canvas.style.opacity = page === 'project' ? '0.25' : page === 'work' ? '0.55' : '0.5'
        overlay.canvas.style.mixBlendMode = page === 'work' && !lightWork ? 'screen' : 'multiply'
        if (page !== 'work' || lightWork) overlay.canvas.style.filter = 'brightness(0)'
        records.set(target, { overlay, inView: false })
        visibilityObserver.observe(target)
      }
      scheduleMasks()
    }
    syncSections()
    const contentObserver = new MutationObserver(syncSections)
    contentObserver.observe(main, { childList: true, subtree: true, characterData: true })
    const sizeObserver = new ResizeObserver(scheduleMasks)
    sizeObserver.observe(main)

    const syncVisibility = () => {
      for (const { overlay, inView } of records.values()) overlay.setActive(inView && !document.hidden)
      scheduleMasks()
    }
    window.addEventListener('resize', scheduleMasks)
    window.addEventListener('scroll', scheduleMasks, { passive: true })
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      disposed = true
      contentObserver.disconnect()
      sizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('resize', scheduleMasks)
      window.removeEventListener('scroll', scheduleMasks)
      document.removeEventListener('visibilitychange', syncVisibility)
      cancelAnimationFrame(maskFrame)
      for (const { overlay } of records.values()) overlay.destroy()
      records.clear()
    }
  }, [page, workSlug])

  useEffect(() => {
    const updateLocation = () => {
      setPage(getPage())
      setWorkSlug(getWorkSlug())
      setSection(window.location.hash.slice(1))
    }
    window.addEventListener('popstate', updateLocation)
    window.addEventListener('hashchange', updateLocation)
    return () => {
      window.removeEventListener('popstate', updateLocation)
      window.removeEventListener('hashchange', updateLocation)
    }
  }, [])

  useEffect(() => {
    if (!section && page !== 'home' && page !== 'index') {
      window.scrollTo(0, 0)
    }
  }, [page, section])

  return (
    <div className={`site-shell ${page !== 'work' ? 'monochrome-shell' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {page !== 'work' && page !== 'project' && <header className={`site-header ${isPortfolio ? 'home-header' : ''}`}>
        <a className="wordmark" href="/" aria-label="Ali Hamoudi, home">
          <span className="wordmark-mark">AH</span>
          <span className="wordmark-copy">
            <strong>Ali Hamoudi</strong>
            <span>Toronto, Canada</span>
          </span>
        </a>
        {isPortfolio ? (
          <nav className="header-contacts home-contacts" aria-label="Contact and profile links">
            <a href={galleryHref()}><span>01</span><span className="home-nav-label">Selected work <i aria-hidden="true">↓</i></span></a>
            <a href={galleryHref('experience')}><span>02</span><span className="home-nav-label">Experience <i aria-hidden="true">↗</i></span></a>
            <a href="/AliHamoudi.pdf" download aria-label="Download résumé as a PDF"><span>03</span><span className="home-nav-label">Download résumé <small>PDF ↓</small></span></a>
            <a href="mailto:alihamoudiu18@gmail.com"><span>04</span><span className="home-nav-label">Email <i aria-hidden="true">↗</i></span></a>
            <a href={galleryHref('experience')} aria-label="About Ali Hamoudi — view experience"><span>05</span><span className="home-nav-label">Ali Hamoudi<br />Software engineer <i aria-hidden="true">↗</i></span></a>
          </nav>
        ) : (
          <nav className="header-contacts" aria-label="Contact links">
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer"><span>01</span> LinkedIn</a>
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer"><span>02</span> GitHub</a>
            <a href="mailto:alihamoudiu18@gmail.com"><span>03</span> Email</a>
            <a href="/AliHamoudi.pdf" download><span>04</span> Resume</a>
          </nav>
        )}
      </header>}

      <main id="main-content" key={isPortfolio ? 'portfolio' : `${page}-${workSlug}`} className={`page-main ${page === 'work' ? 'detail-main' : ''} ${isPortfolio ? 'home-main' : ''}`}>
        {isPortfolio && <HomeWorkSection />}
        {page === 'work' && <WorkDetailPage item={workItems.find((item) => item.slug === workSlug)} />}
        {page === 'project' && <ProjectInquiryPage />}
      </main>

      {page !== 'home' && page !== 'project' && page !== 'work' && page !== 'index' && (
        <footer className="site-footer section-wrap">
          <a className="footer-mark" href="/">AH<span>✳</span></a>
          <span>Designed &amp; built with care.</span>
          <div className="footer-links">
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗︎</a>
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗︎</a>
          </div>
        </footer>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero" id="overview" aria-label="Portfolio introduction">
        <h1 className="visually-hidden">Ali Hamoudi — Toronto Metropolitan University computer science student</h1>
        <div className="hero-blur" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
        </div>
        <div className="hero-actions">
          <a className="hero-cta" href="#work-gallery">
            <span>See my work</span>
            <span className="hero-cta-arrow" aria-hidden="true">↓</span>
          </a>
          <a className="hero-build-cta" href="/start-project"><span>Want to build something?</span><span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-image-frame" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
          <span className="hero-frame-cross">+</span>
        </div>
        <div className="hero-editorial" aria-label="Portfolio introduction">
          <p>building useful<br />things for<br />real people.</p>
          <p>software, design<br />and ideas<br />made tangible.</p>
        </div>
        <p className="hero-location">toronto, canada / selected work 01—{String(workItems.length).padStart(2, '0')}</p>
        <a className="hero-scroll" href="#work-gallery"><span>scroll to explore</span><span aria-hidden="true">↓</span></a>
      </section>
    </>
  )
}

function HomeWorkSection() {
  return <WorkShowcase items={workItems} intro={<HomePage />} />
}

function WorkDetailPage({ item }: { item?: WorkItem }) {
  if (!item) {
    return (
      <section className="work-not-found">
        <p>404 / This frame is empty</p>
        <h1>That work could not be found.</h1>
        <a href="/">Return to the index <span aria-hidden="true">↗</span></a>
      </section>
    )
  }

  const index = workItems.findIndex((entry) => entry.slug === item.slug)
  return (
    <article className={`work-detail work-detail-${item.slug}`} aria-labelledby="work-detail-title">
      <WorkSceneMedia item={item} />
      <WorkDetailContent item={item} index={index} total={workItems.length} />
    </article>
  )
}

export default App
