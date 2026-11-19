import ArrowIcon from './ArrowIcon'
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
    for (const field of ['name', 'contact', 'idea']) {
      const value = String(data.get(field) || '').trim()
      if (!value) {
        setError('Please add your name, contact details, and idea.')
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
      <a href="/" aria-label="Return to portfolio"><span aria-hidden="true"><ArrowIcon direction="left" /></span> Back to portfolio</a>
      <span>ali hamoudi / let’s build</span>
    </header>

    {status === 'success' ? (
      <section className="inquiry-success" role="status" aria-labelledby="inquiry-success-title">
        <svg className="inquiry-success-icon" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="36" />
          <path d="m24 40 11 11 22-24" />
        </svg>
        <h1 id="inquiry-success-title" ref={successTitle} tabIndex={-1}>Idea received.</h1>
        <p>I’ll be in touch.</p>
        <a className="inquiry-back-button" href="/">Back to portfolio <span aria-hidden="true"><ArrowIcon /></span></a>
      </section>
    ) : (
      <div className="inquiry-layout">
        <section className="inquiry-intro" aria-labelledby="inquiry-title">
          <h1 id="inquiry-title">What do you<br />want to build?</h1>
          <p>A few words is all it takes.</p>
          <figure className="inquiry-flower" aria-hidden="true"><img src="/images/hero-flower.png" alt="" /><span>+</span></figure>
        </section>

        <form className="inquiry-form" name="portfolio-project" method="POST" action="/" data-netlify="true" netlify-honeypot="bot-field" aria-labelledby="inquiry-title" aria-busy={status === 'submitting'} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="portfolio-project" />
          <p hidden><label>Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
          <fieldset disabled={status === 'submitting'}>
            <div className="inquiry-contact-fields">
              <div className="inquiry-field">
                <label htmlFor="project-name"><span className="inquiry-field-index" aria-hidden="true">01</span>Name</label>
                <input id="project-name" name="name" autoComplete="name" maxLength={120} required />
              </div>
              <div className="inquiry-field">
                <label htmlFor="project-contact"><span className="inquiry-field-index" aria-hidden="true">02</span>Contact</label>
                <input id="project-contact" name="contact" type="text" maxLength={254} placeholder="Email, phone, or @handle" required />
              </div>
            </div>
            <div className="inquiry-field">
              <label htmlFor="project-idea"><span className="inquiry-field-index" aria-hidden="true">03</span>Your idea</label>
              <textarea id="project-idea" name="idea" rows={6} maxLength={5000} placeholder="A little about what you have in mind…" required />
            </div>
            {error && <p className="inquiry-error" ref={errorMessage} role="alert" tabIndex={-1}>{error} <a href="mailto:alihamoudiu18@gmail.com">Email me <span aria-hidden="true"><ArrowIcon /></span></a></p>}
            <button className="inquiry-submit" type="submit" disabled={status === 'submitting'}><span>{status === 'submitting' ? 'Sending your idea…' : 'Send idea'}</span><span aria-hidden="true">{status === 'submitting' ? '…' : <ArrowIcon />}</span></button>
          </fieldset>
          <p className="inquiry-privacy">Only used to reply.</p>
        </form>
      </div>
    )}
  </div>
}
