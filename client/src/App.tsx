import { useEffect, useState } from 'react'
import './App.css'

type Page = 'home' | 'experience' | 'projects' | 'freelance' | 'about' | 'contact'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

function getPage(): Page {
  const route = window.location.hash.slice(2) as Page
  return pages.some((page) => page.id === route) ? route : 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPage)

  useEffect(() => {
    const updatePage = () => {
      setPage(getPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', updatePage)
    return () => window.removeEventListener('hashchange', updatePage)
  }, [])

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
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <footer className="site-footer section-wrap">
        <a className="footer-mark" href="#/home">AH<span>✳</span></a>
        <span>Designed &amp; built with care.</span>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="mailto:hello@example.com">Email ↗</a>
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
          <p className="eyebrow"><span className="status-dot" /> Open to opportunities <span className="eyebrow-divider">/</span> Your city</p>
          <h1>Thoughtful software.<br /><em>Made for people.</em></h1>
          <p className="intro-description">Hi, I’m Ali, a software engineer who turns complex ideas into clear, useful digital experiences. I care about the details, from the first sketch to the final interaction.</p>
          <div className="intro-actions">
            <a className="button button-primary" href="#/projects">Explore my work <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#/contact">Let’s talk <span aria-hidden="true">↗</span></a>
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
        <a href="#/experience"><span>02</span><strong>Experience &amp; education</strong><i>↗</i></a>
        <a href="#/about"><span>03</span><strong>A little about me</strong><i>↗</i></a>
      </nav>
    </>
  )
}

const projectEntries = [
  {
    title: 'Digital Duel',
    type: 'Game project',
    summary: 'A local two-player shooter built in C with SDL2, including combat, collision detection, and the full game loop.',
    tags: ['C', 'SDL2', 'Game dev'],
    imageLabel: 'Digital Duel image',
    image: '/images/digital-duel.svg',
  },
  {
    title: 'Applibit',
    type: 'Product build',
    summary: 'A resume-building web app with onboarding, authentication, billing, and dynamic resume workflows.',
    tags: ['JavaScript', 'Firebase', 'Stripe'],
    imageLabel: 'Applibit image',
    image: '/images/applibit.svg',
  },
  {
    title: 'Robotic Arm Control System',
    type: 'Systems project',
    summary: 'A Python + WebSocket dashboard for monitoring a robotic arm in real time from a browser.',
    tags: ['Python', 'WebSocket', 'UI'],
    imageLabel: 'Robotic Arm image',
    image: '/images/robotic-arm.svg',
  },
  {
    title: 'Secret Santa Automation Script',
    type: 'Automation script',
    summary: 'A Bash workflow that registers participants, assigns recipients, and sends personalized emails automatically.',
    tags: ['Bash', 'Linux', 'Automation'],
    imageLabel: 'Secret Santa image',
    image: '/images/secret-santa.svg',
  },
  {
    title: 'OPSConnect',
    type: 'Hackathon project',
    summary: 'An AI-powered people-discovery and knowledge-retrieval platform built for a large public-sector organization.',
    tags: ['React', 'TypeScript', 'AI'],
    imageLabel: 'OPSConnect image',
    image: '/images/opsconnect.svg',
  },
] as const

const experienceEntries = [
  {
    company: 'Ontario Government — GovTechON',
    dates: '2024 — Present',
    title: 'Full-Stack Software Engineer',
    summary: 'Built and modernized a large enterprise intranet and media-delivery platform across Go APIs, Vue/Nuxt, and WordPress integration layers.',
    image: '/images/govtechon.svg',
  },
  {
    company: 'Vironix AI',
    dates: 'Sep 2025 — Present',
    title: 'Founding Software Engineer / Technical Co-Founder',
    summary: 'Helped architect and ship a full-stack AI video analytics platform with billing, async processing, and production safeguards.',
    image: '/images/vironix-ai.svg',
  },
] as const

const freelanceEntries = [
  {
    title: 'Course Availability Notifier',
    type: 'Automation tool',
    summary: 'A Selenium-based monitor for university course availability with automated SMS alerts and polling logic.',
    tags: ['Python', 'Selenium', 'SMS'],
    imageLabel: 'Course Availability image',
    image: '/images/course-availability-notifier.svg',
  },
  {
    title: 'JTC Property Services Website',
    type: 'Client website',
    summary: 'A responsive business website with service pages, project galleries, and online quote request flows.',
    tags: ['HTML', 'CSS', 'Freelance'],
    imageLabel: 'JTC website image',
    image: '/images/jtc-property-services.svg',
  },
  {
    title: 'Apartment Listing Filter & AI Scraper',
    type: 'Automation service',
    summary: 'A browser-based apartment search tool using Selenium and OpenAI to surface only valid two-bedroom listings.',
    tags: ['Python', 'AI', 'Automation'],
    imageLabel: 'Apartment filter image',
    image: '/images/apartment-listing-filter.svg',
  },
  {
    title: 'Business Website & Booking System',
    type: 'Client website',
    summary: 'A lead-generation website and booking workflow for a service business looking to improve online conversions.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    imageLabel: 'Booking website image',
    image: '/images/business-booking-site.svg',
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

function MediaPanel({ src, alt, label }: { src?: string; alt: string; label: string }) {
  return (
    <div className="media-panel">
      {src ? (
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
            <article className="project-card" key={project.title}>
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
            </article>
          ))}
        </div>
        <a className="all-work-link" href="#/contact">Have a project in mind? <span>Let’s make it real ↗</span></a>
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
            <article className="experience-entry" key={experience.company}>
              <MediaPanel src={experience.image} alt={`${experience.company} cover`} label={`${experience.company} image`} />
              <div className="experience-copy">
                <span className="timeline-date">{experience.dates}</span>
                <h3>{experience.title}</h3>
                <p className="experience-company">{experience.company}</p>
                <p>{experience.summary}</p>
              </div>
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
          {freelanceEntries.map((project, index) => (
            <article className="project-card" key={project.title}>
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
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeading kicker="A LITTLE ABOUT ME" title="The person behind the pixels" detail="Curious by nature, thoughtful by design." />
      <section className="about-section section-wrap">
        <div className="about-stamp" aria-hidden="true"><span>CURIOUS<br />BY NATURE</span><b>✳</b></div>
        <div className="about-copy"><h2>Good work is a<br /><em>team sport.</em></h2><p>I like asking one more question, making the complicated feel simple, and working with kind people who care about what they put into the world. Away from my screen, you’ll find me out for a long walk or trying a new recipe.</p><a className="text-link" href="#/contact">More about me <span aria-hidden="true">↗</span></a></div>
        <div className="about-note"><span className="note-mark">“</span><p>Make it useful.<br />Make it feel right.<br /><em>Then make it better.</em></p><span className="note-credit">A SMALL WORKING PHILOSOPHY</span></div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeading kicker="HAVE SOMETHING IN MIND?" title="Let’s make it matter" detail="Have a role, a project, or just a good question? My inbox is open." />
      <section className="contact-page-content section-wrap">
        <a className="contact-card" href="mailto:hello@example.com"><span className="contact-card-label">EMAIL</span><strong>hello@example.com</strong><span className="contact-card-arrow">↗</span></a>
        <div className="contact-socials"><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div>
      </section>
    </>
  )
}

export default App
