import { Link } from 'react-router-dom'
import './HowItWorks.css'

const STEPS = [
  {
    n: '01', title: 'You fund a campaign budget',
    body: 'Set your budget — that\'s your hard cap. At $1 RPM, every $1,000 guarantees a minimum of 1,000,000 views. You will not spend a cent over your cap without approval.',
    stat: { v: '$1 RPM', l: '$1,000 = 1M+ guaranteed paid views' },
  },
  {
    n: '02', title: 'Creators post content about your brand',
    body: 'Your campaign launches inside our community of 70,000+ creators. They produce original short-form videos on TikTok, Instagram, and YouTube — from their own accounts, organically. No ad accounts. No "Sponsored" labels.',
    stat: { v: '70K+', l: 'Active creators briefed instantly' },
  },
  {
    n: '03', title: 'We manually review every submission',
    body: 'Before any clip counts toward your budget, our team reviews it. Wrong tone, wrong audience, off-brand, low quality — rejected instantly. You never pay for content that doesn\'t meet your standard.',
    stat: { v: '100%', l: 'Manual review on every clip' },
  },
  {
    n: '04', title: 'You pay only for views that happened',
    body: 'At $1 per 1,000 views — deducted from your budget as views roll in. Track every clip, every view, every penny in real time. When the budget is spent, the campaign ends.',
    stat: { v: '$1', l: 'Per 1,000 organic views — nothing more' },
  },
]

const MECHANICS = [
  {
    title: 'Hard budget cap', icon: '🔒',
    body: 'You set a maximum. We cannot, and will not, spend over it. No surprise invoices. No "additional fees". Your cap is your cap.',
  },
  {
    title: 'View threshold approval', icon: '✓',
    body: 'Every clip must hit a minimum view threshold before it counts. Low-performing content never touches your budget.',
  },
  {
    title: 'Manual clip review', icon: '👁',
    body: 'Every submission is reviewed by a human before approval. Off-brand, low quality, or wrong audience = instant rejection.',
  },
]

const COMPARE = [
  { label: 'Pricing model', them: 'Flat fee or retainer', us: '$1 per 1,000 views' },
  { label: 'Guarantees', them: 'Projections only', us: 'Minimum 1M views per $1K' },
  { label: 'Content origin', them: 'Branded / sponsored', us: '100% organic creator posts' },
  { label: 'Risk', them: 'Pay upfront, hope it works', us: 'Pay after views happen' },
  { label: 'Launch time', them: '2–4 weeks', us: '48 hours' },
  { label: 'Budget waste', them: 'Possible — no refund', us: 'Impossible — you only pay per view' },
]

export default function HowItWorks() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>How It Works</div>
        <h1>Simple process.<br /><em>Zero guesswork.</em></h1>
        <p>Set a budget. We brief 70,000+ creators. They post. You only pay when content hits your view threshold.</p>
      </div>

      {/* STEPS */}
      <div className="hiw-steps">
        {STEPS.map(({ n, title, body, stat }, i) => (
          <div key={n} className={'hiw-step fade-up' + (i % 2 === 1 ? ' even' : ' odd')}>
            <div className="hiw-step-content">
              <div className="hiw-step-label">
                <div className="hiw-step-num">{n}</div>
                Step {['One','Two','Three','Four'][i]}
              </div>
              <h2 className="hiw-step-h">{title}</h2>
              <p className="hiw-step-p">{body}</p>
              <div className="hiw-stat">
                <div className="hiw-stat-v">{stat.v}</div>
                <div className="hiw-stat-l">{stat.l}</div>
              </div>
            </div>
            <div className="hiw-step-visual">
              <div className="hiw-visual-placeholder">{n}</div>
            </div>
          </div>
        ))}
      </div>

      {/* MECHANICS */}
      <div className="hiw-mechanics-section">
        <div className="section">
          <div className="section-eyebrow fade-up">Budget Protection</div>
          <h2 className="section-h2 fade-up">Three mechanics that<br /><em>protect your budget.</em></h2>
          <div className="hiw-mechanics-grid">
            {MECHANICS.map(({ title, icon, body }) => (
              <div key={title} className="hiw-mechanic-card fade-up">
                <div className="hiw-mechanic-icon">{icon}</div>
                <h3 className="hiw-mechanic-t">{title}</h3>
                <p className="hiw-mechanic-b">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARE */}
      <div className="section">
        <div className="section-eyebrow fade-up">Comparison</div>
        <h2 className="section-h2 fade-up">ClipSmart vs everything<br /><em>you've tried before.</em></h2>
        <div className="hiw-compare fade-up">
          <div className="hiw-compare-head">
            <div />
            <div className="hiw-compare-col-head">Everyone Else</div>
            <div className="hiw-compare-col-head green">ClipSmart</div>
          </div>
          {COMPARE.map(({ label, them, us }) => (
            <div key={label} className="hiw-compare-row">
              <div className="hiw-compare-label">{label}</div>
              <div className="hiw-compare-them">{them}</div>
              <div className="hiw-compare-us">{us}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Seen enough?<br /><em>Let's build your campaign.</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll map out exactly what your budget gets — before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">No prep needed · No commitment</span>
          </div>
        </div>
      </div>
    </>
  )
}
