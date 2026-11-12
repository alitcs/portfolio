import { useEffect, useRef, useState } from 'react'
import WorkSceneMedia, { WorkArtPeek, type SceneItem } from './WorkSceneMedia'
import './Gallery.css'

type ShowcaseItem = SceneItem & {
  category: string
  impact: string
  company?: string
}

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'experience', label: 'Experience' },
  { id: 'freelance', label: 'Client work' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Community' },
] as const
type Filter = typeof filters[number]['id']
const categoryFilter = (item: ShowcaseItem) => item.category === 'Community & extracurricular' ? 'community' : item.category.toLowerCase()
const pad = (value: number) => String(value).padStart(2, '0')
const title = (item: ShowcaseItem) => item.company || item.title
const returnKey = 'portfolio-work-return'
const blurbs: Record<string, string> = {
  'ontario-government-govtechon': 'Reliable systems for Ontario’s public service.',
  'vironix-ai': 'Turning video into useful insights.',
  'artificial-intelligence-real-estate-scraper-filter': 'Finding genuine two-bedroom apartments, faster.',
  'course-availability-notifier': 'A heads-up when a course seat opens.',
  'interior-studio-website': 'A bilingual home for an interior design studio.',
  'getmyportfolio': 'Ideas turned into personal portfolios.',
  'little-genius-island-website-booking-system': 'Helping families explore, enquire, and book.',
  'jtc-property-services-website-booking-system': 'Property care, with a simpler path to a quote.',
  'tutoring': 'Building confidence, one lesson at a time.',
  'digital-duel': 'A two-player game with custom art and physics.',
  'robotic-arm-control-system-with-web-ui': 'Live controls and telemetry for a robotic arm.',
  'secret-santa': 'Less organizing. More gift-giving.',
  'connect-ops': 'Connecting people and knowledge across public-service teams.',
  't-a-s-c-website-development': 'A home for a team building autonomous systems.',
  'under-the-tree-charity': 'Turning community support into winter essentials.',
}

function readReturnPosition(): { slug: string; filter: Filter } | undefined {
  try {
    const saved = JSON.parse(sessionStorage.getItem(returnKey) || 'null')
    if (saved && typeof saved.slug === 'string' && filters.some((filter) => filter.id === saved.filter)) return saved
  } catch { /* Session storage is an optional navigation enhancement. */ }
}

function initialFilter(): Filter {
  const value = new URLSearchParams(location.search).get('category')
  if (filters.some((filter) => filter.id === value)) return value as Filter
  return !location.hash ? readReturnPosition()?.filter || 'all' : 'all'
}

