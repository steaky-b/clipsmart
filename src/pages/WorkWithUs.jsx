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

const CONTACTS = [
  {
    email: 'contact@clipsmart.co.uk',
    desc: 'General enquiries, business enquiries, partnerships, sales enquiries, media, and anything that isn’t support-related.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="22" height="22">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    email: 'support@clipsmart.co.uk',
    desc: 'Help with campaigns, creator accounts, payments, technical issues, and any existing customer or creator support.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="22" height="22">
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" strokeLinecap="round" />
        <path d="M4 14v2a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zM20 14v2a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" strokeLinejoin="round" />
        <path d="M15 19a3 3 0 0 1-6 0" strokeLinecap="round" />
      </svg>
    ),
  },
]

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function WorkWithUs() {
  const [form, setForm] = useState({
    fullName: '',
    brandName: '',
    platform: 'TikTok',
    budget: '2500',
    primaryGoal: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fullName || !form.brandName || !form.primaryGoal || !form.message) {
      setError('Please fill in all required fields.')
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
          fname: form.fullName,
          lname: '',
          email: 'via-campaign-request',
          brand: form.brandName,
          campType: form.platform,
          budget: form.budget,
          details: `Primary goal: ${form.primaryGoal}\nPlatform: ${form.platform}\n\n${form.message}`,
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
              Get in touch with
            </div>
            <h1>Contact <em>us</em></h1>

            <div className="wwu-contact">
              <div className="wwu-contact-eyebrow">
                <span className="wwu-eyebrow-line" />
                Get in Touch
              </div>
              <p className="wwu-contact-intro">
                We’re here to help with any questions, opportunities, or support you need. Reach out using the details below or send us a message.
              </p>
              <div className="wwu-contact-list">
                {CONTACTS.map(({ email, desc, icon }) => (
                  <a key={email} href={`mailto:${email}`} className="wwu-contact-item">
                    <div className="wwu-contact-icon">{icon}</div>
                    <div className="wwu-contact-text">
                      <div className="wwu-contact-email">{email}</div>
                      <div className="wwu-contact-desc">{desc}</div>
                    </div>
                  </a>
                ))}
              </div>
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
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Jane Smith"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                  />
                </div>

                <div className="wwu-fg">
                  <label>Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Co."
                    value={form.brandName}
                    onChange={(e) => update('brandName', e.target.value)}
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

                <div className="wwu-fg">
                  <label>Monthly Budget</label>
                  <select value={form.budget} onChange={(e) => update('budget', e.target.value)}>
                    <option value="1000">$1,000</option>
                    <option value="2500">$2,500</option>
                    <option value="5000">$5,000</option>
                    <option value="10000">$10,000+</option>
                  </select>
                </div>

                <div className="wwu-fg">
                  <label>Primary Goal</label>
                  <input
                    type="text"
                    placeholder="e.g. Awareness, sales, app installs…"
                    value={form.primaryGoal}
                    onChange={(e) => update('primaryGoal', e.target.value)}
                  />
                </div>

                <div className="wwu-fg">
                  <label>Message</label>
                  <textarea
                    placeholder="Tell us anything else we should know…"
                    rows={3}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                  />
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

    </>
  )
}
