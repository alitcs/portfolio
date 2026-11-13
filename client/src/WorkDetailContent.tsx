import ArrowIcon from './ArrowIcon'
import type { WorkItem } from './data/work'

export type DetailItem = WorkItem

export default function WorkDetailContent({ item, index, total, onClose }: {
  item: DetailItem
  index: number
  total: number
  onClose?: () => void
}) {
  const destination = item.previewUrl || item.links.find((link) => link.href.startsWith('https://github.com/'))?.href
  const destinationLabel = item.previewUrl ? 'website' : 'project'
  const titleId = onClose ? `title-${item.slug}` : 'work-detail-title'
  const Heading = onClose ? 'h2' : 'h1'
  const closeIcon = <span aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" focusable="false"><path d="m6 6 12 12M6 18 18 6" /></svg></span>

  return <>
    <header className="work-detail-header">
      {onClose ? (
        <button type="button" className="detail-back-link" aria-label={`Close ${item.title} details`} onClick={onClose}>{closeIcon}</button>
      ) : (
        <a href="/index" className="detail-back-link" aria-label="Close and return to selected work">{closeIcon}</a>
      )}
      <span className="detail-header-index">ALI HAMOUDI <span>/</span> {String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span>
    </header>
    {destination ? (
      <a className="detail-focus" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} ${destinationLabel} in a new tab`}>
        <span className="detail-focus-action">{item.previewUrl ? 'Visit website' : 'View project'} <span aria-hidden="true"><ArrowIcon /></span></span>
      </a>
    ) : (
      <div className="detail-focus detail-focus-empty" aria-hidden="true" />
    )}
    <div className="detail-copy">
      <div className="detail-copy-row"><span aria-hidden="true">01</span><div><Heading id={titleId}>{item.title}</Heading>{item.role && <p className="detail-role">{item.role}{item.dates && <> · {item.dates}</>}</p>}</div></div>
      <div className="detail-copy-row"><span aria-hidden="true">02</span><div><h3 className="detail-block-label">The work</h3><p>{item.summary}</p></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">03</span><div><h3 className="detail-block-label">A closer look</h3><ul className="detail-points">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">04</span><div><h3 className="detail-block-label">Tools & approach</h3><p>{item.technical}</p>{destination && <a className="detail-project-link" href={destination} target="_blank" rel="noopener noreferrer">{item.previewUrl ? 'Visit website' : 'View project'} <span aria-hidden="true"><ArrowIcon /></span></a>}</div></div>
    </div>
  </>
}
