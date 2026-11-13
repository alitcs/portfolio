import { useEffect, useRef, useState, type FormEvent } from 'react'
import './ProjectInquiry.css'

export default function ProjectInquiryPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState('')
  const sending = useRef(false)
  const successTitle = useRef<HTMLHeadingElement>(null)
  const errorMessage = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    document.title = 'Start a project — Ali Hamoudi'
  }, [])

  useEffect(() => {
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'instant' })
      successTitle.current?.focus({ preventScroll: true })
    }
  }, [status])

  useEffect(() => {
    if (error) errorMessage.current?.focus({ preventScroll: true })
  }, [error])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending.current) return

    const form = event.currentTarget
    const data = new FormData(form)
    for (const field of ['name', 'email', 'idea']) {
      const value = String(data.get(field) || '').trim()
      if (!value) {
        setError('Please add your name, email, and a little about your idea.')
        form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${field}"]`)?.focus()
        return
      }
      data.set(field, value)
    }

    sending.current = true
    setError('')
    setStatus('submitting')
    const body = new URLSearchParams()
    data.forEach((value, key) => { if (typeof value === 'string') body.append(key, value) })

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(20000),
      })
      if (!response.ok) throw new Error('Submission was not accepted')
      setStatus('success')
    } catch {
      setStatus('idle')
      setError('Your project details couldn’t be sent. Please try again, or email me directly below.')
    } finally {
      sending.current = false
    }
  }

  return <div className="inquiry-page">
    <header className="inquiry-nav">
      <a href="/" aria-label="Return to portfolio"><span aria-hidden="true">←</span> Portfolio</a>
      <span>ali hamoudi / let’s build</span>
    </header>

    {status === 'success' ? (
      <section className="inquiry-success" role="status" aria-labelledby="inquiry-success-title">
        <svg className="inquiry-success-icon" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="36" />
          <path d="m24 40 11 11 22-24" />
        </svg>
        <p className="inquiry-kicker">Project submitted</p>
        <h1 id="inquiry-success-title" ref={successTitle} tabIndex={-1}>Thanks for sharing<br />your idea.</h1>
        <p>Your project details have been submitted. I’ll get back to you at the email you provided.</p>
        <a className="inquiry-back-button" href="/">Back to portfolio <span aria-hidden="true">↗</span></a>
      </section>
    ) : (
      <div className="inquiry-layout">
        <section className="inquiry-intro" aria-labelledby="inquiry-title">
          <p className="inquiry-kicker">An idea starts here</p>
          <h1 id="inquiry-title">What do you<br />want to build?</h1>
          <p>A new website, a useful tool, or an idea you’re still figuring out. Tell me what you have in mind.</p>
          <div className="inquiry-prompts">
            <h2>A few things you can share</h2>
            <ol>
              <li><span aria-hidden="true">01</span><p>What it should do, and who it’s for.</p></li>
              <li><span aria-hidden="true">02</span><p>Whether you’re starting fresh or improving something that exists.</p></li>
              <li><span aria-hidden="true">03</span><p>Any must-have features, references, or deadlines.</p></li>
            </ol>
            <p>No polished brief needed. A few sentences are enough.</p>
          </div>
        </section>

        <form className="inquiry-form" name="portfolio-project" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" aria-label="Tell me about your project" aria-busy={status === 'submitting'} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="portfolio-project" />
          <p hidden><label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
          <p className="inquiry-required">Your name, email, and idea are required. Everything else is optional.</p>
          <fieldset disabled={status === 'submitting'}>
            <div className="inquiry-contact-fields">
              <div className="inquiry-field">
                <label htmlFor="project-name">Your name</label>
                <input id="project-name" name="name" autoComplete="name" maxLength={120} placeholder="Your name" required />
              </div>
              <div className="inquiry-field">
                <label htmlFor="project-email">Your email</label>
                <input id="project-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="inquiry-field">
              <label htmlFor="project-idea">What would you like to build?</label>
              <textarea id="project-idea" name="idea" rows={7} maxLength={5000} placeholder="The idea, the problem it solves, and anything you’d like me to know…" aria-describedby="project-idea-hint" required />
              <p id="project-idea-hint" className="inquiry-field-hint">Links to examples or inspiration are welcome.</p>
            </div>
            <div className="inquiry-field">
              <label htmlFor="project-timeline">Timeline <span>(optional)</span></label>
              <input id="project-timeline" name="timeline" maxLength={180} placeholder="A specific date, a rough idea, or no rush" />
            </div>
            {error && <p className="inquiry-error" ref={errorMessage} role="alert" tabIndex={-1}>{error} <a href="mailto:alihamoudiu18@gmail.com">Email me <span aria-hidden="true">↗</span></a></p>}
            <button className="inquiry-submit" type="submit" disabled={status === 'submitting'}><span>{status === 'submitting' ? 'Sending your idea…' : 'Send project idea'}</span><span aria-hidden="true">{status === 'submitting' ? '…' : '↗'}</span></button>
          </fieldset>
          <p className="inquiry-privacy">I’ll only use your details to respond to your inquiry.</p>
        </form>
      </div>
    )}
  </div>
}
