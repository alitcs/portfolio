import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import './App.css'

type Page = 'home' | 'experience' | 'projects' | 'freelance' | 'extracurricular' | 'note'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'extracurricular', label: 'Extracurricular' },
]

function getPage(): Page {
  const route = window.location.hash.slice(2).split('#')[0] as Page
  return route === 'note' || pages.some((page) => page.id === route) ? route : 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPage)
  const [section, setSection] = useState(() => window.location.hash.split('#')[2] ?? '')

  useEffect(() => {
    const updatePage = () => {
      setPage(getPage())
      setSection(window.location.hash.split('#')[2] ?? '')
    }
    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

  useEffect(() => {
    if (section && page === 'home') {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
    } else if (!section) {
      window.scrollTo(0, 0)
    }
  }, [page, section])

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#/home" aria-label="Ali Hamoudi, home">
          <span className="wordmark-mark">AH</span>
          <span className="wordmark-copy">
            <strong>Ali Hamoudi</strong>
            <span>Software engineer</span>
          </span>
        </a>
        {page === 'note' ? (
          <a className="note-header-back" href="#/home">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 4 2.5 10 8 16M3 10h14" /></svg>
            <span>Back to home</span>
          </a>
        ) : (
          <>
            <nav className="main-nav" aria-label="Main navigation">
              {pages.map((item) => (
                <a
                  className={page === item.id ? 'active' : undefined}
                  aria-current={page === item.id ? 'page' : undefined}
                  href={`#/${item.id}`}
                  key={item.id}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="resume-link" href="/AliHamoudi.pdf" download>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 2.75v9m0 0 3.25-3.25M10 11.75 6.75 8.5M4 13.5v2.75h12V13.5" />
              </svg>
              <span>Resume</span>
            </a>
          </>
        )}
      </header>

      <main key={page} className="page-main">
        {page === 'home' && <HomePage />}
        {page === 'note' && <NotePage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'freelance' && <FreelancePage />}
        {page === 'extracurricular' && <ExtracurricularPage />}
      </main>

      {page !== 'note' && (
        <footer className="site-footer section-wrap">
          <a className="footer-mark" href="#/home">AH<span>✳</span></a>
          <span>Designed &amp; built with care.</span>
          <div className="footer-links">
            <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="mailto:alihamoudiu18@gmail.com">Email ↗</a>
          </div>
        </footer>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="intro section-wrap">
        <div className="intro-copy">
          <p className="eyebrow"><span className="status-dot" /> Open to opportunities <span className="eyebrow-divider">/</span> Toronto </p>
          <h1>Thoughtful software.<br /><em>Made for people.</em></h1>
          <p className="intro-description">Hi, I’m Ali, a software engineer who turns complex ideas into clear, useful digital experiences. I care about the details, from the first sketch to the final interaction.</p>
          <div className="intro-actions">
            <a className="button button-primary" href="#/note">Send me a note <span aria-hidden="true">↗</span></a>
          </div>
          <div className="intro-socials" aria-label="Contact links">
            <div className="intro-social-links">
              <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <span className="intro-email-link">alihamoudiu18@gmail.com</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Decorative illustration with the initials AH" role="img">
          <div className="art-caption"><span>INDEPENDENT BY DESIGN</span><span>01 / 04</span></div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />
          <span className="hero-monogram">AH</span>
          <span className="art-side-label">BUILD WITH INTENTION</span>
          <div className="art-foot"><span>DESIGN</span><span>ENGINEERING</span><span>✳</span></div>
        </div>
      </section>
      <MetricsSection />
      <EducationSection />
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
          <a className="button button-primary" href="#/home">Back to home <span aria-hidden="true">↗</span></a>
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
                <span aria-hidden="true">{isSubmitting ? '···' : '↗'}</span>
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
    type: 'Game project',
    summary: 'Designed and built a local two-player top-down shooter in C and SDL2, with custom graphics, projectile combat, collision detection, and a complete game loop.',
    tags: ['C', 'SDL2', 'Game dev'],
    imageLabel: 'Digital Duel image',
    image: '/images/digital-duel.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Digital-Duel' }],
  },
  {
    title: 'Applibit',
    type: 'Product build',
    summary: 'Built a resume builder with multi-step onboarding, Firebase authentication, dynamic resume sections, and Stripe subscriptions.',
    tags: ['JavaScript', 'Firebase', 'Stripe'],
    imageLabel: 'Applibit image',
    image: '/images/applibit.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Applibit' }],
  },
  {
    title: 'Robotic Arm Control System with Web UI',
    type: 'Systems project',
    summary: 'Connected Python keyboard controls to a browser dashboard over WebSockets, with six live motor gauges, packet history, and reconnect handling.',
    tags: ['Python', 'WebSocket', 'UI'],
    imageLabel: 'Robotic Arm image',
    image: '/images/robotic-arm.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Robotic-Arm-UI' }],
  },
  {
    title: 'Secret Santa Automation Script',
    type: 'Automation script',
    summary: 'Automated participant registration, randomized no-self-match assignments, personalized email generation, and delivery from a Linux command line.',
    tags: ['Bash', 'Linux', 'Automation'],
    imageLabel: 'Secret Santa image',
    image: '/images/secret-santa.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Secret-Santa' }],
  },
] as const

