import { useEffect, useState } from 'react'
import './App.css'

type Page = 'home' | 'experience' | 'projects' | 'about' | 'contact'

const pages: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
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

function PageHeading({ kicker, title, detail }: { kicker: string; title: string; detail: string }) {
  return (
    <div className="page-heading section-wrap">
      <p className="section-kicker">{kicker}</p>
      <h1>{title}<span className="heading-period">.</span></h1>
      <p>{detail}</p>
    </div>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageHeading kicker="A FEW THINGS I’VE MADE" title="Selected work" detail="A work in progress, in the best way. More projects coming soon." />
      <section className="projects-page-content section-wrap">
        <div className="project-grid">
          <article className="project-card">
            <a className="project-visual visual-garden" href="#/contact" aria-label="Ask me about the first project">
              <div className="mock-window"><div className="mock-top"><span /><span /><span /><i>studio / 01</i></div><div className="garden-copy"><span>FIELD NOTES NO. 01</span><strong>Find your<br />own rhythm.</strong><b>Explore the collection <span>↗</span></b></div><div className="garden-shape shape-a" /><div className="garden-shape shape-b" /><div className="garden-shape shape-c" /></div>
            </a>
            <div className="project-info"><div><span className="project-number">01 / CONCEPT</span><h3>Project title goes here</h3><p>A short line about the problem, your approach, and what changed.</p></div><span className="project-arrow" aria-hidden="true">↗</span></div>
            <div className="tag-list"><span>React</span><span>TypeScript</span><span>Product design</span></div>
          </article>
          <article className="project-card">
            <a className="project-visual visual-dashboard" href="#/contact" aria-label="Ask me about the second project">
              <div className="dashboard-frame"><div className="dashboard-sidebar"><span className="mini-logo">◒</span><i /><i /><i /><i /></div><div className="dashboard-main"><span className="dashboard-label">YOUR WEEK, IN FOCUS</span><div className="dashboard-title">Good morning,<br /><b>Sam.</b></div><div className="dashboard-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="dashboard-bottom"><span /><span /><span /></div></div></div>
            </a>
            <div className="project-info"><div><span className="project-number">02 / CONCEPT</span><h3>Another project title</h3><p>Make space for a second case study and its best result.</p></div><span className="project-arrow" aria-hidden="true">↗</span></div>
            <div className="tag-list"><span>Web app</span><span>UI engineering</span><span>2025</span></div>
          </article>
        </div>
        <a className="all-work-link" href="#/contact">Have a project in mind? <span>Let’s make it real ↗</span></a>
      </section>
    </>
  )
}

function ExperiencePage() {
  return (
    <>
      <PageHeading kicker="THE PATH SO FAR" title="Experience" detail="Good work comes from curiosity, collaboration, and a willingness to keep getting better." />
      <section className="experience-page-content section-wrap">
        <div className="timeline">
          <article className="timeline-item"><span className="timeline-date">2024 — NOW</span><div><h3>Software Engineer <span>· Company name</span></h3><p>Building accessible, user-focused products with a thoughtful team.</p></div><span className="timeline-type">FULL-TIME</span></article>
          <article className="timeline-item"><span className="timeline-date">2022 — 2024</span><div><h3>Role or internship <span>· Organization</span></h3><p>Shipped features, learned the craft, and made a measurable impact.</p></div><span className="timeline-type">EXPERIENCE</span></article>
          <article className="timeline-item"><span className="timeline-date">2021 — 2025</span><div><h3>Degree or certification <span>· School</span></h3><p>Studied computer science and the human side of technology.</p></div><span className="timeline-type">EDUCATION</span></article>
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
