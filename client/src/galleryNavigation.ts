export const galleryFilters = [
  { id: 'all', label: 'All work' },
  { id: 'experience', label: 'Experience' },
  { id: 'freelance', label: 'Client work' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Community' },
] as const

export type GalleryFilter = typeof galleryFilters[number]['id']
export const galleryReturnKey = 'portfolio-work-return'

const legacyCategories: Record<string, GalleryFilter> = {
  experience: 'experience',
  freelance: 'freelance',
  projects: 'projects',
  extracurricular: 'community',
  community: 'community',
}

export function legacyGalleryFilter(pathname: string): GalleryFilter | undefined {
  const route = pathname.replace(/^\/+|\/+$/g, '')
  return Object.hasOwn(legacyCategories, route) ? legacyCategories[route] : undefined
}

export function galleryHref(filter: GalleryFilter = 'all', section = 'work-gallery') {
  return `/${filter === 'all' ? '' : `?category=${filter}`}#${section}`
}

export function galleryReturnHref(slug: string) {
  const category = new URLSearchParams(location.search).get('category')
  if (galleryFilters.some(filter => filter.id === category)) {
    return galleryHref(category as GalleryFilter, `item-${slug}`)
  }
  try {
    const saved = JSON.parse(sessionStorage.getItem(galleryReturnKey) || 'null')
    if (saved?.slug === slug && galleryFilters.some(filter => filter.id === saved.filter)) {
      return galleryHref(saved.filter, `item-${slug}`)
    }
  } catch { /* Direct links also work when session storage is unavailable. */ }
  return galleryHref('all', `item-${slug}`)
}

export function galleryDetailHref(slug: string, filter: GalleryFilter) {
  return `/work/${slug}?category=${filter}`
}
