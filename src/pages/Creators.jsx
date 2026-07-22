import { useState } from 'react'
import './Creators.css'

const STATS = [
  {
    v: '80K+',
    l: 'Active Creators',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    v: '2.3B+',
    l: 'Total Views Generated',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polygon points="5 3 19 12 5 21 5 3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    v: '93%',
    l: 'Average Approval Rate',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    v: '4.8 / 5',
    l: 'Creator Rating',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

const PLATFORMS = [
  { name: 'TikTok Clips', pct: 52, gradient: 'linear-gradient(90deg, #25F4EE, #FE2C55)' },
  { name: 'Instagram Reels', pct: 38, gradient: 'linear-gradient(90deg, #833AB4, #FD1D1D, #F77737)' },
  { name: 'YouTube Shorts', pct: 10, gradient: 'linear-gradient(90deg, #FF0000, #CC0000)' },
]

const LOVES = [
  {
    title: 'PayPal Payouts',
    desc: 'Get paid directly to PayPal once your clips are approved. Fast, transparent, no waiting.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#003087">
        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 0 1-.794.68H7.72a.483.483 0 0 1-.477-.558L9.4 8.9a.804.804 0 0 1 .793-.68h3.204c2.6 0 4.63.54 5.78 2.258h.89zm-2.98-5.9C15.8 1.2 13.7.8 10.9.8H5.2a.8.8 0 0 0-.79.68L2.04 15.9a.48.48 0 0 0 .477.56h3.48l.88-5.55.027-.15a.805.805 0 0 1 .794-.68h1.66c3.78 0 6.73-1.53 7.6-5.96.03-.16.06-.31.08-.46.37-2.36-.07-3.97-1.96-5.14z"/>
      </svg>
    ),
  },
  {
    title: 'Performance-Based Earnings',
    desc: 'You earn based on real views — the better your content performs, the more you make.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <rect x="3" y="12" width="4" height="8" rx="1" />
        <rect x="10" y="8" width="4" height="12" rx="1" />
        <rect x="17" y="4" width="4" height="16" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Clear Campaign Guidelines',
    desc: 'Every brief is clear and specific so you know exactly what to create before you start.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" />
      </svg>
    ),
  },
]

const STEPS = [
  { n: '01', t: 'Browse open campaigns', b: 'Find briefs that match your niche and audience on the ClipSmart dashboard.' },
  { n: '02', t: 'Create & submit your clip', b: 'Follow the brief, post on your account, and submit the link for review.' },
  { n: '03', t: 'Get approved', b: 'Our team reviews every submission for quality and brand fit before it counts.' },
  { n: '04', t: 'Get paid via PayPal', b: 'Earn per verified view. Withdraw to PayPal once your balance hits the threshold.' },
]

const FAQ_CREATORS = [
  {
    q: 'How do creators get paid — and why does that benefit my brand?',
    a: 'Creators earn per view, not per post. That means every creator in your campaign is financially motivated to make content that actually performs. There are no flat rates, no guaranteed payouts for low-effort clips — if it doesn\'t get views, they don\'t get paid. Your budget only goes towards content that works.',
  },
  {
    q: 'With 80,000+ creators, how do you make sure the right ones post for my brand?',
    a: 'When your campaign brief goes live, only creators whose niche, platform, and audience demographics match your target are eligible to apply. Every submission is then manually reviewed before going live — we check content quality, brand alignment, and engagement authenticity.',
  },
  {
    q: 'How quickly will content start going live after I launch a campaign?',
    a: 'Typically within 16 hours of your campaign brief going live, you\'ll have your first clip posted and tracked. Most campaigns have multiple clips live within the first 24–48 hours.',
  },
  {
    q: 'What platforms do the creators post on?',
    a: 'The majority of our network posts across TikTok, Instagram Reels, and YouTube Shorts. When setting up your campaign you can specify which platforms to focus on, or run across all three simultaneously.',
  },
]

export default function Creators() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      {/* HERO — centered */}
      <div className="cr-hero">
        <div className="cr-hero-inner fade-up">
          <div className="cr-badge">
            <span className="cr-badge-dot" />
            Creator network built for performance
          </div>
          <h1>Join <em>80,000+</em> creators</h1>
          <p>
            Post authentic short-form content for real brands. Get paid for views —
            not flat fees. Clear briefs, fast reviews, PayPal payouts.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="cr-stats-wrap">
        <div className="cr-stats stagger">
          {STATS.map(({ v, l, icon }) => (
            <div key={l} className="cr-stat-card">
              <div className="cr-stat-icon">{icon}</div>
              <div className="cr-stat-v">{v}</div>
              <div className="cr-stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TWO-COL: create + love */}
      <div className="cr-split-wrap">
        <div className="cr-split">
          <div className="cr-panel fade-up">
            <h2>What our creators create</h2>
            <p className="cr-panel-sub">Platform split across the network — real distribution, not projections.</p>
            <div className="cr-platform-bars">
              {PLATFORMS.map(({ name, pct, gradient }) => (
                <div key={name} className="cr-pbar-row">
                  <div className="cr-pbar-label">{name}</div>
                  <div className="cr-pbar-track">
                    <div className="cr-pbar-fill" style={{ width: pct + '%', background: gradient }} />
                  </div>
                  <div className="cr-pbar-pct">{pct}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cr-panel fade-up">
            <h2>What creators love</h2>
            <p className="cr-panel-sub">Built for creators who want to earn from content that actually performs.</p>
            <div className="cr-loves">
              {LOVES.map(({ title, desc, icon }) => (
                <div key={title} className="cr-love-item">
                  <div className="cr-love-icon">{icon}</div>
                  <div>
                    <div className="cr-love-t">{title}</div>
                    <div className="cr-love-b">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="cr-how">
        <div className="cr-how-inner">
          <div className="section-eyebrow fade-up" style={{ justifyContent: 'center' }}>How It Works</div>
          <h2 className="section-h2 fade-up" style={{ textAlign: 'center' }}>
            From campaign to <em>PayPal payout.</em>
          </h2>
          <p className="section-lead fade-up" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            Four steps. No flat fees. You earn when your content gets real views.
          </p>
          <div className="cr-steps">
            {STEPS.map(({ n, t, b }) => (
              <div key={n} className="cr-step-card fade-up">
                <div className="cr-step-n">{n}</div>
                <div className="cr-step-t">{t}</div>
                <div className="cr-step-b">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section creators-faq-section">
        <div className="creators-faq-layout">
          <div className="creators-faq-left">
            <div className="section-eyebrow fade-up">FAQ</div>
            <h2 className="creators-faq-heading fade-up">Everything brands ask <em>before they start.</em></h2>
            <p className="creators-faq-sub fade-up">Common questions about how our creator network works and what to expect.</p>
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary creators-faq-cta fade-up">
              Book a free call →
            </a>
          </div>
          <div className="creators-faq-list">
            {FAQ_CREATORS.map(({ q, a }, i) => (
              <div key={i} className={`creators-faq-item${openFaq === i ? ' open' : ''}`}>
                <button
                  className="creators-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="creators-faq-num">0{i + 1}</span>
                  <span className="creators-faq-qtext">{q}</span>
                  <span className="creators-faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="creators-faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">A network of 80,000+<br /><em>ready to post for your brand.</em></h2>
            <p className="cta-p">Book a call and we'll show you the creators in your niche before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">30-min call · Full refund if we don't deliver</span>
          </div>
        </div>
      </div>
    </>
  )
}