const experienceEntries = [
  {
    company: 'Ontario Government — GovTechON',
    dates: '2024 — Present',
    title: 'Full-Stack Software Engineer',
    summary: 'Deliver full-stack features and modernization for an Ontario Public Service intranet and media platform serving tens of thousands of employees. Work spans backend services, web applications, and content systems, including cloud-storage migration, performance and reliability improvements, and security hardening.',
    image: '/images/govtechon.svg',
  },
  {
    company: 'Vironix AI',
    dates: 'Sep 2025 — Present',
    title: 'Founding Software Engineer / Technical Co-Founder',
    summary: 'Co-built and operate a customer-facing AI video analytics product as one of two engineers, sharing ownership across the frontend, backend, video-processing pipeline, credit and billing systems, and production safeguards. Interviewed 50+ engineering candidates and took an active role in growing the founding team.',
    image: '/images/vironix-ai.svg',
    previewUrl: 'https://vironixai.net/login',
    links: [{ label: 'Visit Vironix AI', href: 'https://vironixai.net/' }],
  },
] as const

const freelanceEntries = [
  {
    title: 'Course Availability Notifier',
    type: 'Automation tool',
    summary: 'Customized Selenium automation for students to monitor course-registration portals, preserve login sessions, and send SMS alerts when seats opened.',
    tags: ['Python', 'Selenium', 'SMS'],
    imageLabel: 'Course Availability image',
    image: '/images/course-availability-notifier.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Course-Availability-Notifier' }],
  },
  {
    title: 'JTC Property Services Website',
    type: 'Client website',
    summary: 'Built a responsive multi-page site for a GTA property-maintenance company, including service areas, a real-work gallery, and an emailed quote-request form.',
    tags: ['HTML', 'CSS', 'Freelance'],
    imageLabel: 'JTC website image',
    image: '/images/jtc-property-services.svg',
    previewUrl: 'https://majestic-youtiao-4bc24e.netlify.app/',
    links: [{ label: 'Visit website', href: 'https://majestic-youtiao-4bc24e.netlify.app/' }],
  },
  {
    title: 'Apartment Listing Filter & AI Scraper',
    type: 'Automation service',
    summary: 'Created a paid Selenium and OpenAI tool that classifies apartment descriptions, filters for genuine two-bedroom listings, and saves results between runs.',
    tags: ['Python', 'AI', 'Automation'],
    imageLabel: 'Apartment filter image',
    image: '/images/apartment-listing-filter.svg',
    links: [{ label: 'View project', href: 'https://github.com/alitcs/Apartment-Filter' }],
  },
  {
    title: 'Little Genius Island Website & Booking System',
    type: 'Client website',
    summary: 'Built a responsive multi-page client website with a booking and quote-request workflow to support customer acquisition and simplify inquiry management.',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'React'],
    imageLabel: 'Little Genius Island website image',
    image: '/images/business-booking-site.svg',
    previewUrl: 'https://littlegeniusisland.ca/',
    links: [{ label: 'Visit website', href: 'https://littlegeniusisland.ca/' }],
  },
  {
    title: 'Tutoring',
    type: 'Freelance & tutoring organizations',
    summary: 'Tutored students in Grades 3–12 in math, English, programming, functions, calculus, and physics, adapting lessons to each student.',
    tags: ['Tutoring', 'Mentorship', 'Communication'],
    imageLabel: 'Tutoring image',
    image: '/images/tutoring.svg',
    cardLink: false,
    links: [
      { label: 'Little Genius Island', href: 'https://littlegeniusisland.ca' },
      { label: 'Best Brains', href: 'https://bestbrains.com' },
    ],
  },
  {
    title: 'Under The Tree Charity',
    type: 'Community initiative',
    summary: 'Founded a winter community initiative, raised over $1,000, and coordinated distribution of hot meals, warm clothing, blankets, and winter supplies.',
    tags: ['Fundraising', 'Community outreach', 'Organization'],
    imageLabel: 'Under The Tree Charity image',
    image: '/images/under-the-tree-charity.svg',
  },
] as const

