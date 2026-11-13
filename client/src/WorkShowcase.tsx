import { useEffect, useState, type ReactNode } from 'react'
import WorkSceneMedia, { WorkArtPeek } from './WorkSceneMedia'
import WorkDetailContent, { type DetailItem } from './WorkDetailContent'
import { galleryFilters as filters, legacyGalleryFilter, type GalleryFilter as Filter } from './galleryNavigation'
import './Gallery.css'

type ShowcaseItem = DetailItem

const categoryFilter = (item: ShowcaseItem) => item.category === 'Community & extracurricular' ? 'community' : item.category.toLowerCase()
const pad = (value: number) => String(value).padStart(2, '0')
const title = (item: ShowcaseItem) => item.galleryTitle || item.title
const returnKey = 'portfolio-work-return'

function readReturnPosition(): { slug: string; filter: Filter } | undefined {
  try {
    const saved = JSON.parse(sessionStorage.getItem(returnKey) || 'null')
    if (saved && typeof saved.slug === 'string' && filters.some((filter) => filter.id === saved.filter)) return saved
  } catch { /* Session storage is an optional navigation enhancement. */ }
}

function initialFilter(): Filter {
  const value = new URLSearchParams(location.search).get('category')
  if (filters.some((filter) => filter.id === value)) return value as Filter
  const legacy = legacyGalleryFilter(location.pathname)
  if (legacy) return legacy
  return location.pathname === '/index' && !location.hash ? readReturnPosition()?.filter || 'all' : 'all'
}

