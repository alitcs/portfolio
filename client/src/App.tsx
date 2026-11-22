import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import { cancelFloatingScroll, floatTo, transitionPage } from './motion'
import './App.css'
import WorkShowcase from './WorkShowcase'
import './Browsing.css'
import WorkSceneMedia from './WorkSceneMedia'
import WorkDetailContent from './WorkDetailContent'
import ProjectInquiryPage from './ProjectInquiryPage'
import { legacyGalleryFilter } from './galleryNavigation'
import { workItems, type WorkItem } from './data/work'
import './Responsive.css'
import './Landing.css'
import './Motion.css'

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
  const [compactViewport, setCompactViewport] = useState(() => window.matchMedia('(max-width: 700px)').matches)
  const [workSlug, setWorkSlug] = useState(getWorkSlug)
  const [section, setSection] = useState(() => window.location.hash.slice(1))
  const isPortfolio = page === 'home' || page === 'index'
  const navigating = useRef(false)

  useEffect(() => () => cancelFloatingScroll(), [])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 700px)')
    const sync = () => setCompactViewport(query.matches)
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  function navigate(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
    if (!link || link.target || link.hasAttribute('download') || link.classList.contains('skip-link')) return
    const url = new URL(link.href)
    if (url.origin !== location.origin || !/^\/(?:|home|index|start-project|note|work\/[\w-]+)$/.test(url.pathname)) return
    if (url.pathname === location.pathname && url.search === location.search && url.hash) {
      const target = document.getElementById(url.hash.slice(1))
      if (!target) return
      event.preventDefault()
      history.pushState(null, '', url)
      setSection(url.hash.slice(1))
      floatTo(target)
      return
    }
    event.preventDefault()
    if (navigating.current) return
    navigating.current = true
    const origin = link.getBoundingClientRect()
    void transitionPage(() => {
      history.pushState(null, '', url)
      flushSync(() => {
        setPage(getPage())
        setWorkSlug(getWorkSlug())
        setSection(url.hash.slice(1))
      })
      window.scrollTo({ top: 0, behavior: 'instant' })
      const heading = document.querySelector<HTMLElement>('#main-content h1')
      heading?.setAttribute('tabindex', '-1')
      heading?.focus({ preventScroll: true })
    }, origin, url.pathname === '/start-project').finally(() => { navigating.current = false })
  }

  useEffect(() => {
    const createOverlay = window.BlobOverlay?.create
    const main = document.getElementById('main-content')
    if (!createOverlay || !main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const records = new Map<HTMLElement, { overlay: BlobOverlay; inView: boolean }>()
    const sections = '#overview, .gallery-screen, .inquiry-page, .detail-main > .work-detail'
    let maskFrame = 0
    let disposed = false

    const updateMasks = () => {
      maskFrame = 0
      if (disposed) return
      const elements = Array.from(document.querySelectorAll(
        'h1, h2, h3, p, label, input, textarea, button, .header-contacts a, .hero-actions, .gallery-toolbar, .gallery-scene-header, .gallery-info-toggle, .inquiry-nav',
      )).map((element) => element.getBoundingClientRect()).filter((bounds) => bounds.width && bounds.height)

      for (const [target, { overlay, inView }] of records) {
        if (!inView) continue
        const sectionBounds = target.getBoundingClientRect()
        const scaleX = sectionBounds.width / target.offsetWidth || 1
        const scaleY = sectionBounds.height / target.offsetHeight || 1
        const masks = elements.flatMap((bounds) => {
          if (bounds.bottom <= sectionBounds.top || bounds.top >= sectionBounds.bottom || bounds.right <= sectionBounds.left || bounds.left >= sectionBounds.right) return []
          const x = (bounds.left - sectionBounds.left + bounds.width / 2) / scaleX
          const y = (bounds.top - sectionBounds.top + bounds.height / 2) / scaleY
          const radiusX = bounds.width / 2 / scaleX + 20
          const radiusY = bounds.height / 2 / scaleY + 16
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
      for (const [target, record] of records) {
        if (targets.has(target)) continue
        visibilityObserver.unobserve(target)
        record.overlay.destroy()
        records.delete(target)
      }
      for (const target of targets) {
        let record = records.get(target)
        if (!record) {
          const overlay = createOverlay(target, {
            count: target.id === 'overview' ? (compactViewport ? 6 : 10) : page === 'project' ? (compactViewport ? 3 : 5) : (compactViewport ? 4 : 7),
            speed: compactViewport ? 0.3 : 0.38,
            zIndex: 35,
            active: false,
          })
          record = { overlay, inView: false }
          records.set(target, record)
          visibilityObserver.observe(target)
        }
        const { overlay } = record
        const lightWork = target.classList.contains('work-detail-tutoring') || target.classList.contains('work-detail-ontario-government-govtechon')
        const isDetail = page === 'work' || target.classList.contains('gallery-expanded')
        overlay.canvas.style.opacity = target.classList.contains('gallery-scene')
          ? (compactViewport ? '0.28' : '0.32')
          : (compactViewport || page === 'project' ? '0.18' : '0.23')
        overlay.canvas.style.mixBlendMode = isDetail && !lightWork ? 'screen' : 'multiply'
        overlay.canvas.style.filter = !isDetail || lightWork ? 'brightness(0)' : 'none'
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
  }, [page, workSlug, compactViewport])

  useEffect(() => {
    const updateLocation = () => {
      cancelFloatingScroll()
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
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [page, section])

  return (
    <div className={`site-shell ${page !== 'work' ? 'monochrome-shell' : ''}`} onClick={navigate}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {isPortfolio && <header className="site-header home-header">
          <nav className="header-contacts home-contacts" aria-label="Contact and profile links">
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer"><span className="home-link-index" aria-hidden="true">01</span><span className="home-nav-label">LinkedIn</span><span className="visually-hidden"> (opens in a new tab)</span></a>
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer"><span className="home-link-index" aria-hidden="true">02</span><span className="home-nav-label">GitHub</span><span className="visually-hidden"> (opens in a new tab)</span></a>
            <a href="mailto:alihamoudiu18@gmail.com"><span className="home-link-index" aria-hidden="true">03</span><span className="home-nav-label">Email</span></a>
            <a href="tel:+14378694831" aria-label="Call 437-869-4831"><span className="home-link-index" aria-hidden="true">04</span><span className="home-nav-label">437-869-4831</span></a>
            <a href="/AliHamoudi.pdf" download><span className="home-link-index" aria-hidden="true">05</span><span className="home-nav-label">Download résumé <small>PDF</small></span></a>
          </nav>
      </header>}

      <main id="main-content" tabIndex={-1} key={isPortfolio ? 'portfolio' : `${page}-${workSlug}`} className={`page-main ${page === 'work' ? 'detail-main' : ''} ${isPortfolio ? 'home-main' : ''}`}>
        {isPortfolio && <HomeWorkSection />}
        {page === 'work' && <WorkDetailPage item={workItems.find((item) => item.slug === workSlug)} />}
        {page === 'project' && <ProjectInquiryPage />}
      </main>

    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero" id="overview" aria-label="Portfolio introduction">
        <div className="hero-blur" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
        </div>
        <div className="hero-intro">
          <p className="hero-eyebrow">Software engineer · Toronto, Canada</p>
          <h1>Ali Hamoudi</h1>
        </div>
        <div className="hero-editorial">
          <p className="hero-statement">Useful software.<br />Built for real people.</p>
          <p>I believe what we build should move people, inspire possibility, and leave the world a little better.</p>
        </div>
        <nav className="hero-actions" aria-label="Explore my portfolio or start a project">
          <a className="hero-cta" href="#work-gallery">
            <span className="hero-action-label">See my work<small>Projects, client work &amp; experience</small></span>
          </a>
          <a className="hero-build-cta" href="/start-project"><span className="hero-action-label">Start a project<small>Tell me what you’d like me to build</small></span></a>
        </nav>
        <div className="hero-image-frame" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
          <span className="hero-frame-cross">+</span>
        </div>
        <div className="hero-footer">
          <a className="hero-scroll" href="#work-gallery">Scroll to browse my work</a>
        </div>
      </section>
    </>
  )
}

function HomeWorkSection() {
  return <WorkShowcase items={workItems} intro={<HomePage />} />
}

function WorkDetailPage({ item }: { item?: WorkItem }) {
  useEffect(() => {
    document.title = item ? `${item.galleryTitle || item.title} — Ali Hamoudi` : 'Project not found — Ali Hamoudi'
  }, [item])

  if (!item) {
    return (
      <section className="work-not-found">
        <p>Project not found</p>
        <h1>That work could not be found.</h1>
        <a href="/#work-gallery">Browse all work</a>
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