const extracurricularEntries = [
  {
    title: 'Connect OPS',
    type: 'OGT Summer 2026 hackathon',
    summary: 'Co-built a full-stack, governance-first knowledge and people-discovery prototype for the Ontario Public Service. The team placed 3rd; the live demo uses mock data and a mock AI service.',
    tags: ['React', 'TypeScript', 'Express', 'Three.js', 'AI prototype'],
    imageLabel: 'Connect OPS image',
    image: '/images/connect-ops.svg',
    previewUrl: 'https://connectops.netlify.app/',
    links: [{ label: 'View live demo', href: 'https://connectops.netlify.app' }],
  },
  {
    title: 'T.A.S.C. Website Development',
    type: 'Toronto Autonomous Systems Collective',
    summary: 'Designed and developed the organization’s React and TypeScript website, translating team requirements into a responsive experience and maintaining the deployed site.',
    tags: ['React', 'TypeScript', 'Responsive UI', 'Deployment'],
    imageLabel: 'T.A.S.C. website image',
    image: '/images/tasctmu.svg',
    previewUrl: 'https://tasctmu.com/',
    links: [{ label: 'Visit T.A.S.C.', href: 'https://tasctmu.com' }],
  },
] as const

const educationEntries = [
  {
    title: 'Toronto Metropolitan University',
    type: 'Sep 2023 — Present · Toronto, ON',
    summary: 'Bachelor of Science in Computer Science',
    tags: ['Co-op', 'Dean’s List'],
    imageLabel: 'Toronto Metropolitan University image',
    image: '/images/education.svg',
  },
] as const

function PageHeading({ kicker, title, detail }: { kicker: string; title: string; detail: string }) {
  return (
    <div className="page-heading section-wrap">
      <p className="section-kicker">{kicker}</p>
      <h1>{title}<span className="heading-period">.</span></h1>
      <p>{detail}</p>
    </div>
  )
}