export default function WorkShowcase({ items }: { items: readonly ShowcaseItem[] }) {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [activeSlug, setActiveSlug] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)
  const order = ['Experience', 'Freelance', 'Projects', 'Community & extracurricular']
  const ordered = [...items].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))
  const visible = ordered.filter((item) => filter === 'all' || categoryFilter(item) === filter)
  const activeIndex = Math.max(0, visible.findIndex((item) => item.slug === activeSlug))
  // Warm the next actual websites, even when static-image projects sit between them.
  const preloadSlugs = new Set(visible.slice(activeIndex).filter((item) => item.previewUrl).slice(0, 3).map((item) => item.slug))
  const firstId = visible[0] ? `item-${visible[0].slug}` : 'overview'

  useEffect(() => {
    document.title = 'Selected work — Ali Hamoudi'
    const saved = readReturnPosition()
    const hash = location.hash.slice(1)
    const target = hash && hash !== 'overview' ? hash : !hash && saved ? `item-${saved.slug}` : 'overview'
    const frame = requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: 'instant' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSlug((entry.target as HTMLElement).dataset.slug || '')
      }
    }, { rootMargin: '-49% 0px -49% 0px', threshold: 0 })
    document.querySelectorAll('.gallery-screen').forEach((screen) => observer.observe(screen))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    const sync = () => setFilter(initialFilter())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  useEffect(() => {
    let accumulated = 0
    let handled = false
    let unlockAt = 0
    let releaseTimer = 0
    const step = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || menu.current?.contains(event.target as Node)) return
      event.preventDefault()
      window.clearTimeout(releaseTimer)
      const now = performance.now()
      releaseTimer = window.setTimeout(() => { handled = false; accumulated = 0 }, Math.max(180, unlockAt - now))
      if (handled || now < unlockAt) return
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1
      accumulated += event.deltaY * unit
      if (Math.abs(accumulated) < 30) return
      const screens = Array.from(document.querySelectorAll<HTMLElement>('.gallery-screen'))
      const current = screens.reduce((nearest, screen, index) => Math.abs(screen.getBoundingClientRect().top) < Math.abs(screens[nearest].getBoundingClientRect().top) ? index : nearest, 0)
      const next = Math.max(0, Math.min(screens.length - 1, current + Math.sign(accumulated)))
      handled = true
      unlockAt = now + 700
      window.clearTimeout(releaseTimer)
      releaseTimer = window.setTimeout(() => { handled = false; accumulated = 0 }, 700)
      screens[next]?.scrollIntoView({ behavior: 'smooth' })
    }
    window.addEventListener('wheel', step, { passive: false })
    return () => { window.removeEventListener('wheel', step); window.clearTimeout(releaseTimer) }
  }, [filter])

  useEffect(() => {
    if (!menuOpen) return
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !menuButton.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    window.addEventListener('keydown', key)
    window.addEventListener('pointerdown', outside)
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('pointerdown', outside) }
  }, [menuOpen])

  function remember(slug: string) {
    try { sessionStorage.setItem(returnKey, JSON.stringify({ slug, filter })) } catch { /* Optional. */ }
  }

  function changeFilter(next: Filter) {
    setFilter(next)
    setActiveSlug('')
    const url = new URL(location.href)
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    url.hash = 'work-gallery'
    history.replaceState(null, '', url)
    requestAnimationFrame(() => document.getElementById('work-gallery')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    }))
  }

  return (
    <div className="gallery-exhibition">
      <header className="gallery-header">
        <a className="gallery-brand" href="/" hidden={!activeSlug}>ali hamoudi <span>/ selected work</span></a>
        <button className={`gallery-menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" ref={menuButton} aria-label={menuOpen ? 'Close work index' : 'Open work index'} aria-expanded={menuOpen} aria-controls="gallery-directory" onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">+</span></button>
        {menuOpen && <nav className="gallery-directory" id="gallery-directory" ref={menu} aria-label="Work index">
          <p>the index / {pad(visible.length)} works</p>
          <div className="gallery-filters" role="group" aria-label="Filter work">{filters.map((entry) => <button key={entry.id} type="button" aria-pressed={filter === entry.id} onClick={() => changeFilter(entry.id)}>{entry.label}</button>)}</div>
          <div className="gallery-directory-items">{visible.map((item, index) => <a key={item.slug} href={`#item-${item.slug}`} onClick={() => setMenuOpen(false)}><span>{pad(index + 1)}</span><span>{title(item)}</span><span aria-hidden="true">↘</span></a>)}</div>
          <div className="gallery-directory-links"><a href="/">Home ↗</a><a href="/experience">Experience ↗</a><a href="/AliHamoudi.pdf" download>Résumé ↓</a><a href="/note">Let’s talk ↗</a></div>
        </nav>}
      </header>

      <section className="gallery-intro gallery-screen home-hero" id="overview" aria-labelledby="gallery-title">
        <h1 className="visually-hidden" id="gallery-title">Selected work by Ali Hamoudi</h1>
        <div className="hero-blur" aria-hidden="true"><img src="/images/hero-flower.png" alt="" /></div>
        <nav className="gallery-intro-links" aria-label="Portfolio links">
          <a href={`#${firstId}`}><span>01</span> selected work</a>
          <a href="/note"><span>02</span> start a project</a>
          <a href="/experience"><span>03</span> experience</a>
          <a href="/AliHamoudi.pdf" download><span>04</span> résumé</a>
          <a href="mailto:alihamoudiu18@gmail.com"><span>05</span> email</a>
          <a href="/"><span>06</span> ali hamoudi<br />software engineer</a>
        </nav>
        <a className="hero-cta gallery-start" href={`#${firstId}`}><span>Step into the work</span><span className="hero-cta-arrow" aria-hidden="true">↓</span></a>
        <div className="hero-image-frame" aria-hidden="true"><img src="/images/hero-flower.png" alt="" /><span className="hero-frame-cross">+</span></div>
        <div className="hero-editorial"><p>software, systems<br />and ideas<br />made useful.</p><p>a closer look.<br />one project<br />at a time.</p></div>
        <p className="hero-location">toronto, canada / selected work 01—{pad(visible.length)}</p>
        <a className="hero-plus hero-plus-bottom" href={`#${firstId}`} aria-label="Scroll to the first work">↓</a>
      </section>

      <div className="gallery-reel" id="work-gallery" aria-label="Selected work">
        {visible.map((item, index) => <article key={item.slug} className={`work-detail work-detail-${item.slug} gallery-scene gallery-screen`} id={`item-${item.slug}`} data-slug={item.slug} aria-labelledby={`title-${item.slug}`}>
          <WorkSceneMedia item={item} gallery active={preloadSlugs.has(item.slug)} />
          <header className="work-detail-header gallery-scene-header"><span>{pad(index + 1)} / {pad(visible.length)} <span aria-hidden="true">—</span> {item.category}</span></header>
          <a className="detail-focus gallery-focus-link" href={`/work/${item.slug}`} aria-label={`Explore ${title(item)}`} onClick={() => remember(item.slug)}><span className="gallery-focus-cross" aria-hidden="true">+</span><span className="detail-focus-action">Explore <span aria-hidden="true">↗</span></span></a>
          {(item.slug === 'course-availability-notifier' || item.slug === 'artificial-intelligence-real-estate-scraper-filter') && <div className="gallery-peek-clip" aria-hidden="true"><WorkArtPeek item={item} /></div>}
          <div className="detail-copy gallery-copy">
            <div className="detail-copy-row"><span aria-hidden="true">01</span><h2 id={`title-${item.slug}`}>{title(item)}</h2></div>
            <div className="detail-copy-row"><span aria-hidden="true">02</span><p>{blurbs[item.slug] || item.impact}</p></div>
          </div>
        </article>)}
      </div>

      <nav className="gallery-position" aria-label="Position in selected work">
        {activeSlug && <a href="#overview" aria-label="Back to gallery introduction">↑</a>}
        <span>{activeSlug ? `${pad(activeIndex + 1)} / ${pad(visible.length)}` : `scroll to explore / ${pad(visible.length)}`}</span>
        <div className="gallery-ticks">{visible.map((item, index) => <a href={`#item-${item.slug}`} key={item.slug} aria-label={`Scroll to ${title(item)}`} aria-current={activeSlug && index === activeIndex ? 'location' : undefined}><span /></a>)}</div>
      </nav>
    </div>
  )
}
