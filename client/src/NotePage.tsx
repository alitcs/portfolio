import { useState, type FormEvent } from 'react'
export default function NotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    if (!name || !email || !message) {
      setError('Please add your name, email, and a message before sending.')
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
        throw new Error('This preview can’t send notes yet.')
      }
      const encodedFormData = new URLSearchParams()
      formData.forEach((value, key) => {
        if (typeof value === 'string')
          encodedFormData.append(key, value)
      })
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodedFormData.toString(),
      })
      if (!response.ok) {
        throw new Error('Please try again in a moment.')
      }
      setIsSubmitted(true)
    }
    catch (caughtError) {
      const reason = caughtError instanceof Error ? caughtError.message : 'Please try again.'
      setError(`Your note could not be sent. ${reason}`)
    }
    finally {
      setIsSubmitting(false)
    }
  }
  return (<section className="note-page">
    {isSubmitted ? (<div className="note-success" role="status" aria-live="polite">
      <svg className="success-check" viewBox="0 0 64 64" aria-hidden="true">
        <circle className="success-check-circle" cx="32" cy="32" r="27" />
        <path className="success-checkmark" d="m19 33 9 9 18-20" />
      </svg>
      <p className="section-kicker">NOTE RECEIVED</p>
      <h1>Thanks for reaching out.</h1>
      <p className="note-success-copy">Your message was accepted. I appreciate you taking the time to write.</p>
      <a className="button button-primary" href="/">Back to home <span aria-hidden="true">↗︎</span>
      </a>
    </div>) : (<>
      <div className="note-heading">
        <p className="section-kicker">06 / A CONVERSATION STARTER</p>
        <h1>A good idea<br />
          <em>starts with hello.</em>
        </h1>
        <p>A project, an opportunity, or something you think I should see. I’d love to hear about it. Prefer email? <a className="note-email" href="mailto:alihamoudiu18@gmail.com">alihamoudiu18@gmail.com ↗</a>
        </p>
      </div>
      <div className="note-layout">
        <aside className="note-guides" aria-labelledby="note-guides-title">
          <p className="section-kicker">A FEW THOUGHTS</p>
          <h2 id="note-guides-title">Helpful context</h2>
          <ul>
            <li>
              <span>01</span>
              <p>A little about you and what you’re working on.</p>
            </li>
            <li>
              <span>02</span>
              <p>The idea, question, or opportunity you have in mind.</p>
            </li>
            <li>
              <span>03</span>
              <p>Any timing or details that would help me understand.</p>
            </li>
          </ul>
        </aside>
        <form className="note-form" name="portfolio-note" method="POST" data-netlify="true" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="portfolio-note" />
          <div className="note-field">
            <label htmlFor="note-name">Your name</label>
            <input id="note-name" name="name" type="text" autoComplete="name" placeholder="Jane Smith" maxLength={120} required />
          </div>
          <div className="note-field">
            <label htmlFor="note-email">Your email</label>
            <input id="note-email" name="email" type="email" autoComplete="email" placeholder="jane@example.com" maxLength={254} required />
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
          <p className="note-privacy">Your email is only used to reply to your note.</p>
        </form>
      </div>
    </>)}
  </section>)
}
