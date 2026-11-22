let cancelScroll: (() => void) | undefined

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function cancelFloatingScroll() {
  cancelScroll?.()
}

/** An interruptible glide that accounts for the site's CSS zoom and sticky toolbar. */
export function floatTo(element: HTMLElement, start = window.scrollY, durationMs?: number) {
  cancelFloatingScroll()
  const scale = element.getBoundingClientRect().width / element.offsetWidth || 1
  const margin = (parseFloat(getComputedStyle(element).scrollMarginTop) || 0) * scale
  const destination = Math.max(0, Math.min(
    window.scrollY + element.getBoundingClientRect().top - margin,
    document.documentElement.scrollHeight - window.innerHeight,
  ))
  if (reducedMotion() || Math.abs(destination - start) < 1) {
    window.scrollTo({ top: destination, behavior: 'instant' })
    return
  }
  const distance = destination - start
  const duration = durationMs ?? Math.min(650, 300 + Math.sqrt(Math.abs(distance)) * 4)
  const began = performance.now()
  let frame = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('pointerdown', stop)
    window.removeEventListener('keydown', onKey)
    cancelScroll = undefined
  }
  const onKey = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) stop()
  }
  const tick = (now: number) => {
    const progress = Math.min(1, (now - began) / duration)
    const ease = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
    window.scrollTo({ top: start + distance * ease, behavior: 'instant' })
    if (progress < 1) frame = requestAnimationFrame(tick)
    else stop()
  }
  cancelScroll = stop
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('pointerdown', stop, { passive: true })
  window.addEventListener('keydown', onKey)
  window.scrollTo({ top: start, behavior: 'instant' })
  frame = requestAnimationFrame(tick)
}

/** Build bounded momentum from consecutive wheel gestures in the collapsed gallery. */
export function installGalleryMomentum(gallery: HTMLElement) {
  let frame = 0
  let target = window.scrollY
  let lastEvent = 0
  let lastFrame = 0
  let direction = 0
  let streak = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
    lastEvent = 0
    streak = 0
    target = window.scrollY
    if (cancelScroll === stop) cancelScroll = undefined
  }
  const tick = (now: number) => {
    const elapsed = Math.min(40, now - lastFrame)
    lastFrame = now
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight)
    target = Math.max(0, Math.min(max, target))
    const current = window.scrollY
    const next = current + (target - current) * (1 - Math.exp(-elapsed / 65))
    window.scrollTo({ top: next, behavior: 'instant' })
    if (Math.abs(target - next) > 2 && (Math.abs(next - current) >= .5 || elapsed < 8)) frame = requestAnimationFrame(tick)
    else {
      window.scrollTo({ top: target, behavior: 'instant' })
      frame = 0
      if (cancelScroll === stop) cancelScroll = undefined
    }
  }
  const onWheel = (event: WheelEvent) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || reducedMotion()
      || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return
    const element = event.target instanceof Element ? event.target : null
    if (element?.closest('input, textarea, select, [contenteditable="true"]')) return
    const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight)
    if ((delta < 0 && window.scrollY <= 0) || (delta > 0 && window.scrollY >= max - 1)) {
      stop()
      return
    }
    event.preventDefault()
    const now = performance.now()
    const continuing = now - lastEvent < 350 && Math.sign(delta) === direction
    streak = continuing ? Math.min(10, streak + 1) : 0
    if (!continuing || !frame) target = window.scrollY
    direction = Math.sign(delta)
    lastEvent = now
    const gain = Math.min(3.6, 1.2 * 1.16 ** streak)
    const travel = Math.min(Math.abs(delta) * gain, innerHeight * .65)
    const destination = Math.max(0, Math.min(max, target + direction * travel))
    if (!frame) {
      cancelFloatingScroll()
      cancelScroll = stop
      lastFrame = now
    }
    target = destination
    if (!frame) frame = requestAnimationFrame(tick)
  }
  const onOutsideWheel = (event: WheelEvent) => {
    if (!gallery.contains(event.target as Node) || event.ctrlKey || event.metaKey || event.shiftKey
      || Math.abs(event.deltaX) > Math.abs(event.deltaY) || reducedMotion()) stop()
  }
  const onKey = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(event.key)) stop()
  }
  gallery.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('wheel', onOutsideWheel, { passive: true })
  window.addEventListener('pointerdown', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', onKey)
  window.addEventListener('resize', stop)
  window.addEventListener('popstate', stop)
  return () => {
    stop()
    gallery.removeEventListener('wheel', onWheel)
    window.removeEventListener('wheel', onOutsideWheel)
    window.removeEventListener('pointerdown', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('resize', stop)
    window.removeEventListener('popstate', stop)
  }
}

export async function transitionPage(update: () => void, origin: DOMRect, project: boolean) {
  cancelFloatingScroll()
  if (reducedMotion()) {
    update()
    return
  }
  const root = document.documentElement
  root.dataset.routeTransition = project ? 'project' : 'portfolio'
  root.style.setProperty('--route-top', `${origin.top / innerHeight * 100}%`)
  root.style.setProperty('--route-right', `${(innerWidth - origin.right) / innerWidth * 100}%`)
  root.style.setProperty('--route-bottom', `${(innerHeight - origin.bottom) / innerHeight * 100}%`)
  root.style.setProperty('--route-left', `${origin.left / innerWidth * 100}%`)
  let committed = false
  const commit = () => { committed = true; update() }
  try {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(commit)
      await transition.finished
    } else {
      const shell = document.querySelector('.site-shell')
      if (shell) await shell.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-12px)' }], { duration: 220, easing: 'ease-in' }).finished
      commit()
    }
  } catch {
    if (!committed) commit()
  } finally {
    delete root.dataset.routeTransition
  }
}
