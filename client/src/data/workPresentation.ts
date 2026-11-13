import { workItems } from './work'

// Keep presentation consumers on the same resume-backed content as the gallery.
const workPresentation = Object.fromEntries(workItems.map((item) => [item.slug, {
  title: item.galleryTitle || item.title,
  previewImage: item.previewImage,
  blurb: item.blurb,
  detail: item.summary,
  highlights: item.highlights,
}]))

export default workPresentation
