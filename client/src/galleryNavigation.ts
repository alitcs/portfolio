export const galleryFilters = [
  { id: 'all', label: 'All work' },
  { id: 'experience', label: 'Experience' },
  { id: 'freelance', label: 'Client work' },
  { id: 'projects', label: 'Projects' },
  { id: 'community', label: 'Extracurricular' },
] as const

export type GalleryFilter = typeof galleryFilters[number]['id']

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
