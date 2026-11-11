import { useEffect, useRef, useState } from 'react'

type ShowcaseItem = {
  slug: string
  title: string
  category: string
  impact: string
  technical: string
  image: string
  company?: string
  dates?: string
  tags: readonly string[]
}

const filters = [
  { id: 'all', label: 'All work' },
  { id: 'experience', label: 'Experience' },
  { id: 'freelance', label: 'Client work' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Community' },
] as const
type Filter = typeof filters[number]['id']
const categoryFilter = (item: ShowcaseItem): Filter => {
  if (item.category === 'Community & extracurricular') return 'community'
  return item.category.toLowerCase() as Filter
}
const categoryName = (item: ShowcaseItem) => filters.find((filter) => filter.id === categoryFilter(item))?.label || item.category
const pad = (n: number) => String(n).padStart(2, '0')
const returnKey = 'portfolio-work-return'
type ReturnPosition = { slug: string; filter: Filter }

function readReturnPosition(): ReturnPosition | undefined {
  try {
    const saved = JSON.parse(sessionStorage.getItem(returnKey) || 'null')
    if (saved && typeof saved.slug === 'string' && filters.some((filter) => filter.id === saved.filter)) return saved
  } catch { /* Browsing still works if session storage is unavailable. */ }
}

function initialFilter(): Filter {
  const params = new URLSearchParams(window.location.search)
  const value = params.get('category')
  if (filters.some((filter) => filter.id === value)) return value as Filter
  if (!window.location.hash) return readReturnPosition()?.filter || 'all'
  return 'all'
}

export default function WorkShowcase({ items }: { items: readonly ShowcaseItem[] }) {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [activeSlug, setActiveSlug] = useState('')
  const directoryRef = useRef<HTMLDetailsElement>(null)
  // Professional experience leads naturally into client builds, experiments, and community.
  const ordered = [...items].sort((a, b) =>
    ['Experience', 'Freelance', 'Projects', 'Community & extracurricular'].indexOf(a.category)
    - ['Experience', 'Freelance', 'Projects', 'Community & extracurricular'].indexOf(b.category))
  const visible = ordered.filter((item) => filter === 'all' || categoryFilter(item) === filter)
  const activeIndex = Math.max(0, visible.findIndex((item) => item.slug === activeSlug))
  const active = visible[activeIndex]

  useEffect(() => {
    document.title = 'Selected work — Ali Hamoudi'
    const saved = readReturnPosition()
    const hash = decodeURIComponent(window.location.hash.slice(1))
    const target = hash && hash !== 'overview' ? hash : !hash && saved ? `item-${saved.slug}` : ''
    const frame = requestAnimationFrame(() => {
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const nearest = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]
      if (nearest) setActiveSlug((nearest.target as HTMLElement).dataset.slug || '')
    }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 })
    document.querySelectorAll('.showcase-entry').forEach((entry) => observer.observe(entry))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    const updateFilter = () => setFilter(initialFilter())
    window.addEventListener('popstate', updateFilter)
    return () => window.removeEventListener('popstate', updateFilter)
  }, [])

  useEffect(() => {
    const closeDirectory = (event: PointerEvent) => {
      if (!directoryRef.current?.contains(event.target as Node)) directoryRef.current?.removeAttribute('open')
    }
    const escapeDirectory = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && directoryRef.current?.open) {
        directoryRef.current.removeAttribute('open')
        directoryRef.current.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', closeDirectory)
    document.addEventListener('keydown', escapeDirectory)
    return () => {
      document.removeEventListener('pointerdown', closeDirectory)
      document.removeEventListener('keydown', escapeDirectory)
    }
  }, [])

  function changeFilter(next: Filter) {
    setFilter(next)
    setActiveSlug('')
    directoryRef.current?.removeAttribute('open')
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    url.hash = 'work-gallery'
    window.history.replaceState(null, '', url)
    requestAnimationFrame(() => document.getElementById('work-gallery')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    }))
  }

  function rememberPosition(slug: string) {
    try { sessionStorage.setItem(returnKey, JSON.stringify({ slug, filter })) } catch { /* Optional return enhancement. */ }
  }

  return (
    <div className="work-showcase" id="overview">
      <header className="showcase-header">
        <a className="showcase-wordmark" href="/">ali hamoudi <span aria-hidden="true">+</span></a>
        <nav aria-label="Work and career navigation">
          <a href="/experience">Experience</a>
          <a href="/AliHamoudi.pdf" download>Résumé <span aria-hidden="true">↓</span></a>
          <a href="/note">Let’s work together <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <section className="showcase-intro" aria-labelledby="showcase-title">
        <div className="showcase-intro-heading">
          <p className="showcase-label">SELECTED WORK / ALI HAMOUDI</p>
          <h1 id="showcase-title">a closer look<br />at the work.</h1>
        </div>
        <div className="showcase-intro-copy">
          <p>Digital systems, thoughtful interfaces,<br className="desktop-break" /> and ideas made useful.</p>
          <p>Scroll to explore. Open a project<br className="desktop-break" /> to step into its world.</p>
          <a href="#work-gallery" className="showcase-scroll-link">Explore {items.length} works <span aria-hidden="true">↓</span></a>
        </div>
        <div className="showcase-audience">
          <a href="/note"><span>HAVE SOMETHING IN MIND?</span>Let’s build it together <span aria-hidden="true">↗</span></a>
          <a href="/experience"><span>LOOKING FOR YOUR NEXT ENGINEER?</span>Experience & résumé <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <div className="showcase-controls" id="work-gallery">
        <div className="showcase-filters" role="group" aria-label="Filter work">
          {filters.map((entry) => (
            <button type="button" key={entry.id} aria-pressed={filter === entry.id} onClick={() => changeFilter(entry.id)}>
              {entry.label}<sup>{pad(entry.id === 'all' ? items.length : items.filter((item) => categoryFilter(item) === entry.id).length)}</sup>
            </button>
          ))}
        </div>
        <details className="showcase-directory" ref={directoryRef}>
          <summary>Quick index <span aria-hidden="true">+</span></summary>
          <nav aria-label="Jump to a work">
            {visible.map((item, index) => <a href={`#item-${item.slug}`} key={item.slug} onClick={() => directoryRef.current?.removeAttribute('open')}>
              <span>{pad(index + 1)}</span><span>{item.company || item.title}</span><span aria-hidden="true">↘</span>
            </a>)}
          </nav>
        </details>
      </div>

      <div className="showcase-gallery" aria-label="Work showcase">
        {visible.map((item, index) => (
          <article className="showcase-entry" id={`item-${item.slug}`} data-slug={item.slug} key={item.slug}>
            <div className="showcase-entry-meta"><span>{pad(index + 1)} / {pad(visible.length)}</span><span>{categoryName(item)}</span>{item.dates && <span>{item.dates}</span>}</div>
            <div className="showcase-art-link">
              <div className="showcase-art" aria-hidden="true">
                <img className="showcase-art-blur" src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                <img className="showcase-art-image" src={item.image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                <span className="showcase-art-frame"><span>+</span></span>
                <span className="showcase-art-open">Take a closer look <span>↗</span></span>
              </div>
            </div>
            <div className="showcase-entry-copy">
              <h2>{item.company || item.title}</h2>
              {item.company && <p className="showcase-role">{item.title}</p>}
              <p className="showcase-impact">{item.impact}</p>
              <p className="showcase-tools">{item.tags.slice(0, 4).join(' / ')}</p>
              <a className="showcase-open-link" href={`/work/${item.slug}`} onClick={() => rememberPosition(item.slug)} aria-label={`Explore ${item.company || item.title}`}>Explore the work <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        ))}
      </div>

      <nav className="showcase-progress" aria-label="Position in the showcase">
        <span className="showcase-progress-count">{pad(activeIndex + 1)} <span>/ {pad(visible.length)}</span></span>
        <span className="showcase-progress-name">{active?.company || active?.title}</span>
        <div className="showcase-progress-marks">{visible.map((item, index) => <a key={item.slug} href={`#item-${item.slug}`} aria-label={`Scroll to ${item.company || item.title}`} aria-current={activeIndex === index ? 'location' : undefined}><span /></a>)}</div>
        <a href="#overview" className="showcase-back-top" aria-label="Back to showcase introduction">↑</a>
      </nav>

      <footer className="showcase-footer">
        <p className="showcase-label">THAT’S THE WORK. WHAT’S NEXT?</p>
        <a className="showcase-footer-invite" href="/note">let’s make<br />something useful. <span aria-hidden="true">↗</span></a>
        <div className="showcase-footer-links"><a href="/AliHamoudi.pdf" download>Download résumé ↓</a><a href="mailto:alihamoudiu18@gmail.com">Email ↗</a><a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗</a><span>Toronto, Canada</span></div>
      </footer>
    </div>
  )
}
