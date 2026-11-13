import { useState, type CSSProperties } from 'react'

export type SceneItem = {
  slug: string
  title: string
  image: string
  previewUrl?: string
  previewImage?: string
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
  if (active && !started) setStarted(true)

  return <>
    <div className="gallery-preview-loading"><span>Loading live preview…</span></div>
    {(active || started) && <GalleryLiveFrame item={item} />}
  </>
}

function WorkArtPeek({ item }: { item: SceneItem }) {
  if (item.slug === 'artificial-intelligence-real-estate-scraper-filter') {
    return <div className="detail-apartment-peek" aria-hidden="true">
      <img src="/item-images/apartment-terminal.png" alt="" />
    </div>
  }
  return null
}

function SceneArtwork({ item }: { item: SceneItem }) {
  const [aspect, setAspect] = useState(1)
  return <div className="scene-artwork" style={{ '--artwork-aspect': aspect } as CSSProperties}>
    <img className="detail-artwork" src={item.image} alt="" onLoad={(event) => {
      const image = event.currentTarget
      setAspect(image.naturalWidth / image.naturalHeight)
    }} />
    <WorkArtPeek item={item} />
  </div>
}

export default function WorkSceneMedia({ item, active = true }: {
  item: SceneItem
  active?: boolean
}) {
  return (
    <div className="work-detail-backdrop" aria-hidden="true">
      <img className="scene-background" src={item.previewImage || item.image} alt="" />
      <div className="scene-surround" />
      <div className="scene-media">
        {item.previewImage ? (
          <img className="detail-preview-image" src={item.previewImage} alt="" />
        ) : item.previewUrl ? (
          <GalleryPreview item={item} active={active} />
        ) : (
          <SceneArtwork item={item} />
        )}
      </div>
    </div>
  )
}
