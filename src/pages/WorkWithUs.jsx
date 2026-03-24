import { useState } from 'react'
import './WorkWithUs.css'

const TIERS = [
  {
    name: 'Starter', price: '$1,000', views: '1M+ views guaranteed',
    features: ['1,000,000 minimum guaranteed views', '$1 RPM — pay per view only', 'Access to full 70K+ creator network', 'Manual clip review included', '48-hour campaign launch', 'Real-time view tracking'],
    ideal: 'First campaigns, new brands, testing the model.',
  },
  {
    name: 'Growth', price: '$2,500', views: '2.5M+ views guaranteed',
    features: ['2,500,000 minimum guaranteed views', '$1 RPM — pay per view only', 'Priority campaign briefing', 'Dedicated account manager', '48-hour campaign launch', 'Campaign performance report'],
    ideal: 'Brands ready to scale. Our most popular tier.',
    featured: true,
  },
  {
    name: 'Scale', price: '$5,000+', views: '5M+ views guaranteed',
    features: ['5,000,000+ minimum guaranteed views', 'Custom RPM negotiation available', 'Multi-platform targeting', 'White-label reporting available', 'Direct campaign manager access', 'Full analytics dashboard'],
    ideal: 'Established brands or recurring campaigns.',
  },
]

const STEPS = [
  { n: '01', t: 'Fill in the form', b: 'Tell us about your brand and goals. Takes 3 minutes.' },
  { n: '02', t: 'We reach out within 24 hours', b: 'We\'ll review your submission and come back with initial thoughts and a time to speak.' },
  { n: '03', t: '30-minute call — no prep needed', b: 'We ask about your brand, your goals, and your current marketing. Just show up.' },
  { n: '04', t: 'Campaign live in 48–72 hours', b: 'Once you\'re in, we brief the creator network and your campaign goes live within 2–3 days.' },
]

export default function WorkWithUs() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', brand: '', campType: '', budget: '', details: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.fname || !form.email || !form.brand) {
      setError('Please fill in your name, email, and brand name.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Work With Us</div>
        <h1>Let's build your<br /><em>campaign.</em></h1>
        <p>Fill in the form below. We'll reach out within 24 hours to book a 30-minute call — no prep needed, no commitment required.</p>
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
              {[['1M+','Views per $1,000'],['$0.09','Effective CPM achieved'],['48hrs','Campaign goes live']].map(([v,l]) => (
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
                <form onSubmit={handleSubmit} className="booking-form">
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
                      <option value="music">Music / Artist</option>
                      <option value="ecomm">E-Commerce / Product</option>
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
                      <option value="1k">$1,000 (Starter)</option>
                      <option value="2.5k">$2,500 (Growth — recommended)</option>
                      <option value="5k">$5,000 (Scale)</option>
                      <option value="5k+">$5,000+ (Custom)</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tell us about your brand</label>
                    <textarea placeholder="What do you sell? Who's your audience? What have you tried before?" rows={4} value={form.details} onChange={e => update('details', e.target.value)} />
                  </div>
                  {error && <div className="form-error">{error}</div>}
                  <button type="submit" className="btn-primary form-submit">Send message →</button>
                  <p className="form-note">Or <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer">book a call directly →</a></p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TIERS */}
      <div className="section">
        <div className="section-eyebrow fade-up">Campaign Tiers</div>
        <h2 className="section-h2 fade-up">Simple, transparent<br /><em>campaign tiers.</em></h2>
        <div className="wwu-tiers-grid">
          {TIERS.map(({ name, price, views, features, ideal, featured }) => (
            <div key={name} className={'wwu-tier' + (featured ? ' featured' : '') + ' fade-up'}>
              {featured && <div className="wwu-tier-badge">Most Popular</div>}
              <div className="wwu-tier-name">{name}</div>
              <div className="wwu-tier-price">{price}</div>
              <div className="wwu-tier-views">{views}</div>
              <div className="wwu-tier-divider" />
              <ul className="wwu-tier-features">
                {features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <p className="wwu-tier-ideal">{ideal}</p>
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className={'btn-primary wwu-tier-btn' + (featured ? '' : ' btn-ghost-alt')}>
                Get started →
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
