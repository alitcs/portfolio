import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import WorkSceneMedia from './WorkSceneMedia'
import WorkDetailContent from './WorkDetailContent'
import type { WorkItem } from './data/work'
import { galleryDetailHref, galleryFilters as filters, galleryReturnKey as returnKey, legacyGalleryFilter, type GalleryFilter as Filter } from './galleryNavigation'
import { cancelFloatingScroll, floatTo } from './motion'
import './Gallery.css'

const categoryFilter = (item: WorkItem) => item.category === 'Community & extracurricular' ? 'community' : item.category.toLowerCase()
const categoryLabel = (item: WorkItem) => filters.find(entry => entry.id === categoryFilter(item))?.label || item.category
const title = (item: WorkItem) => item.galleryTitle || item.title

function readReturnPosition(): { slug: string; filter: Filter } | undefined {
  try {
    const saved = JSON.parse(sessionStorage.getItem(returnKey) || 'null')
    if (saved && typeof saved.slug === 'string' && filters.some(filter => filter.id === saved.filter)) return saved
  } catch { /* Navigation also works without session storage. */ }
}

function initialFilter(): Filter {
  const value = new URLSearchParams(location.search).get('category')
  if (filters.some(filter => filter.id === value)) return value as Filter
  const legacy = legacyGalleryFilter(location.pathname)
  if (legacy) return legacy
  return location.pathname === '/index' && !location.hash ? readReturnPosition()?.filter || 'all' : 'all'
}

