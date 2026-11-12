import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'
import WorkShowcase from './WorkShowcase'
import './Browsing.css'
import WorkSceneMedia, { WorkArtPeek } from './WorkSceneMedia'

type Page = 'home' | 'index' | 'experience' | 'projects' | 'freelance' | 'extracurricular' | 'note' | 'work'
type WorkItem = {
  slug: string
  title: string
  category: string
  summary: string
  impact: string
  technical: string
  image: string
  previewUrl?: string
  tags: readonly string[]
  links: readonly { label: string; href: string }[]
  highlights?: readonly string[]
  dates?: string
  company?: string
}

type BlobOverlay = {
  canvas: HTMLCanvasElement
  pause: () => void
  resume: () => void
  destroy: () => void
}

declare global {
  interface Window {
    BlobOverlay?: {
      create: (target: HTMLElement, options: { count: number; speed: number; zIndex: number }) => BlobOverlay
    }
  }
}

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'index', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'projects', label: 'Projects' },
  { id: 'extracurricular', label: 'Extracurricular' },
]

function getPage(): Page {
  const route = window.location.pathname.replace(/^\/+|\/+$/g, '')
  if (route === '' || route === 'home') return 'home'
  if (route === 'index') return 'index'
  if (route.startsWith('work/')) return 'work'
  if (route === 'note' || pages.some((page) => page.id === route)) return route as Page
  return 'home'
}

