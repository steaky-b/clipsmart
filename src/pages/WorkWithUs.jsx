import { useState } from 'react'
import './WorkWithUs.css'

const STEPS = [
  {
    n: '01',
    t: 'Tell us about your brand',
    b: 'Share your goals, audience, and budget. Takes about 3 minutes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="24" height="24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    n: '02',
    t: 'We brief the creator network',
    b: 'Your campaign goes out to matching creators across TikTok, Instagram, and YouTube.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="24" height="24">
        <path d="M3 11l19-9-9 19-2-8-8-2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '03',
    t: 'Creators post & we review',
    b: 'Every clip is manually approved before it counts toward your campaign.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="24" height="24">
        <polygon points="5 3 19 12 5 21 5 3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '04',
    t: 'You pay for verified views',
    b: 'Track every clip in real time. You only pay when content hits your view threshold.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="24" height="24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const PILLS = [
  { label: 'No monthly contracts', icon: '✓' },
  { label: 'Verified creators only', icon: '✓' },
  { label: 'Performance based pricing', icon: '📊' },
]

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function WorkWithUs() {
  const [form, setForm] = useState({
    campaignName: '',
    platform: 'TikTok',
    budget: '2500',
    cpm: '1.00',
    details: '',
    email: '',
    brand: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const estimatedViews = (() => {
    const b = Number(form.budget) || 0
    const c = Number(form.cpm) || 1
    return Math.round((b / c) * 1000)
  })()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.campaignName || !form.details) {
      setError('Please fill in campaign name and tell us about your brand.')
      return
    }
    setError('')
    setSending(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'work-with-us',
          fname: form.campaignName,
          lname: '',
          email: form.email || 'via-campaign-request',
          brand: form.brand || form.campaignName,
          campType: form.platform,
          budget: form.budget,
          details: `CPM: $${form.cpm}\nPlatform: ${form.platform}\n\n${form.details}`,
        }),
      })
      if (res.ok) setSubmitted(true)
      else setError('Something went wrong. Please try again or book a call directly.')
    } catch {
      setError('Something went wrong. Please try again or book a call directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* HERO — two column */}
      <div className="wwu-hero">
        <div className="wwu-hero-inner">
          <div className="wwu-hero-copy fade-up">
            <div className="wwu-eyebrow">
              <span className="wwu-eyebrow-line" />
              For Brands
            </div>
            <h1>Launch a creator campaign in under <em>48 hours.</em></h1>
            <p>
              Get hundreds of creators posting about your brand across TikTok, Instagram and YouTube.
              Only pay for verified performance.
            </p>
            <div className="wwu-pills">
              {PILLS.map(({ label, icon }) => (
                <div key={label} className="wwu-pill">
                  <span className="wwu-pill-icon">{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="wwu-form-card fade-up">
            <div className="wwu-form-head">
              <h2>Campaign Request</h2>
              <svg className="wwu-form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="20" height="20">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3>Request received!</h3>
                <p>We'll be in touch within 24 hours to confirm your campaign.</p>
              </div>
            ) : (
              <form
                name="work-with-us"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="wwu-form"
              >
                <input type="hidden" name="form-name" value="work-with-us" />

                <div className="wwu-fg">
                  <label>Campaign Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Summer Product Launch"
                    value={form.campaignName}
                    onChange={(e) => update('campaignName', e.target.value)}
                  />
                </div>

                <div className="wwu-fg">
                  <label>Platform</label>
                  <select value={form.platform} onChange={(e) => update('platform', e.target.value)}>
                    <option>TikTok</option>
                    <option>Instagram</option>
                    <option>YouTube</option>
                    <option>All platforms</option>
                  </select>
                </div>

                <div className="wwu-fg-row">
                  <div className="wwu-fg">
                    <label>Budget</label>
                    <select value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                      <option value="1000">$1,000</option>
                      <option value="2500">$2,500</option>
                      <option value="5000">$5,000</option>
                      <option value="10000">$10,000+</option>
                    </select>
                  </div>
                  <div className="wwu-fg">
                    <label>CPM</label>
                    <select value={form.cpm} onChange={(e) => update('cpm', e.target.value)}>
                      <option value="0.75">$0.75</option>
                      <option value="1.00">$1.00</option>
                      <option value="1.50">$1.50</option>
                      <option value="2.00">$2.00</option>
                    </select>
                  </div>
                </div>

                <div className="wwu-fg">
                  <label>Tell us about your brand</label>
                  <textarea
                    placeholder="What do you sell? Who's your audience?"
                    rows={3}
                    value={form.details}
                    onChange={(e) => update('details', e.target.value)}
                  />
                </div>

                <div className="wwu-estimate">
                  <div className="wwu-estimate-label">Estimated Views</div>
                  <div className="wwu-estimate-val">{estimatedViews.toLocaleString()}</div>
                </div>

                {error && <div className="form-error">{error}</div>}

                <button type="submit" className="btn-primary wwu-submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Launch Campaign →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS — dark section */}
      <div className="wwu-how">
        <div className="wwu-how-inner">
          <div className="wwu-how-eyebrow fade-up">
            <span className="wwu-eyebrow-line" />
            How It Works
          </div>
          <h2 className="wwu-how-h fade-up">A simple process. <em>Real results.</em></h2>
          <div className="wwu-how-grid">
            {STEPS.map(({ n, t, b, icon }) => (
              <div key={n} className="wwu-how-card fade-up">
                <div className="wwu-how-n">{n}</div>
                <div className="wwu-how-icon">{icon}</div>
                <div className="wwu-how-t">{t}</div>
                <div className="wwu-how-b">{b}</div>
              </div>
            ))}
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