export default function WorkShowcase({ items, intro }: { items: readonly ShowcaseItem[]; intro: ReactNode }) {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [activeSlug, setActiveSlug] = useState('')
  const [expandedSlug, setExpandedSlug] = useState('')
  const order = ['Experience', 'Freelance', 'Projects', 'Community & extracurricular']
  const ordered = [...items].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))
  const visible = ordered.filter((item) => filter === 'all' || categoryFilter(item) === filter)
  const activeIndex = Math.max(0, visible.findIndex((item) => item.slug === activeSlug))
  // Warm the next actual websites, even when static-image projects sit between them.
  const preloadSlugs = new Set(visible.slice(activeIndex).filter((item) => item.previewUrl && !item.previewImage).slice(0, 3).map((item) => item.slug))
  const counts = new Map(filters.map((entry) => [entry.id, ordered.filter((item) => entry.id === 'all' || categoryFilter(item) === entry.id).length]))

  useEffect(() => {
    const filter = initialFilter()
    document.title = 'Ali Hamoudi — Software engineer'
    const saved = readReturnPosition()
    const returningFromDetail = location.pathname === '/index' && !location.search && !location.hash
    if (legacyGalleryFilter(location.pathname) || location.pathname === '/index') {
      const url = new URL(location.href)
      url.pathname = '/'
      if (filter !== 'all') url.searchParams.set('category', filter)
      if (!url.hash) url.hash = returningFromDetail && saved?.filter === filter ? `item-${saved.slug}` : 'work-gallery'
      history.replaceState(null, '', url)
    }
    const hash = location.hash.slice(1)
    const explicitCategory = new URLSearchParams(location.search).has('category')
    const target = hash || (explicitCategory ? 'work-gallery' : returningFromDetail && saved?.filter === filter ? `item-${saved.slug}` : 'overview')
    const frame = requestAnimationFrame(() => {
      if (target === 'overview') window.scrollTo({ top: 0, behavior: 'instant' })
      else (document.getElementById(target) || document.getElementById('work-gallery'))?.scrollIntoView({ behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSlug((entry.target as HTMLElement).dataset.slug || '')
      }
    }, { rootMargin: '-49% 0px -49% 0px', threshold: 0 })
    document.querySelectorAll('.gallery-screen, #overview').forEach((screen) => observer.observe(screen))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    const sync = () => {
      setFilter(initialFilter())
      setExpandedSlug('')
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1) || 'work-gallery')?.scrollIntoView({ behavior: 'instant' }))
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  function expand(slug: string) {
    setExpandedSlug(slug)
    try { sessionStorage.setItem(returnKey, JSON.stringify({ slug, filter })) } catch { /* Optional. */ }
    requestAnimationFrame(() => {
      document.getElementById(`item-${slug}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      document.querySelector<HTMLButtonElement>(`#item-${slug} .detail-back-link`)?.focus({ preventScroll: true })
    })
  }

  function collapse(slug: string) {
    setExpandedSlug('')
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(`#item-${slug} .gallery-focus-link`)?.focus({ preventScroll: true }))
  }

  function changeFilter(next: Filter) {
    if (next === filter) return
    setFilter(next)
    setActiveSlug('')
    setExpandedSlug('')
    const url = new URL(location.href)
    url.pathname = '/'
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    url.hash = 'work-gallery'
    history.pushState(null, '', url)
    requestAnimationFrame(() => document.getElementById('work-gallery')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    }))
  }

  return (
    <div className="gallery-exhibition">
      {intro}
      <section className="gallery-reel" id="work-gallery" aria-labelledby="gallery-title">
        <header className="gallery-toolbar">
          <div className="gallery-toolbar-heading">
            <h2 id="gallery-title">selected work</h2>
            <span role="status" aria-live="polite">{pad(visible.length)} works</span>
          </div>
          <div className="gallery-filters" role="group" aria-label="Filter work">
            {filters.map((entry) => <button key={entry.id} type="button" aria-pressed={filter === entry.id} aria-controls="gallery-items" onClick={() => changeFilter(entry.id)}>{entry.label}<span className="gallery-filter-count" aria-hidden="true">{pad(counts.get(entry.id) || 0)}</span></button>)}
          </div>
          <div className="gallery-filter-select">
            <label className="visually-hidden" htmlFor="gallery-category">Filter work</label>
            <select id="gallery-category" value={filter} aria-controls="gallery-items" onChange={(event) => changeFilter(event.target.value as Filter)}>
              {filters.map((entry) => <option key={entry.id} value={entry.id}>{entry.label}</option>)}
            </select>
          </div>
        </header>
        <div className="gallery-items" id="gallery-items">
        {visible.map((item, index) => <article key={item.slug} className={`work-detail work-detail-${item.slug} gallery-screen ${expandedSlug === item.slug ? 'gallery-expanded' : 'gallery-scene'}`} id={`item-${item.slug}`} data-slug={item.slug} aria-labelledby={`title-${item.slug}`}>
          <WorkSceneMedia item={item} gallery active={preloadSlugs.has(item.slug)} />
          {expandedSlug === item.slug ? (
            <WorkDetailContent
              item={item}
              index={index}
              total={visible.length}
              onClose={() => collapse(item.slug)}
            />
          ) : <>
            <header className="work-detail-header gallery-scene-header"><span>{pad(index + 1)} / {pad(visible.length)} <span aria-hidden="true">—</span> {item.category === 'Community & extracurricular' ? 'Extracurricular' : item.category}</span></header>
            <button type="button" className="detail-focus gallery-focus-link" aria-label={`Explore ${title(item)}`} aria-expanded={false} onClick={() => expand(item.slug)}><span className="gallery-focus-arrow" aria-hidden="true">↗</span></button>
            {item.slug === 'artificial-intelligence-real-estate-scraper-filter' && <div className="gallery-peek-clip" aria-hidden="true"><WorkArtPeek item={item} /></div>}
            <div className="detail-copy gallery-copy">
              <div className="detail-copy-row"><span aria-hidden="true">01</span><h2 id={`title-${item.slug}`}>{title(item)}</h2></div>
              <div className="detail-copy-row"><span aria-hidden="true">02</span><div><p>{item.blurb}</p><button type="button" className="gallery-info-toggle" aria-expanded={false} onClick={() => expand(item.slug)}>Click for more info <span aria-hidden="true">↗</span></button></div></div>
            </div>
          </>}
        </article>)}
        </div>
      </section>

      <nav className="gallery-position" aria-label="Position in selected work" hidden={!activeSlug || expandedSlug === activeSlug}>
        {activeSlug && <a href="#overview" aria-label="Back to top">↑</a>}
        <span>{activeSlug ? `${pad(activeIndex + 1)} / ${pad(visible.length)}` : `scroll to explore / ${pad(visible.length)}`}</span>
      </nav>
    </div>
  )
}
