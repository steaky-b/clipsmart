import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const TICKER_ITEMS = [
  { value: '2B+', label: 'Total Views Generated' },
  { value: '80K+', label: 'Active Creators' },
  { value: '$0.09', label: 'Effective CPM Achieved' },
  { value: '100%', label: 'Organic — Zero Ad Account Risk' },
  { value: '48hrs', label: 'Campaign Goes Live' },
  { label: 'Performance-Based · Pay Only For Results' },
]

const STATS = [
  { v: '2B+', l: 'Total views generated', s: 'Across all campaigns' },
  { v: '80K+', l: 'Active creators', s: 'In our network' },
  { v: '1M+', l: 'Guaranteed views', s: 'Per $1,000 — guaranteed' },
  { v: '$0', l: 'Upfront creator fees', s: 'Pay only for performance' },
]

const CASES = [
  { cat: 'E-Commerce', name: 'Gains Nutrition', views: '4.2M views', spend: '$1,500 spend', gradient: 'linear-gradient(135deg,#1a2a2a,#0a1a1a)' },
  { cat: 'Music', name: 'ProdByCPKShawn', views: '11.3M views', spend: '$1,000 spend · $0.09 CPM', gradient: 'linear-gradient(135deg,#1a2a1a,#0a1a0a)' },
  { cat: 'Music', name: 'NHC Murda 60x', views: '12M+ views', spend: '$2,500 spend · 1,456 clips', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a1a)' },
  { cat: 'Podcast', name: 'Bussin With The Boys', views: '3.8M views', spend: '$500 spend · viral clip', gradient: 'linear-gradient(135deg,#2a1a1a,#1a0a0a)' },
  { cat: 'Sports', name: 'Base Body Works', views: '2.1M views', spend: '$750 spend', gradient: 'linear-gradient(135deg,#2a2a1a,#1a1a0a)' },
  { cat: 'Music', name: 'Artist Campaign', views: '1.9M views', spend: '$500 spend', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a2a)' },
]

const HOW_STEPS = [
  { n: '01', t: 'You fund a campaign budget', b: 'Set your budget — every $1,000 guarantees 1M+ views. Hard cap. No surprises.' },
  { n: '02', t: 'Creators flood your brand with content', b: '80,000+ creators post original short-form videos on TikTok, Instagram, and YouTube.' },
  { n: '03', t: 'We review every clip before it counts', b: 'Our team manually approves every submission. Off-brand or low quality? Rejected. You never pay for bad content.' },
  { n: '04', t: 'You pay only for views that happened', b: 'Deducted from your budget as views roll in. Track every clip in real time.' },
]

const WHY_ROWS = [
  { them: 'Flat fees or retainers up front', us: 'Zero upfront fees — pay per view' },
  { them: 'Results are projections, not guarantees', us: '1M views per $1,000 — guaranteed' },
  { them: 'Sponsored labels kill organic trust', us: '100% organic — no "Sponsored" tags' },
  { them: 'Requires ad account + creatives', us: 'Zero ad account risk or creative cost' },
  { them: 'Weeks of briefing and production', us: 'Campaign live in 48 hours' },
  { them: 'You can burn budget with nothing to show', us: 'Every dollar spent = views already received' },
]

const RFY_ITEMS = [
  { icon: '🛍', label: 'E-commerce & DTC products' },
  { icon: '🎵', label: 'Music artists & producers' },
  { icon: '🎙', label: 'Podcasters & media brands' },
  { icon: '💪', label: 'Health, fitness & wellness brands' },
  { icon: '🏆', label: 'Sports events & PPV promotions' },
  { icon: '📱', label: 'Apps & digital products' },
]

