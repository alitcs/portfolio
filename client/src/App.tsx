import { useEffect, useState, type ReactNode } from 'react'
import './App.css'

type Page = 'home' | 'experience' | 'projects' | 'freelance' | 'extracurricular'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'extracurricular', label: 'Extracurricular' },
]

function getPage(): Page {
  const route = window.location.hash.slice(2).split('#')[0] as Page
  return pages.some((page) => page.id === route) ? route : 'home'
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
        <a className="resume-link" href="/resume.txt" download>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2.75v9m0 0 3.25-3.25M10 11.75 6.75 8.5M4 13.5v2.75h12V13.5" />
          </svg>
          <span>Resume</span>
        </a>
      </header>

      <main key={page} className="page-main">
        {page === 'home' && <HomePage />}
        {page === 'projects' && <ProjectsPage />}
        {page === 'experience' && <ExperiencePage />}
        {page === 'freelance' && <FreelancePage />}
        {page === 'extracurricular' && <ExtracurricularPage />}
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-mark" href="#/home">AH<span>✳</span></a>
        <span>Designed &amp; built with care.</span>
        <div className="footer-links">
          <a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:alihamoudiu18@gmail.com">Email ↗</a>
        </div>
        <a className="back-top" href="#/home" aria-label="Back to home">↑</a>
      </footer>
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
            <a className="button button-primary" href="#/projects">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#/home#contact">Let’s talk <span aria-hidden="true">↗</span></a>
          </div>
          <div className="availability"><span className="availability-mark">✳</span> Currently building something new</div>
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
      <section className="quick-facts section-wrap" aria-label="At a glance">
        <div className="fact-item"><span className="fact-index">01</span><div><strong>Product-minded</strong><span>From rough idea to refined UI</span></div></div>
        <div className="fact-item"><span className="fact-index">02</span><div><strong>Full-stack curious</strong><span>Thoughtful across the stack</span></div></div>
        <div className="fact-item"><span className="fact-index">03</span><div><strong>Always learning</strong><span>Better with every build</span></div></div>
      </section>
      <nav className="home-shortcuts section-wrap" aria-label="Explore portfolio">
        <a href="#/projects"><span>01</span><strong>Selected projects</strong><i>↗</i></a>
        <a href="#/experience"><span>02</span><strong>Experience</strong><i>↗</i></a>
        <a href="#/home#education"><span>03</span><strong>Education</strong><i>↗</i></a>
        <a href="#/home#about"><span>04</span><strong>About</strong><i>↗</i></a>
        <a href="#/home#contact"><span>05</span><strong>Contact</strong><i>↗</i></a>
      </nav>
      <EducationSection />
      <AboutSection />
      <ContactSection />
    </>
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
    summary: 'Ships full-stack features across Go APIs, Nuxt/Vue, and WordPress for an enterprise intranet and media platform. Work includes chi modernization, S3 migration, Redis performance fixes, and security hardening.',
    image: '/images/govtechon.svg',
  },
  {
    company: 'Vironix AI',
    dates: 'Sep 2025 — Present',
    title: 'Founding Software Engineer / Technical Co-Founder',
    summary: 'Helped build and operate a customer-facing AI video analytics product, spanning React and Node.js, async video processing, credit accounting, Stripe billing, and production safeguards. Also interviewed 50+ engineering candidates.',
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
    summary: 'Bachelor of Science in Computer Science, Co-op. Dean’s List.',
    tags: ['Computer Science', 'Co-op', 'Dean’s List'],
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

function EducationSection() {
  return (
    <section id="education" className="home-education section-wrap">
      <div className="section-heading">
        <div><p className="section-kicker">EDUCATION</p><h2>Learning by doing.</h2></div>
      </div>
      <div className="experience-list">
        {educationEntries.map((entry) => (
          <article className="experience-entry" key={entry.title}>
            <MediaPanel src={entry.image} alt={`${entry.title} cover`} label={entry.imageLabel} />
            <div className="experience-copy">
              <span className="timeline-date">{entry.type}</span>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
              <div className="tag-list">
                {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="about-section section-wrap">
      <div className="about-stamp" aria-hidden="true"><span>CURIOUS<br />BY NATURE</span><b>✳</b></div>
      <div className="about-copy"><p className="section-kicker">A LITTLE ABOUT ME</p><h2>Good work is a<br /><em>team sport.</em></h2><p>I like asking one more question, making the complicated feel simple, and working with kind people who care about what they put into the world. Away from my screen, you’ll find me out for a long walk or trying a new recipe.</p><a className="text-link" href="#/home#contact">More about me <span aria-hidden="true">↗</span></a></div>
      <div className="about-note"><span className="note-mark">“</span><p>Make it useful.<br />Make it feel right.<br /><em>Then make it better.</em></p><span className="note-credit">A SMALL WORKING PHILOSOPHY</span></div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="contact-home-section section-wrap">
      <div className="section-heading">
        <div><p className="section-kicker">HAVE SOMETHING IN MIND?</p><h2>Let’s make it matter.</h2></div>
        <p className="section-aside">Have a role, a project, or just a good question? My inbox is open.</p>
      </div>
      <a className="contact-card" href="mailto:alihamoudiu18@gmail.com"><span className="contact-card-label">EMAIL</span><strong>alihamoudiu18@gmail.com</strong><span className="contact-card-arrow">↗</span></a>
      <div className="contact-socials"><a href="https://www.linkedin.com/in/ali-hamoudi/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/alitcs" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div>
    </section>
  )
}

export default App
