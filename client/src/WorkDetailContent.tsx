import type { WorkItem } from './data/work'
import { galleryReturnHref } from './galleryNavigation'

export default function WorkDetailContent({ item, index, total, onClose }: {
  item: WorkItem
  index: number
  total: number
  onClose?: () => void
}) {
  const destination = item.previewUrl || item.links.find(link => link.href.startsWith('https://github.com/'))?.href
  const backHref = galleryReturnHref(item.slug)
  const Heading = onClose ? 'h2' : 'h1'
  const titleId = onClose ? `title-${item.slug}` : 'work-detail-title'
  const closeIcon = <span aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false"><path d="m6 6 12 12M6 18 18 6" /></svg></span>

  return <>
    <header className="work-detail-header">
      {onClose ? <button type="button" className="detail-back-link" onClick={onClose}>{closeIcon}<span>close details</span></button> : <a href={backHref} className="detail-back-link">{closeIcon}<span>back to gallery</span></a>}
      {onClose ? <span className="detail-scroll-hint">scroll to continue</span> : <a className="detail-home-link" href="/">home</a>}
    </header>
    {destination ? <a className="detail-focus" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} ${item.previewUrl ? 'website' : 'source code'} in a new tab`}><span className="detail-focus-action">{item.previewUrl ? 'Visit website' : 'View on GitHub'}</span></a> : <div className="detail-focus detail-focus-empty" aria-hidden="true" />}
    <div className="detail-copy">
      <div className="detail-copy-row"><span aria-hidden="true">01</span><div><Heading id={titleId}>{item.title}</Heading>{item.role && <p className="detail-role">{item.role}{item.dates && <> · {item.dates}</>}</p>}</div></div>
      <div className="detail-copy-row"><span aria-hidden="true">02</span><div><h3 className="detail-block-label">the work</h3><p>{item.summary}</p></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">03</span><div><h3 className="detail-block-label">a closer look</h3><ul className="detail-points">{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">04</span><div><h3 className="detail-block-label">tools &amp; approach</h3><p>{item.technical}</p>{destination && <a className="detail-project-link" href={destination} target="_blank" rel="noopener noreferrer">{item.previewUrl ? 'Visit website' : 'View on GitHub'}<span className="visually-hidden"> (opens in a new tab)</span></a>}</div></div>
      <span className="visually-hidden">{index + 1} of {total} selected works</span>
    </div>
  </>
}
