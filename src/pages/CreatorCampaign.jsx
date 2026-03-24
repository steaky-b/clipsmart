import { Link } from 'react-router-dom'
import './CreatorCampaign.css'

const STEPS = [
  {
    n: '01', title: 'You fund a campaign budget',
    body: 'Set your budget — that\'s your hard cap. Every $1,000 guarantees a minimum of 1,000,000 views. You will not spend a cent over your cap without approval.',
    stat: { v: '1M+', l: '$1,000 = 1M+ guaranteed views' },
    img: '/how-it-works-step-1.png',
  },
  {
    n: '02', title: 'Creators post content about your brand',
    body: 'Your campaign launches inside our community of 80,000+ creators. They produce original short-form videos on TikTok, Instagram, and YouTube — from their own accounts, organically. No ad accounts. No "Sponsored" labels.',
    stat: { v: '80K+', l: 'Active creators briefed instantly' },
    img: '/how-it-works-step-2.png',
  },
  {
    n: '03', title: 'We manually review every submission',
    body: 'Before any clip counts toward your budget, our team reviews it. Wrong tone, wrong audience, off-brand, low quality — rejected instantly. You never pay for content that doesn\'t meet your standard.',
    stat: { v: '100%', l: 'Manual review on every clip' },
    img: '/how-it-works-step-3.png',
  },
  {
    n: '04', title: 'You pay only for views that happened',
    body: 'Deducted from your budget as views roll in. Track every clip, every view, every penny in real time. When the budget is spent, the campaign ends.',
    stat: { v: '$1', l: 'Per 1,000 organic views — nothing more' },
    img: '/how-it-works-step-4.png',
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
  { label: 'Pricing model', them: 'Flat fee or retainer', us: 'Pay per 1,000 views' },
  { label: 'Guarantees', them: 'Projections only', us: 'Minimum 1M views per $1K' },
  { label: 'Content origin', them: 'Branded / sponsored', us: '100% organic creator posts' },
  { label: 'Risk', them: 'Pay upfront, hope it works', us: 'Pay after views happen' },
  { label: 'Launch time', them: '2–4 weeks', us: '48 hours' },
  { label: 'Budget waste', them: 'Possible — no refund', us: 'Full refund if we don\'t deliver' },
]

export default function CreatorCampaign() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <Link to="/how-it-works" style={{ color: 'var(--g)', opacity: .7 }}>How It Works</Link>
          &nbsp;/&nbsp;Creator Campaign Growth
        </div>
        <h1>Creator Campaign<br /><em>Growth.</em></h1>
        <p>Set a budget. We brief 80,000+ creators. They post. You only pay when content hits your view threshold.</p>
      </div>

      {/* STEPS */}
      <div className="cc-steps">
        {STEPS.map(({ n, title, body, stat, img }, i) => (
          <div key={n} className={'cc-step fade-up' + (i % 2 === 1 ? ' even' : ' odd')}>
            <div className="cc-step-content">
              <div className="cc-step-label">
                <div className="cc-step-num">{n}</div>
                Step {['One', 'Two', 'Three', 'Four'][i]}
              </div>
              <h2 className="cc-step-h">{title}</h2>
              <p className="cc-step-p">{body}</p>
              <div className="cc-stat">
                <div className="cc-stat-v">{stat.v}</div>
                <div className="cc-stat-l">{stat.l}</div>
              </div>
            </div>
            <div className="cc-step-visual">
              <img
                src={img}
                alt={title}
                className="cc-step-img"
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
              />
              <div className="cc-visual-placeholder" style={{ display: 'none' }}>{n}</div>
            </div>
          </div>
        ))}
      </div>

      {/* MECHANICS */}
      <div className="cc-mechanics-section">
        <div className="section">
          <div className="section-eyebrow fade-up">Budget Protection</div>
          <h2 className="section-h2 fade-up">Three mechanics that<br /><em>protect your budget.</em></h2>
          <div className="cc-mechanics-grid">
            {MECHANICS.map(({ title, icon, body }) => (
              <div key={title} className="cc-mechanic-card fade-up">
                <div className="cc-mechanic-icon">{icon}</div>
                <h3 className="cc-mechanic-t">{title}</h3>
                <p className="cc-mechanic-b">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARE */}
      <div className="section">
        <div className="section-eyebrow fade-up">Comparison</div>
        <h2 className="section-h2 fade-up">ClipSmart vs everything<br /><em>you've tried before.</em></h2>
        <div className="cc-compare fade-up">
          <div className="cc-compare-head">
            <div />
            <div className="cc-compare-col-head">Everyone Else</div>
            <div className="cc-compare-col-head green">ClipSmart</div>
          </div>
          {COMPARE.map(({ label, them, us }) => (
            <div key={label} className="cc-compare-row">
              <div className="cc-compare-label">{label}</div>
              <div className="cc-compare-them">{them}</div>
              <div className="cc-compare-us">{us}</div>
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
            <span className="cta-note">Full refund if we don't hit your guaranteed views</span>
          </div>
        </div>
      </div>
    </>
  )
}