function MediaPanel({ src, alt, label, previewUrl }: { src?: string; alt: string; label: string; previewUrl?: string }) {
  return (
    <div className={`media-panel ${previewUrl ? 'live-site-preview' : ''}`}>
      {previewUrl ? (
        <iframe
          src={previewUrl}
          title={`${alt} live preview`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
          tabIndex={-1}
          aria-hidden="true"
        />
      ) : src ? (
        <img src={src} alt={alt} />
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
              <CardLink href={project.links[0]?.href} title={project.title}>
                <MediaPanel src={project.image} alt={`${project.title} cover`} label={project.imageLabel} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {project.type.toUpperCase()}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </CardLink>
              <EntryLinks links={project.links} />
            </article>
          ))}
        </div>
        <a className="all-work-link" href="#/home#contact">Have a project in mind? <span>Let’s make it real ↗</span></a>
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
                href={'links' in experience ? experience.links[0]?.href : undefined}
                title={experience.company}
                preview={'previewUrl' in experience}
              >
                <MediaPanel src={experience.image} alt={`${experience.company} cover`} label={`${experience.company} image`} previewUrl={'previewUrl' in experience ? experience.previewUrl : undefined} />
                <div className="experience-copy">
                  <span className="timeline-date">{experience.dates}</span>
                  <h3>{experience.title}</h3>
                  <p className="experience-company">{experience.company}</p>
                  <p>{experience.summary}</p>
                </div>
              </CardLink>
              {'links' in experience && <EntryLinks links={experience.links} />}
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
      <PageHeading kicker="CLIENT WORK" title="Freelance" detail="Independent work for clients, students, and small businesses across automation, web design, and product delivery." />
      <section className="projects-page-content section-wrap">
        <div className="project-grid">
          {freelanceEntries.map((project, index) => {
            const cardHref = 'links' in project && (!('cardLink' in project) || project.cardLink !== false)
              ? project.links[0]?.href
              : undefined

            return (
            <article className={`project-card ${cardHref ? 'linked-card' : ''}`} key={project.title}>
              <CardLink href={cardHref} title={project.title} preview={'previewUrl' in project}>
                <MediaPanel src={project.image} alt={`${project.title} cover`} label={project.imageLabel} previewUrl={'previewUrl' in project ? project.previewUrl : undefined} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {project.type.toUpperCase()}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                  </div>
                  {cardHref && <span className="project-arrow" aria-hidden="true">↗</span>}
                </div>
                <div className="tag-list">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </CardLink>
              {'links' in project && <EntryLinks links={project.links} />}
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
        <a className="card-click-overlay" href={href} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
          {preview && <span className="card-link-hint">Visit live site <span aria-hidden="true">↗</span></span>}
        </a>
      )}
    </div>
  )
}

function EntryLinks({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <div className="entry-links">
      {links.map((link) => (
        <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
          {link.label}<span aria-hidden="true"> ↗</span>
        </a>
      ))}
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
              <CardLink href={entry.links[0]?.href} title={entry.title} preview>
                <MediaPanel src={entry.image} alt={`${entry.title} cover`} label={entry.imageLabel} previewUrl={entry.previewUrl} />
                <div className="project-info">
                  <div>
                    <span className="project-number">{String(index + 1).padStart(2, '0')} / {entry.type.toUpperCase()}</span>
                    <h3>{entry.title}</h3>
                    <p>{entry.summary}</p>
                  </div>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="tag-list">
                  {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </CardLink>
              <EntryLinks links={entry.links} />
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function MetricsSection() {
  const metrics = [
    { value: '3', label: 'Current business partners' },
    { value: '1', label: 'Hackathon won' },
    { value: '50+', label: 'Engineering candidates interviewed' },
    { value: '$1,000+', label: 'Raised for community support' },
  ]

  return (
    <section className="home-metrics section-wrap" aria-label="Career metrics">
      <ul>
        {metrics.map((metric) => (
          <li key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function EducationSection() {
  return (
    <section id="education" className="home-education section-wrap" aria-labelledby="education-title">
      <div className="education-section-heading">
        <p className="section-kicker">EDUCATION</p>
        <span className="education-heading-note">CURRENT STUDIES</span>
      </div>
      <div className="education-feature-list">
        {educationEntries.map((entry) => (
          <article className="education-feature" key={entry.title}>
            <div className="education-feature-copy">
              <span className="education-date">{entry.type}</span>
              <h2 id="education-title">{entry.title}</h2>
              <p className="education-degree">{entry.summary}</p>
              <div className="education-feature-tags">
                {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <MediaPanel src={entry.image} alt={`${entry.title} education illustration`} label={entry.imageLabel} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default App