const FAQS = [
  { q: 'What is performance UGC?', a: 'Performance UGC means creators post about your brand from their own accounts — and you only pay when content hits your view threshold. No flat fees. No "projected" results. Only real views, counted after they happen.' },
  { q: 'How does the pricing work?', a: 'You pay per 1,000 organic views. At our standard rate, a $1,000 budget guarantees a minimum of 1,000,000 views. You\'ll often get more, because creators are incentivised to over-deliver.' },
  { q: 'Do I need to ship products to creators?', a: 'For most campaigns, no. Our creators are briefed with talking points, angles, and messaging. For product-based brands, we can facilitate seeding — but it\'s not required to launch.' },
  { q: 'What platforms do creators post on?', a: 'Primarily TikTok, Instagram Reels, and YouTube Shorts. All three are tracked. Views from all platforms count toward your campaign total.' },
  { q: 'How quickly does a campaign go live?', a: 'Once onboarded and budget confirmed, your campaign brief goes out to the creator network within 24–48 hours. First clips typically appear within 16 hours.' },
  { q: 'What types of brands work best with ClipSmart?', a: 'E-commerce brands, music artists, podcasters, health & wellness products, sports events, and franchise businesses. If your audience watches short-form video, ClipSmart works.' },
]

export default function Home() {
  return (
    <>
      <div className="home-glow-tl" />
      <div className="home-glow-br" />

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-proof fade-up">
              <div className="hero-proof-dot" />
              2B+ views generated across all campaigns
            </div>
            <h1 className="fade-up">
              1 million views.<br />
              $1,000.<br />
              <em>Guaranteed.</em>
            </h1>
            <p className="hero-sub fade-up">
              Hundreds of creators flood TikTok, Instagram, and YouTube with content about your brand.
              You only pay when it performs — at $1 per 1,000 views.
            </p>
            <div className="hero-actions fade-up">
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a free call <span className="arr">→</span>
              </a>
              <Link to="/case-studies" className="btn-ghost">View case studies</Link>
            </div>
            <p className="hero-hint fade-up">30-minute call · No prep needed · Full refund if we don't deliver</p>
          </div>

          <div className="hero-video fade-up">
            <div className="video-frame">
              <video controls autoPlay muted loop playsInline>
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="video-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* LOGO BAR */}
      <div className="logo-bar">
        <div className="logo-bar-inner">
          <span className="logo-bar-label">Brands we've worked with</span>
          <div className="logo-bar-sep" />
          <div className="logo-items">
            {['Gains Nutrition', 'Base Body Works', 'NHC Murda 60x', 'ProdByCPKShawn', 'Bussin With The Boys'].map((name) => (
              <div key={name} className="logo-item">
                <span className="logo-item-text">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="ticker-item">
              {item.value && <span>{item.value}</span>}
              {item.label}
              <div className="ticker-dot" />
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-inner stagger">
          {STATS.map(({ v, l, s }) => (
            <div key={l} className="stat-block">
              <div className="stat-v">{v}</div>
              <div className="stat-l">{l}</div>
              <div className="stat-s">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CASE STUDIES CAROUSEL */}
      <div className="cases-section">
        <div className="cases-header">
          <div className="cases-header-left">
            <div className="section-eyebrow fade-up">Real Results</div>
            <h2 className="section-h2 fade-up">Campaigns that <em>speak<br />for themselves.</em></h2>
          </div>
          <Link to="/case-studies" className="view-all fade-up">View all case studies →</Link>
        </div>
        <div className="cases-track-wrap">
          <div className="cases-track">
            {[...CASES, ...CASES].map((c, i) => (
              <div key={i} className="case-thumb">
                <div className="case-img" style={{ background: c.gradient }}>
                  <div className="case-img-overlay" />
                </div>
                <div className="case-meta">
                  <div className="case-cat">{c.cat}</div>
                  <div className="case-name">{c.name}</div>
                  <div className="case-views">{c.views}</div>
                  <div className="case-spend">{c.spend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS PREVIEW */}
      <div className="how-section">
        <div className="how-inner">
          <div className="how-steps-col">
            <div className="section-eyebrow fade-up">How It Works</div>
            <h2 className="section-h2 fade-up">Simple process.<br /><em>Zero guesswork.</em></h2>
            <p className="section-lead fade-up">Set a budget. We brief 80,000+ creators. They post. You only pay when content hits your view threshold.</p>
            <div className="how-steps">
              {HOW_STEPS.map(({ n, t, b }) => (
                <div key={n} className="how-step fade-up">
                  <div className="step-num">{n}</div>
                  <div>
                    <div className="step-t">{t}</div>
                    <div className="step-b">{b}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/how-it-works" className="btn-primary" style={{ marginTop: '32px', alignSelf: 'flex-start' }}>
              Full breakdown →
            </Link>
          </div>
          <div className="how-right">
            <div className="how-callout fade-up">
              <div className="hc-label">Guaranteed Minimum</div>
              <div className="hc-val">1M+</div>
              <div className="hc-desc">Views per $1,000 budget — before you spend a single cent over your cap</div>
            </div>
            <div className="how-callout fade-up">
              <div className="hc-label">Effective CPM Achieved</div>
              <div className="hc-val">$0.09</div>
              <div className="hc-desc">vs. $8–$15 on paid ads — same audience, fraction of the cost</div>
            </div>
            <div className="how-callout fade-up">
              <div className="hc-label">Campaign Live In</div>
              <div className="hc-val">48hrs</div>
              <div className="hc-desc">From sign-off to first creator posts — no lengthy onboarding</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY DIFFERENT */}
      <div className="section why-section">
        <div className="section-eyebrow fade-up">Why Different</div>
        <h2 className="section-h2 fade-up">ClipSmart vs <em>everything<br />you've tried before.</em></h2>
        <div className="why-strip fade-up">
          <div className="why-header-row">
            <div className="why-header-cell" />
            <div className="why-header-cell">Everyone Else</div>
            <div className="why-header-cell hl">ClipSmart</div>
          </div>
          {WHY_ROWS.map(({ them, us }, i) => (
            <div key={i} className="why-row">
              <div className="why-row-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="why-row-them">
                <span className="why-badge-bad">✕</span>
                <span className="why-row-them-t">{them}</span>
              </div>
              <div className="why-row-us">
                <span className="why-badge-good">✓</span>
                <span className="why-row-us-t">{us}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IS THIS RIGHT FOR YOU? */}
      <div className="section rfy-section">
        <div className="rfy-inner">
          <div className="rfy-left fade-up">
            <div className="section-eyebrow">Is This Right For You?</div>
            <h2 className="section-h2">Built for brands that <em>need results,<br />not promises.</em></h2>
            <p className="rfy-lead">ClipSmart works best when your audience watches short-form video. If that's your customer, this is the most efficient reach you'll ever buy.</p>
            <div className="rfy-grid">
              {RFY_ITEMS.map(({ icon, label }) => (
                <div key={label} className="rfy-item">
                  <span className="rfy-icon">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rfy-right fade-up">
            <div className="rfy-card">
              <div className="rfy-card-eyebrow">Not sure if it's a fit?</div>
              <h3 className="rfy-card-h">Let's talk.</h3>
              <p className="rfy-card-p">Book a 30-minute call. We'll tell you honestly whether ClipSmart is right for your brand — before you spend anything.</p>
              <a
                href="https://calendly.com/esaanwar/partner-with-clipsmart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary rfy-btn"
              >
                Book a free call →
              </a>
              <div className="rfy-guarantee">
                <span className="rfy-guarantee-icon">✓</span>
                Full refund if we don't hit your guaranteed views
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="faq-inner">
          <div>
            <div className="section-eyebrow fade-up">FAQ</div>
            <h2 className="section-h2 fade-up">Questions we <em>always get.</em></h2>
            <p className="section-lead fade-up">If yours isn't here, book a call — we answer everything in 30 minutes.</p>
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary fade-up">
              Book a free call →
            </a>
          </div>
          <div className="faq-list fade-up">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to see what <em>$1,000</em> actually buys?</h2>
            <p className="cta-p">Book a 30-minute call. We'll show you exactly what your budget gets — before you commit a penny.</p>
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

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button className="faq-q" onClick={() => setOpen(!open)}>
        {q}
        <div className="faq-icon">{open ? '×' : '+'}</div>
      </button>
      <div className="faq-a">{a}</div>
    </div>
  )
}