function getWorkSlug() {
  return window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[1] ?? ''
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function App() {
  const [page, setPage] = useState<Page>(getPage)
  const [workSlug, setWorkSlug] = useState(getWorkSlug)
  const [section, setSection] = useState(() => window.location.hash.slice(1))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const createOverlay = window.BlobOverlay?.create
    if (!createOverlay) {
      console.error('The portfolio tracking overlay did not load.')
      return
    }

    const lightWork = page === 'work' && ['tutoring', 'ontario-government-govtechon'].includes(workSlug)
    const overlay = createOverlay(document.body, {
      count: page === 'work' || page === 'index' ? 30 : page === 'home' ? 62 : 88,
      speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.7,
      zIndex: 35,
    })
    overlay.canvas.style.opacity = page === 'work' ? '0.55' : page === 'index' ? '0.5' : '0.65'
    overlay.canvas.style.mixBlendMode = page === 'work' && !lightWork ? 'screen' : 'multiply'
    if (page !== 'work' || lightWork) overlay.canvas.style.filter = 'brightness(0)'

    let maskFrame = 0
    const updateMask = () => {
      maskFrame = 0
      const elements = document.querySelectorAll(
        'h1, h2, h3, p, label, input, textarea, button, .header-contacts a, .main-nav, .hero-cta, .detail-step-link, .gallery-intro-links, .gallery-directory, .gallery-position',
      )
      const masks = Array.from(elements).flatMap((element) => {
        const bounds = element.getBoundingClientRect()
        if (!bounds.width || !bounds.height || bounds.bottom < 0 || bounds.top > window.innerHeight || bounds.right < 0 || bounds.left > window.innerWidth) return []
        const x = bounds.left + bounds.width / 2
        const y = bounds.top + bounds.height / 2
        const radiusX = bounds.width / 2 + 20
        const radiusY = bounds.height / 2 + 16
        return [`radial-gradient(ellipse ${radiusX}px ${radiusY}px at ${x}px ${y}px, rgba(0,0,0,.3) 0%, rgba(0,0,0,.3) 65%, #000 100%)`]
      })
      overlay.canvas.style.maskImage = masks.join(', ')
      overlay.canvas.style.maskComposite = masks.map(() => 'intersect').join(', ')
    }
    const scheduleMask = () => {
      if (!maskFrame) maskFrame = window.requestAnimationFrame(updateMask)
    }
    updateMask()
    window.addEventListener('resize', scheduleMask)
    window.addEventListener('scroll', scheduleMask, { passive: true })
    const main = document.getElementById('main-content')
    const contentObserver = new MutationObserver(scheduleMask)
    if (main) contentObserver.observe(main, { childList: true, subtree: true, characterData: true })

    const syncVisibility = () => {
      if (document.hidden) overlay.pause()
      else {
        overlay.resume()
        scheduleMask()
      }
    }
    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
      window.removeEventListener('resize', scheduleMask)
      window.removeEventListener('scroll', scheduleMask)
      contentObserver.disconnect()
      window.cancelAnimationFrame(maskFrame)
      overlay.destroy()
    }
  }, [page, workSlug, menuOpen])

  useEffect(() => {
    const updateLocation = () => {
      setPage(getPage())
      setWorkSlug(getWorkSlug())
      setSection(window.location.hash.slice(1))
      setMenuOpen(false)
    }
    window.addEventListener('popstate', updateLocation)
    window.addEventListener('hashchange', updateLocation)
    return () => {
      window.removeEventListener('popstate', updateLocation)
      window.removeEventListener('hashchange', updateLocation)
    }
  }, [])

  useEffect(() => {
    if (section && page === 'home') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    } else if (!section && page !== 'index') {
      window.scrollTo(0, 0)
    }
  }, [page, section])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className={`site-shell ${page !== 'work' ? 'monochrome-shell' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {page !== 'work' && page !== 'index' && <header className={`site-header ${page === 'home' ? 'home-header' : ''}`}>
        <a className="wordmark" href="/" aria-label="Ali Hamoudi, home">
          <span className="wordmark-mark">AH</span>
          <span className="wordmark-copy">
            <strong>Ali Hamoudi</strong>
            <span>Toronto, Canada</span>
          </span>
        </a>
        {page === 'home' ? (
          <nav className="header-contacts home-contacts" aria-label="Contact and profile links">
            <a href="/index#overview"><span>01</span> Selected work</a>
            <a href="/note"><span>02</span> Start a project</a>
            <a href="/experience"><span>03</span> Experience</a>
            <a href="/AliHamoudi.pdf" download><span>04</span> Resume</a>
            <a href="mailto:alihamoudiu18@gmail.com"><span>05</span> Email</a>
            <a href="/experience"><span>06</span> Ali Hamoudi<br />Software engineer</a>
          </nav>
        ) : (
          <nav className="header-contacts" aria-label="Contact links">
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer"><span>01</span> LinkedIn</a>
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer"><span>02</span> GitHub</a>
            <a href="mailto:alihamoudiu18@gmail.com"><span>03</span> Email</a>
            <a href="/AliHamoudi.pdf" download><span>04</span> Resume</a>
          </nav>
        )}
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle-icon" aria-hidden="true">+</span>
        </button>
        {menuOpen && (
          <nav className="main-nav" id="site-menu" aria-label="Main navigation">
            <span className="menu-kicker">Navigate / 0{pages.length}</span>
            {pages.map((item, index) => (
              <a
                className={page === item.id ? 'active' : undefined}
                aria-current={page === item.id ? 'page' : undefined}
                href={item.id === 'home' ? '/' : `/${item.id}`}
                key={item.id}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>{item.label}<span className="menu-link-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
            <div className="menu-contacts">
              <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="mailto:alihamoudiu18@gmail.com">Email ↗</a>
              <a href="/AliHamoudi.pdf" download>Resume ↓</a>
            </div>
          </nav>
        )}
      </header>}

      <main id="main-content" key={`${page}-${workSlug}`} className={`page-main ${page === 'work' ? 'detail-main' : ''} ${page === 'home' ? 'home-main' : ''}`}>
        {page === 'home' && <HomePage />}
        {page === 'index' && <HomeWorkSection />}
        {page === 'work' && <WorkDetailPage item={workItems.find((item) => item.slug === workSlug)} />}
        {page === 'note' && <NotePage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'freelance' && <FreelancePage />}
        {page === 'extracurricular' && <ExtracurricularPage />}
      </main>

      {page !== 'home' && page !== 'note' && page !== 'work' && page !== 'index' && (
        <footer className="site-footer section-wrap">
          <a className="footer-mark" href="/">AH<span>✳</span></a>
          <span>Designed &amp; built with care.</span>
          <div className="footer-links">
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗︎</a>
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗︎</a>
          </div>
        </footer>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="home-hero" aria-label="Portfolio introduction">
        <h1 className="visually-hidden">Ali Hamoudi — Toronto Metropolitan University computer science student</h1>
        <div className="hero-blur" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
        </div>
        <a className="hero-cta" href="/index#overview">
          <span>See my work</span>
          <span className="hero-cta-arrow" aria-hidden="true">→</span>
        </a>
        <div className="hero-audience-links" aria-label="Ways to work together">
          <a href="/note">Have a project? <span>Let’s talk ↗</span></a>
          <a href="/experience">Hiring? <span>Experience & résumé ↗</span></a>
        </div>
        <div className="hero-image-frame" aria-hidden="true">
          <img src="/images/hero-flower.png" alt="" />
          <span className="hero-frame-cross">+</span>
        </div>
        <div className="hero-editorial" aria-label="Portfolio introduction">
          <p>building useful<br />things for<br />real people.</p>
          <p>software, design<br />and ideas<br />made tangible.</p>
        </div>
        <p className="hero-location">toronto, canada / selected work 01—{String(workItems.length).padStart(2, '0')}</p>
        <a className="hero-plus hero-plus-bottom" href="/index" aria-label="Explore selected work">+</a>
        <a className="hero-scroll" href="/index" aria-label="Explore selected work">
          <span className="hero-tick is-active" /><span className="hero-tick" /><span className="hero-tick" /><span className="hero-tick" /><span className="hero-tick" />
        </a>
      </section>
    </>
  )
}

function NotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !message) {
      setError('Please add your name and a message before sending.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
        throw new Error('The local Vite server cannot process form submissions. Test this on your deployed Netlify site.')
      }

      const encodedFormData = new URLSearchParams()
      formData.forEach((value, key) => {
        if (typeof value === 'string') encodedFormData.append(key, value)
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedFormData.toString(),
      })
      if (!response.ok) {
        throw new Error(`Netlify rejected the submission (${response.status}). Check that form detection is enabled and the latest deploy includes this form.`)
      }

      setIsSubmitted(true)
    } catch (caughtError) {
      const reason = caughtError instanceof Error ? caughtError.message : 'Please try again.'
      setError(`Your note could not be sent. ${reason}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="note-page">
      {isSubmitted ? (
        <div className="note-success" role="status" aria-live="polite">
          <svg className="success-check" viewBox="0 0 64 64" aria-hidden="true">
            <circle className="success-check-circle" cx="32" cy="32" r="27" />
            <path className="success-checkmark" d="m19 33 9 9 18-20" />
          </svg>
          <p className="section-kicker">NOTE RECEIVED</p>
          <h1>Thanks for reaching out.</h1>
          <p className="note-success-copy">Your message was accepted. I appreciate you taking the time to write.</p>
          <a className="button button-primary" href="/">Back to home <span aria-hidden="true">↗︎</span></a>
        </div>
      ) : (
        <>
          <div className="note-heading">
            <p className="section-kicker">A PERSONAL NOTE</p>
            <h1>Let’s pick up<br /><em>the conversation.</em></h1>
            <p>Write as much or as little as you like. A few details help me place the connection, but there’s no special format.</p>
          </div>
          <div className="note-layout">
            <aside className="note-guides" aria-labelledby="note-guides-title">
              <p className="section-kicker">A FEW THOUGHTS</p>
              <h2 id="note-guides-title">Helpful context</h2>
              <ul>
                <li><span>01</span><p>How we know each other, or where we crossed paths.</p></li>
                <li><span>02</span><p>What you’d like to share or recommend.</p></li>
                <li><span>03</span><p>Anything else that would be helpful context.</p></li>
              </ul>
            </aside>
            <form className="note-form" name="portfolio-note" method="POST" data-netlify="true" onSubmit={handleSubmit}>
              <input type="hidden" name="form-name" value="portfolio-note" />
              <div className="note-field">
                <label htmlFor="note-name">Your name</label>
                <input id="note-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" maxLength={120} required />
              </div>
              <div className="note-field">
                <label htmlFor="note-message">Your note</label>
                <textarea id="note-message" name="message" placeholder="Start anywhere..." rows={7} maxLength={5000} required />
              </div>
              {error && <p className="note-error" role="alert">{error} You can also <a href="mailto:alihamoudiu18@gmail.com">email me directly</a>.</p>}
              <button className="note-submit" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending note...' : 'Send note'}</span>
                <span aria-hidden="true">{isSubmitting ? '···' : '↗︎'}</span>
              </button>
              <p className="note-privacy">Submissions are handled by Netlify Forms.</p>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

const projectEntries = [
  {
    title: 'Digital Duel',
    impact: 'Gives two players a fast-paced game to play together.',
    technical: 'C, SDL2, custom physics, browser UI',
    type: 'Game project',
    summary: 'Built a local two-player top-down shooter in C and SDL2, then brought Digital Duel online with a browser-based game UI, hand-drawn art, keyboard and touch controls, and custom-coded physics.',
    tags: ['C', 'SDL2', 'Web UI', 'Game dev'],
    imageLabel: 'Digital Duel image',
    image: '/item-images/digital-duel.png',
    hoverImage: '/item-images/digital-duel-hover.png',
    previewUrl: 'https://digitalduel.netlify.app/',
    links: [
      { label: 'Visit website', href: 'https://digitalduel.netlify.app/' },
      { label: 'View source', href: 'https://github.com/alitcs/Digital-Duel' },
    ],
  },
  {
    title: 'Robotic Arm Control System with Web UI',
    impact: 'Makes robotic arm movement easier to monitor and control.',
    technical: 'Python, PyGame, JavaScript, WebSockets',
    type: 'Systems project',
    summary: 'Connected Python keyboard controls to a browser dashboard over WebSockets, with six live motor gauges, packet history, and reconnect handling.',
    tags: ['Python', 'WebSocket', 'UI'],
    imageLabel: 'Robotic Arm image',
    image: '/item-images/roboticarm.png',
    hoverImage: '/item-images/roboticarm-hover.png',
    previewUrl: 'https://roboticarmcontrol.netlify.app/',
    links: [
      { label: 'Visit website', href: 'https://roboticarmcontrol.netlify.app/' },
      { label: 'View source', href: 'https://github.com/alitcs/Robotic-Arm-UI' },
    ],
  },
  {
    title: 'Secret Santa',
    impact: 'Takes the manual work out of organizing a Secret Santa.',
    technical: 'Bash, Linux, shuf, email automation',
    type: 'Web app & automation',
    summary: 'Automated participant registration, randomized no-self-match assignments, personalized email generation, and delivery from a Linux command line.',
    tags: ['Web app', 'Bash', 'Linux', 'Automation'],
    imageLabel: 'Secret Santa image',
    image: '/item-images/secret-santa.png',
    hoverImage: '/item-images/secret-santa-hover.png',
    previewUrl: 'https://secretsantash.netlify.app/',
    links: [
      { label: 'Visit website', href: 'https://secretsantash.netlify.app/' },
      { label: 'View source', href: 'https://github.com/alitcs/Secret-Santa' },
    ],
  },
] as const

const experienceEntries = [
  {
    company: 'Ontario Government — GovTechON',
    impact: 'Helps public servants access a more reliable and secure intranet.',
    technical: 'Go, Nuxt, Vue, PHP, WordPress, AWS S3, Redis, Kubernetes',
    dates: 'May 2026 — Present',
    title: 'Full-Stack Software Engineer',
    summary: 'Deliver full-stack features and modernization for an Ontario Public Service intranet and media platform serving tens of thousands of employees. Work spans backend services, web applications, and content systems, including cloud-storage migration, performance and reliability improvements, and security hardening.',
    highlights: [
      'Modernized Go REST services and consolidated authentication and authorization in the API.',
      'Decoupled media storage and migrated the service from MinIO to the AWS S3 SDK.',
      'Resolved Redis performance and distributed coordination issues across API and CMS workloads.',
      'Hardened media access, comment permissions, and upload validation across WordPress paths.',
    ],
    image: '/item-images/government-base.png',
    note: 'Internal Ontario Public Service platform; not publicly accessible.',
  },
  {
    company: 'Vironix AI',
    impact: 'Helps customers turn video into useful insights.',
    technical: 'React, TypeScript, Node.js, Firebase, Google Cloud, Stripe',
    dates: 'Sep 2025 — Present',
    title: 'Founding Software Engineer / Technical Co-Founder',
    summary: 'Co-built and operate a customer-facing AI video analytics product as one of two engineers, sharing ownership across the frontend, backend, video-processing pipeline, credit and billing systems, and production safeguards. Interviewed 50+ engineering candidates and took an active role in growing the founding team.',
    highlights: [
      'Built an asynchronous video-analysis pipeline with retries, idempotency, and failure handling.',
      'Developed credit usage, billing, reconciliation, and refund flows across the product.',
      'Integrated AI and media services while adding authentication, validation, and rate limits.',
      'Interviewed 50+ engineering candidates and helped grow the founding team.',
    ],
    image: '/item-images/vironix-hover.png',
    previewUrl: 'https://vironixai.net',
    links: [{ label: 'Visit Vironix AI', href: 'https://vironixai.net/' }],
  },
] as const

const freelanceEntries = [
    {
    title: 'Artificial Intelligence Real Estate Scraper & Filter',
    impact: 'Helps renters find genuine two-bedroom apartments faster.',
    technical: 'Python, Selenium, OpenAI API, JSON',
    type: 'Automation service',
    summary: 'Created a paid Selenium and OpenAI tool that classifies apartment descriptions, filters for genuine two-bedroom listings, and saves results between runs.',
    tags: ['Python', 'AI', 'Automation'],
    imageLabel: 'Apartment filter image',
    image: '/item-images/apartment-base.png',
    hoverImage: '/item-images/apartment-terminal.png',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Apartment-Filter' }],
  },
  {
    title: 'Course Availability Notifier',
    impact: 'Alerts students when a seat opens in a desired course.',
    technical: 'Python, Selenium, Chrome profiles, SMS',
    type: 'Automation tool',
    summary: 'Customized Selenium automation for students to monitor course-registration portals, preserve login sessions, and send SMS alerts when seats opened.',
    tags: ['Python', 'Selenium', 'SMS'],
    imageLabel: 'Course Availability image',
    image: '/item-images/03_phone_notification_expanded.png',
    hoverImage: '/item-images/course-hover.png',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Course-Availability-Notifier' }],
  },
  {
    title: 'Interior Designr',
    slug: 'interior-studio-website',
    impact: 'Helps clients explore design work and enquire in English or Persian.',
    technical: 'Responsive web UI, bilingual content, interactive galleries',
    type: 'Business website',
    summary: 'Designed and built an interior design website with interactive before-and-after project galleries, English and Persian language options, and a project inquiry form.',
    tags: ['Web design', 'Responsive UI', 'Multilingual'],
    imageLabel: 'Interior Designr website image',
    image: '/item-images/interiordesignr.png',
    hoverImage: '/item-images/interiordesignr-hover.png',
    previewUrl: 'https://interiordesignr.netlify.app/',
    links: [{ label: 'Visit website', href: 'https://interiordesignr.netlify.app/' }],
  },
  {
    title: 'GetMyPortfolio',
    impact: 'Helps prospective clients discover and enquire about portfolio services.',
    technical: 'Responsive web design, inquiry workflow',
    type: 'Portfolio service website',
    summary: 'Designed and built a website for a custom portfolio service, explaining the design and delivery process and collecting prospective customer inquiries.',
    tags: ['Web design', 'Responsive UI', 'Lead generation'],
    imageLabel: 'GetMyPortfolio website image',
    image: '/item-images/99portfolio.png',
    hoverImage: '/item-images/99portfolio-hover.png',
    previewUrl: 'https://getmyportfolio.com/',
    links: [{ label: 'Visit website', href: 'https://getmyportfolio.com/' }],
  },
  {
    title: 'Little Genius Island Website & Booking System',
    impact: 'Helps families request quotes and book services.',
    technical: 'React, TypeScript, HTML, CSS',
    type: 'Client website',
    summary: 'Built a responsive multi-page client website with a booking and quote-request workflow to support customer acquisition and simplify inquiry management.',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'React'],
    imageLabel: 'Little Genius Island website image',
    image: '/item-images/little-genius.png',
    hoverImage: '/item-images/little-genius-hover.png',
    previewUrl: 'https://littlegeniusisland.ca/',
    links: [{ label: 'Visit website', href: 'https://littlegeniusisland.ca/' }],
  },
  {
    title: 'JTC Property Services Website & Booking System',
    impact: 'Helps customers find services and request property maintenance quotes.',
    technical: 'HTML, CSS, responsive navigation, email forms',
    type: 'Client website',
    summary: 'Built a responsive multi-page site for a GTA property-maintenance company, including service areas, a real-work gallery, and an emailed quote-request form.',
    tags: ['HTML', 'CSS', 'Freelance'],
    imageLabel: 'JTC website image',
    image: '/item-images/jtc.png',
    hoverImage: '/item-images/jtc-hover.png',
    previewUrl: 'https://majestic-youtiao-4bc24e.netlify.app/',
    links: [{ label: 'Visit website', href: 'https://majestic-youtiao-4bc24e.netlify.app/' }],
  },
  {
    title: 'Tutoring',
    impact: 'Helps students build confidence in math, science, English and programming.',
    technical: 'Individualized lessons, programming, mentorship',
    type: 'Freelance & tutoring organizations',
    summary: 'Tutored students in Grades 3–12 in math, English, programming, functions, calculus, and physics, adapting lessons to each student.',
    tags: ['Tutoring', 'Mentorship', 'Communication'],
    imageLabel: 'Tutoring image',
    image: '/item-images/01_hand_with_pencil_expanded.png',
    hoverImage: '/item-images/tutor.png',
    cardLink: false,
    links: [
      { label: 'Little Genius Island', href: 'https://littlegeniusisland.ca' },
      { label: 'Best Brains', href: 'https://bestbrains.com' },
    ],
  },
] as const

const extracurricularEntries = [
  {
    title: 'Connect OPS',
    impact: 'Explores how public servants could find people and knowledge across teams.',
    technical: 'React, TypeScript, Node.js, Express, Three.js, mock AI',
    type: 'OGT Summer 2026 hackathon',
    summary: 'Co-built a full-stack, governance-first knowledge and people-discovery prototype for the Ontario Public Service. The team placed 3rd; the live demo uses mock data and a mock AI service.',
    tags: ['React', 'TypeScript', 'Express', 'Three.js', 'AI prototype'],
    imageLabel: 'Connect OPS image',
    image: '/item-images/ops.png',
    previewUrl: 'https://connectops.netlify.app/',
    links: [{ label: 'View live demo', href: 'https://connectops.netlify.app' }],
  },
  {
    title: 'T.A.S.C. Website Development',
    impact: 'Gives the autonomous systems team a place to share its work.',
    technical: 'React, TypeScript, responsive UI, deployment',
    type: 'Toronto Autonomous Systems Collective',
    summary: 'Designed and developed the organization’s React and TypeScript website, translating team requirements into a responsive experience and maintaining the deployed site.',
    tags: ['React', 'TypeScript', 'Responsive UI', 'Deployment'],
    imageLabel: 'T.A.S.C. website image',
    image: '/item-images/tasc.png',
    hoverImage: '/item-images/tasc-hover.png',
    previewUrl: 'https://tasctmu.com/',
    links: [{ label: 'Visit T.A.S.C.', href: 'https://tasctmu.com' }],
  },
    {
    title: 'Under The Tree Charity',
    impact: 'Raised over $1,000 to help distribute meals, clothing and blankets.',
    technical: 'Fundraising, social media, community coordination',
    type: 'Community initiative',
    summary: 'Founded a winter community initiative, raised over $1,000, and coordinated distribution of hot meals, warm clothing, blankets, and winter supplies.',
    tags: ['Fundraising', 'Community outreach', 'Organization'],
    imageLabel: 'Under The Tree Charity image',
    image: '/item-images/02_christmas_tree_expanded.png',
    hoverImage: '/item-images/underthetree.png',
    previewUrl: '',
    links: [{ label: '', href: '' }],
  },
] as const

const workItems: WorkItem[] = [
  ...projectEntries.map((entry) => ({
    slug: slugify(entry.title),
    title: entry.title,
    category: 'Projects',
    summary: entry.summary,
    impact: entry.impact,
    technical: entry.technical,
    image: entry.image,
    previewUrl: entry.previewUrl,
    tags: entry.tags,
    links: entry.links,
  })),
  ...experienceEntries.map((entry) => ({
    slug: slugify(entry.company),
    title: entry.title,
    category: 'Experience',
    company: entry.company,
    dates: entry.dates,
    summary: entry.summary,
    impact: entry.impact,
    technical: entry.technical,
    image: entry.image,
    previewUrl: 'previewUrl' in entry ? entry.previewUrl : undefined,
    tags: entry.company.includes('Government')
      ? ['Go', 'AWS S3', 'Redis', 'Nuxt', 'Vue', 'WordPress']
      : ['React', 'TypeScript', 'Node.js', 'AI', 'Video'],
    links: 'links' in entry ? entry.links : [],
    highlights: entry.highlights,
  })),
  ...freelanceEntries.map((entry) => ({
    slug: 'slug' in entry ? entry.slug : slugify(entry.title),
    title: entry.title,
    category: 'Freelance',
    summary: entry.summary,
    impact: entry.impact,
    technical: entry.technical,
    image: entry.image,
    previewUrl: 'previewUrl' in entry ? entry.previewUrl : undefined,
    tags: entry.tags,
    links: entry.links,
  })),
  ...extracurricularEntries.map((entry) => ({
    slug: slugify(entry.title),
    title: entry.title,
    category: 'Community & extracurricular',
    summary: entry.summary,
    impact: entry.impact,
    technical: entry.technical,
    image: entry.image,
    previewUrl: entry.previewUrl || undefined,
    tags: entry.tags,
    links: entry.links,
  })),
]

function PageHeading({ kicker, title, detail }: { kicker: string; title: string; detail: string }) {
  return (
    <div className="page-heading section-wrap">
      <p className="section-kicker">{kicker}</p>
      <h1>{title}<span className="heading-period">.</span></h1>
      <p>{detail}</p>
    </div>
  )
}

function MediaPanel({ src, alt, label, previewUrl, hoverSrc }: { src?: string; alt: string; label: string; previewUrl?: string; hoverSrc?: string }) {
  return (
    <div className={`media-panel ${previewUrl ? 'has-live-link' : ''}`}>
      {src ? (
        <>
          <img src={src} alt={alt} />
          {hoverSrc && <img className="media-hover-image" src={hoverSrc} alt="" aria-hidden="true" />}
        </>
      ) : (
        <div className="media-placeholder" aria-label={`${label} placeholder`}>
          <span>+ Add image</span>
          <small>{label}</small>
        </div>
      )}
    </div>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageHeading kicker="A FEW THINGS I’VE MADE" title="Projects" detail="A practical mix of product builds, systems work, and creative problem-solving from the past few years." />
      <section className="projects-page-content section-wrap">
        <div className="project-grid">
          {projectEntries.map((project, index) => (
            <article className="project-card linked-card" key={project.title}>
              <CardLink href={`/work/${slugify(project.title)}`} title={project.title}>
                <MediaPanel src={project.image} alt={`${project.title} cover`} label={project.imageLabel} previewUrl={'previewUrl' in project ? project.previewUrl : undefined} hoverSrc={'hoverImage' in project ? project.hoverImage : undefined} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {project.type.toUpperCase()}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗︎</span>
                </div>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </CardLink>
            </article>
          ))}
        </div>
        <a className="all-work-link" href="/note">Have a project in mind? <span>Let’s make it real ↗︎</span></a>
      </section>
    </>
  )
}

function ExperiencePage() {
  return (
    <>
      <PageHeading kicker="THE PATH SO FAR" title="Experience" detail="A mix of public-sector engineering, startup product work, and hands-on technical leadership." />
      <section className="experience-page-content section-wrap">
        <div className="experience-list">
          {experienceEntries.map((experience) => (
            <article className={`experience-entry ${'links' in experience ? 'linked-card' : ''}`} key={experience.company}>
              <CardLink
                className="experience-entry-link"
                href={`/work/${slugify(experience.company)}`}
                title={experience.company}
              >
                <MediaPanel src={experience.image} alt={`${experience.company} cover`} label={`${experience.company} image`} previewUrl={'previewUrl' in experience ? experience.previewUrl : undefined} />
                <div className="experience-copy">
                  <span className="timeline-date">{experience.dates}</span>
                  <h3>{experience.title}</h3>
                  <p className="experience-company">{experience.company}</p>
                  <p>{experience.summary}</p>
                  {'highlights' in experience && (
                    <ul className="experience-highlights">
                      {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                    </ul>
                  )}
                  {'note' in experience && <p>{experience.note}</p>}
                </div>
              </CardLink>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function FreelancePage() {
  return (
    <>
      <PageHeading kicker="CLIENT WORK" title="Freelance" detail="Independent work for clients, students, and small businesses across automation, AI workflows, web design, and product delivery." />
      <section className="projects-page-content section-wrap">
        <div className="project-grid">
          {freelanceEntries.map((project, index) => {
            const cardHref = `/work/${'slug' in project ? project.slug : slugify(project.title)}`

            return (
            <article className="project-card linked-card" key={project.title}>
              <CardLink href={cardHref} title={project.title}>
                <MediaPanel src={project.image} alt={`${project.title} cover`} label={project.imageLabel} previewUrl={'previewUrl' in project ? project.previewUrl : undefined} hoverSrc={'hoverImage' in project ? project.hoverImage : undefined} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {project.type.toUpperCase()}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  {cardHref && <span className="project-arrow" aria-hidden="true">↗︎</span>}
                </div>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </CardLink>
            </article>
            )
          })}
        </div>
      </section>
    </>
  )
}

function CardLink({ href, title, className = 'project-card-main-link', preview = false, children }: {
  href?: string
  title: string
  className?: string
  preview?: boolean
  children: ReactNode
}) {
  return (
    <div className={`${className} ${preview && href ? 'live-preview-link' : ''}`}>
      {children}
      {href && (
        <a className="card-click-overlay" href={href} aria-label={`Explore ${title}`}>
          {preview && <span className="card-link-hint">Explore project <span aria-hidden="true">↗︎</span></span>}
        </a>
      )}
    </div>
  )
}

function ExtracurricularPage() {
  return (
    <>
      <PageHeading kicker="BEYOND THE CLASSROOM" title="Extracurricular" detail="Team projects, community work, and initiatives built around shared goals." />
      <section className="projects-page-content section-wrap">
        <div className="project-grid">
          {extracurricularEntries.map((entry, index) => (
            <article className="project-card linked-card" key={entry.title}>
              <CardLink href={`/work/${slugify(entry.title)}`} title={entry.title}>
                <MediaPanel src={entry.image} alt={`${entry.title} cover`} label={entry.imageLabel} previewUrl={entry.previewUrl} hoverSrc={'hoverImage' in entry ? entry.hoverImage : undefined} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {entry.type.toUpperCase()}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.summary}</p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗︎</span>
                </div>
                <div className="tag-list">
                  {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </CardLink>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function HomeWorkSection() {
  return <WorkShowcase items={workItems} />
}

function WorkDetailPage({ item }: { item?: WorkItem }) {
  if (!item) {
    return (
      <section className="work-not-found">
        <p>404 / This frame is empty</p>
        <h1>That work could not be found.</h1>
        <a href="/">Return to the index <span aria-hidden="true">↗</span></a>
      </section>
    )
  }

  const index = workItems.findIndex((entry) => entry.slug === item.slug)
  const previous = workItems[(index - 1 + workItems.length) % workItems.length]
  const next = workItems[(index + 1) % workItems.length]
  const destination = item.previewUrl || item.links.find((link) => link.href.startsWith('https://github.com/'))?.href
  const destinationLabel = item.previewUrl ? 'website' : 'project'

  return (
    <article className={`work-detail work-detail-${item.slug}`} aria-labelledby="work-detail-title">
      <WorkSceneMedia item={item} />
      <header className="work-detail-header">
        <a href="/index" className="detail-back-link" aria-label="Close and return to selected work"><span aria-hidden="true">×</span></a>
        <span className="detail-header-index">ALI HAMOUDI <span>/</span> {String(index + 1).padStart(2, '0')} — {String(workItems.length).padStart(2, '0')}</span>
      </header>
      {destination ? (
        <a className="detail-focus" href={destination} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.title} ${destinationLabel} in a new tab`}>
          <span className="detail-focus-action">Open <span aria-hidden="true">↗</span></span>
        </a>
      ) : (
        <div className="detail-focus detail-focus-empty" aria-hidden="true" />
      )}
      <WorkArtPeek item={item} />
      <div className="detail-copy">
        <div className="detail-copy-row">
          <span aria-hidden="true">01</span>
          <h1 id="work-detail-title">{item.title}</h1>
        </div>
        <div className="detail-copy-row">
          <span aria-hidden="true">02</span>
          <p>{item.impact}</p>
        </div>
        <div className="detail-copy-row">
          <span aria-hidden="true">03</span>
          <p>{item.technical}</p>
        </div>
      </div>
      <footer className="work-detail-footer">
        <a className="detail-step-link" href={`/work/${previous.slug}`}><span>←</span><span>PREVIOUS<small>{previous.title}</small></span></a>
        <a className="detail-step-link detail-step-next" href={`/work/${next.slug}`}><span>NEXT<small>{next.title}</small></span><span>→</span></a>
      </footer>
    </article>
  )
}

export default App
