import { useState } from 'react'

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

// Both routes use the same source, scaling, image placement, and four blur panels.
export default function WorkSceneMedia({ item, gallery = false, active = true }: {
  item: SceneItem
  gallery?: boolean
  active?: boolean
}) {
  return (
    <div className="work-detail-backdrop" aria-hidden="true">
      {item.previewUrl ? gallery ? (
        <>
          <img className="gallery-preview-placeholder" src={item.image} alt="" loading="lazy" />
          {active && <GalleryLiveFrame item={item} />}
        </>
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
