import { WorkArtPeek } from './WorkSceneMedia'
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

  return <>
    <header className="work-detail-header">
      {onClose ? (
        <button type="button" className="detail-back-link" aria-label={`Close ${item.title} details`} onClick={onClose}><span aria-hidden="true">×</span></button>
      ) : (
        <a href="/index" className="detail-back-link" aria-label="Close and return to selected work"><span aria-hidden="true">×</span></a>
      )}
      <span className="detail-header-index">ALI HAMOUDI <span>/</span> {String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span>
    </header>
    {destination ? (
      <a className="detail-focus" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} ${destinationLabel} in a new tab`}>
        {!onClose && <span className="detail-focus-action">Open <span aria-hidden="true">↗</span></span>}
      </a>
    ) : (
      <div className="detail-focus detail-focus-empty" aria-hidden="true" />
    )}
    {!(onClose && item.slug === 'course-availability-notifier') && <WorkArtPeek item={item} />}
    <div className="detail-copy">
      <div className="detail-copy-row"><span aria-hidden="true">01</span><div><Heading id={titleId}>{item.title}</Heading>{item.role && <p className="detail-role">{item.role}{item.dates && <> · {item.dates}</>}</p>}</div></div>
      <div className="detail-copy-row"><span aria-hidden="true">02</span><div><h3 className="detail-block-label">The work</h3><p>{item.summary}</p></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">03</span><div><h3 className="detail-block-label">A closer look</h3><ul className="detail-points">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></div>
      <div className="detail-copy-row"><span aria-hidden="true">04</span><div><h3 className="detail-block-label">Tools & approach</h3><p>{item.technical}</p>{destination && <a className="detail-project-link" href={destination} target="_blank" rel="noopener noreferrer">{item.previewUrl ? 'Visit website' : 'View project'} <span aria-hidden="true">↗</span></a>}</div></div>
    </div>
  </>
}
