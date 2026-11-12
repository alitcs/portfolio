import { useEffect, useState } from 'react'

export type SceneItem = {
  slug: string
  title: string
  image: string
  previewUrl?: string
}

function GalleryLiveFrame({ item }: { item: SceneItem }) {
  const [ready, setReady] = useState(false)
  return <iframe
    className={`gallery-live-frame ${ready ? 'is-ready' : ''}`}
    src={item.previewUrl}
    title={`${item.title} preview`}
    tabIndex={-1}
    loading="eager"
    onLoad={() => setReady(true)}
  />
}

function GalleryPreview({ item, active }: { item: SceneItem; active: boolean }) {
  const [started, setStarted] = useState(active)
  useEffect(() => {
    if (active) setStarted(true)
  }, [active])

  return <>
    <div className="gallery-preview-loading"><span>Loading live preview…</span></div>
    {(active || started) && <GalleryLiveFrame item={item} />}
  </>
}

export function WorkArtPeek({ item }: { item: SceneItem }) {
  if (item.slug === 'course-availability-notifier') {
    return <img className="detail-art-peek" src={item.image} alt="" aria-hidden="true" />
  }
  if (item.slug === 'artificial-intelligence-real-estate-scraper-filter') {
    return <div className="detail-apartment-peek" aria-hidden="true">
      <img src="/item-images/apartment-terminal.png" alt="" />
    </div>
  }
  return null
}

// The gallery can adjust each crop without changing its individual work page.
export default function WorkSceneMedia({ item, gallery = false, active = true }: {
  item: SceneItem
  gallery?: boolean
  active?: boolean
}) {
  return (
    <div className="work-detail-backdrop" aria-hidden="true">
      {item.previewUrl ? gallery ? (
        <GalleryPreview item={item} active={active} />
      ) : (
        <iframe src={item.previewUrl} title={`${item.title} preview`} tabIndex={-1} loading="eager" />
      ) : (
        <>
          <img className="detail-artwork-fill" src={item.image} alt="" />
          <img className="detail-artwork" src={item.image} alt="" />
        </>
      )}
      <div className="detail-blur detail-blur-top" />
      <div className="detail-blur detail-blur-bottom" />
      <div className="detail-blur detail-blur-left" />
      <div className="detail-blur detail-blur-right" />
    </div>
  )
}
