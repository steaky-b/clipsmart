import { useState } from 'react'
import './WorkWithUs.css'

const STEPS = [
  { n: '01', t: 'Fill in the form', b: 'Tell us about your brand and goals. Takes 3 minutes.' },
  { n: '02', t: 'We reach out within 24 hours', b: 'We\'ll review your submission and come back with initial thoughts and a time to speak.' },
  { n: '03', t: '30-minute call — no prep needed', b: 'We ask about your brand, your goals, and your current marketing. Just show up.' },
  { n: '04', t: 'Campaign live in 48–72 hours', b: 'Once you\'re in, we brief the creator network and your campaign goes live within 2–3 days.' },
]

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function WorkWithUs() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', brand: '', campType: '', budget: '', details: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fname || !form.email || !form.brand) {
      setError('Please fill in your name, email, and brand name.')
      return
    }
    setError('')
    setSending(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'work-with-us', ...form }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again or book a call directly.')
      }
    } catch {
      setError('Something went wrong. Please try again or book a call directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Work With Us</div>
        <h1>Let's build your<br /><em>campaign.</em></h1>
        <p>Fill in the form below. We'll reach out within 24 hours to book a 30-minute call — no prep needed, no commitment required.</p>
        <div className="wwu-hero-guarantee">
          <span>✓</span> Full refund if we don't hit your guaranteed views
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="wwu-section">
        <div className="wwu-inner">
          {/* Left col */}
          <div className="wwu-left">
            <div className="section-eyebrow fade-up">What To Expect</div>
            <h2 className="wwu-h fade-up">Simple, transparent<br /><em>process.</em></h2>
            <div className="wwu-steps">
              {STEPS.map(({ n, t, b }) => (
                <div key={n} className="expect-item fade-up">
                  <div className="expect-n">{n}</div>
                  <div>
                    <div className="expect-t">{t}</div>
                    <div className="expect-b">{b}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="wwu-stats stagger">
              {[['1M+','Views per $1,000'],['$0.09','Effective CPM achieved'],['16hrs','First clip live']].map(([v,l]) => (
                <div key={l} className="ms">
                  <div className="ms-v">{v}</div>
                  <div className="ms-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="wwu-form-wrap fade-up">
            <div className="booking-card">
              <div className="booking-head">
                <h2>Get in Touch</h2>
                <p>We'll respond within 24 hours to book your call.</p>
              </div>

              {submitted ? (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <h3>Message received!</h3>
                  <p>We'll be in touch within 24 hours to book your call.</p>
                </div>
              ) : (
                <form
                  name="work-with-us"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="booking-form"
                >
                  <input type="hidden" name="form-name" value="work-with-us" />
                  <div className="form-row">
                    <div className="form-group">
                      <label>First name</label>
                      <input type="text" placeholder="Aston" value={form.fname} onChange={e => update('fname', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Last name</label>
                      <input type="text" placeholder="Baker" value={form.lname} onChange={e => update('lname', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" placeholder="you@brand.com" value={form.email} onChange={e => update('email', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Brand / Company name</label>
                    <input type="text" placeholder="Your brand name" value={form.brand} onChange={e => update('brand', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Campaign type</label>
                    <select value={form.campType} onChange={e => update('campType', e.target.value)}>
                      <option value="" disabled>Select campaign type</option>
                      <option value="ecomm">E-Commerce / Product</option>
                      <option value="music">Music / Artist</option>
                      <option value="health">Health & Wellness</option>
                      <option value="podcast">Podcast / Media</option>
                      <option value="sports">Sports / PPV / Events</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget range</label>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                      <option value="" disabled>Select a range</option>
                      <option value="1k">$1,000</option>
                      <option value="2.5k">$2,500</option>
                      <option value="5k">$5,000</option>
                      <option value="5k+">$5,000+</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tell us about your brand</label>
                    <textarea placeholder="What do you sell? Who's your audience? What have you tried before?" rows={4} value={form.details} onChange={e => update('details', e.target.value)} />
                  </div>
                  {error && <div className="form-error">{error}</div>}
                  <button type="submit" className="btn-primary form-submit" disabled={sending}>
                    {sending ? 'Sending…' : 'Send message →'}
                  </button>
                  <p className="form-note">Or <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer">book a call directly →</a></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Prefer to talk first?<br /><em>Book a call.</em></h2>
            <p className="cta-p">30 minutes, no prep needed, no commitment. We'll map out exactly what your budget gets.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">Full refund if we don't hit your guaranteed views</span>
          </div>
        </div>
      </div>
    </>
  )
}