export default function WorkShowcase({ items, intro }: { items: readonly WorkItem[]; intro: ReactNode }) {
  const [filter, setFilter] = useState<Filter>(initialFilter)
  const [activeSlug, setActiveSlug] = useState('')
  const [expandedSlug, setExpandedSlug] = useState<string>(() => history.state?.expandedWork || '')
  const exhibitionRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLElement>(null)
  const order = ['Experience', 'Freelance', 'Projects', 'Community & extracurricular']
  const ordered = [...items].sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))
  const visible = ordered.filter(item => filter === 'all' || categoryFilter(item) === filter)
  const activeIndex = Math.max(0, visible.findIndex(item => item.slug === activeSlug))
  const preloadSlugs = new Set(visible.slice(activeIndex).filter(item => item.previewUrl && !item.previewImage).slice(0, 3).map(item => item.slug))

  useEffect(() => () => cancelFloatingScroll(), [])

  useEffect(() => {
    const toolbar = toolbarRef.current
    const exhibition = exhibitionRef.current
    if (!toolbar || !exhibition) return
    const updateHeight = () => exhibition.style.setProperty('--gallery-toolbar-height', `${toolbar.offsetHeight}px`)
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(toolbar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const filter = initialFilter()
    document.title = 'Ali Hamoudi — Software engineer'
    const saved = readReturnPosition()
    const returning = location.pathname === '/index' && !location.search && !location.hash
    if (legacyGalleryFilter(location.pathname) || location.pathname === '/index') {
      const url = new URL(location.href)
      url.pathname = '/'
      if (filter !== 'all') url.searchParams.set('category', filter)
      if (!url.hash) url.hash = returning && saved?.filter === filter ? `item-${saved.slug}` : 'work-gallery'
      history.replaceState(null, '', url)
    }
    const target = location.hash.slice(1) || (new URLSearchParams(location.search).has('category') ? 'work-gallery' : 'overview')
    const frame = requestAnimationFrame(() => {
      if (target === 'overview') window.scrollTo({ top: 0, behavior: 'instant' })
      else {
        const destination = document.getElementById(target) || document.getElementById('work-gallery')
        destination?.scrollIntoView({ behavior: 'instant' })
        if (target.startsWith('item-') && !history.state?.expandedWork) destination?.querySelector<HTMLAnchorElement>('.gallery-title-toggle')?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    let frame = 0
    const updatePosition = () => {
      frame = 0
      const toolbar = toolbarRef.current?.getBoundingClientRect()
      const screens = Array.from(document.querySelectorAll<HTMLElement>('.gallery-screen'))
      if (!toolbar || toolbar.top > 1 || !screens.length) return
      const readingLine = toolbar.height + (innerHeight - toolbar.height) * .35
      const current = screens.find(screen => screen.getBoundingClientRect().bottom > readingLine)
      setActiveSlug(current?.dataset.slug || '')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(updatePosition) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [filter])

  useEffect(() => {
    if (!expandedSlug) return
    let frame = 0
    const checkPosition = () => {
      frame = 0
      const item = document.getElementById(`item-${expandedSlug}`)
      if (!item) return
      const bounds = item.getBoundingClientRect()
      const toolbarHeight = toolbarRef.current?.getBoundingClientRect().height || 0
      // Let the visitor read long details normally; collapse only after leaving the scene.
      const leavingBelow = bounds.bottom <= toolbarHeight + 32
      if (!leavingBelow && bounds.top < innerHeight - 32) return
      flushSync(() => setExpandedSlug(''))
      if (history.state?.expandedWork === expandedSlug) history.replaceState(null, '', location.href)
      if (leavingBelow) {
        const heightChange = item.getBoundingClientRect().bottom - bounds.bottom
        window.scrollBy({ top: heightChange, behavior: 'instant' })
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(checkPosition) }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetails(expandedSlug)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('keydown', onKey)
    }
  }, [expandedSlug])

  useEffect(() => {
    const sync = () => {
      cancelFloatingScroll()
      setFilter(initialFilter())
      setExpandedSlug(history.state?.expandedWork || '')
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1) || 'overview')?.scrollIntoView({ behavior: 'instant' }))
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  function openDetails(event: MouseEvent<HTMLAnchorElement>, item: WorkItem) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const start = window.scrollY
    try { sessionStorage.setItem(returnKey, JSON.stringify({ slug: item.slug, filter })) } catch { /* Optional. */ }
    const url = new URL(location.href)
    url.hash = `item-${item.slug}`
    history.replaceState(null, '', url)
    history.pushState({ expandedWork: item.slug }, '', url)
    setExpandedSlug(item.slug)
    requestAnimationFrame(() => {
      const destination = document.getElementById(`item-${item.slug}`)
      if (destination) floatTo(destination, start, 420)
      destination?.querySelector<HTMLButtonElement>('.detail-back-link')?.focus({ preventScroll: true })
    })
  }

  function closeDetails(slug: string) {
    const start = window.scrollY
    setExpandedSlug('')
    if (history.state?.expandedWork) history.replaceState(null, '', location.href)
    requestAnimationFrame(() => {
      const destination = document.getElementById(`item-${slug}`)
      if (destination) floatTo(destination, start, 420)
      destination?.querySelector<HTMLAnchorElement>('.gallery-info-toggle')?.focus({ preventScroll: true })
    })
  }

  function changeFilter(next: Filter) {
    if (next === filter) return
    setFilter(next)
    setExpandedSlug('')
    setActiveSlug('')
    const url = new URL(location.href)
    url.pathname = '/'
    if (next === 'all') url.searchParams.delete('category')
    else url.searchParams.set('category', next)
    url.hash = 'work-gallery'
    history.pushState(null, '', url)
    requestAnimationFrame(() => {
      const gallery = document.getElementById('work-gallery')
      if (gallery) floatTo(gallery)
    })
  }

  return <div className="gallery-exhibition" ref={exhibitionRef}>
    {intro}
    <section className="gallery-reel" id="work-gallery" aria-labelledby="gallery-title">
      <header className="gallery-toolbar" ref={toolbarRef}>
        <h2 id="gallery-title">selected work</h2>
        <div className="gallery-filters" role="group" aria-label="Filter selected work">
          {filters.map(entry => <button key={entry.id} type="button" aria-pressed={filter === entry.id} aria-controls="gallery-items" onClick={() => changeFilter(entry.id)}>{entry.label}</button>)}
        </div>
        <a className="gallery-home-link" href="#overview">home</a>
        <span className="visually-hidden" role="status" aria-live="polite">{filters.find(entry => entry.id === filter)?.label}: {visible.length} items</span>
      </header>
      <div className="gallery-items" id="gallery-items" key={filter}>
        {visible.map((item, index) => <article key={item.slug} className={`work-detail work-detail-${item.slug} gallery-screen ${expandedSlug === item.slug ? 'gallery-expanded' : 'gallery-scene'}`} id={`item-${item.slug}`} data-slug={item.slug} aria-labelledby={`title-${item.slug}`}>
          <WorkSceneMedia item={item} active={preloadSlugs.has(item.slug) || expandedSlug === item.slug} />
          {expandedSlug === item.slug ? <WorkDetailContent item={item} index={index} total={visible.length} onClose={() => closeDetails(item.slug)} /> : <>
            <header className="work-detail-header gallery-scene-header"><span>{categoryLabel(item)}</span></header>
            <a className="detail-focus gallery-focus-link" href={galleryDetailHref(item.slug, filter)} onClick={event => openDetails(event, item)} aria-label={`View ${title(item)} details`} aria-expanded={false}><span className="gallery-focus-mark" aria-hidden="true">+</span></a>
            <div className="detail-copy gallery-copy">
              <div className="detail-copy-row"><span aria-hidden="true">01</span><h2 id={`title-${item.slug}`}><a className="gallery-title-toggle" href={galleryDetailHref(item.slug, filter)} onClick={event => openDetails(event, item)} aria-expanded={false}>{title(item)}</a></h2></div>
              <div className="detail-copy-row"><span aria-hidden="true">02</span><div><p>{item.blurb}</p><a className="gallery-info-toggle" href={galleryDetailHref(item.slug, filter)} onClick={event => openDetails(event, item)} aria-expanded={false}>view details</a></div></div>
            </div>
          </>}
        </article>)}
      </div>
    </section>
    <footer className="gallery-outro"><a href="/start-project">Start a project</a><a href="#overview">Back to top</a></footer>
  </div>
}
