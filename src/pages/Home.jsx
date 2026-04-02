import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ── Platform SVG icons ── */
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.82 4.82 0 0 1-1.01-.04z" />
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Instagram">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

const TICKER_ITEMS = [
  { value: '2.3B+', label: 'Total Views Generated' },
  { value: '80K+', label: 'Active Creators' },
  { value: '$0.09', label: 'Effective CPM Achieved' },
  { value: '100%', label: 'Organic — Zero Ad Account Risk' },
  { value: '48hrs', label: 'Campaign Goes Live' },
  { label: 'Performance-Based · Pay Only For Results' },
]

const STATS = [
  { v: '2.3B+', l: 'Total views generated', s: 'Across all campaigns' },
  { v: '80K+', l: 'Active creators', s: 'In our network' },
  { v: '1M+', l: 'Guaranteed views', s: 'Per $1,000 — guaranteed' },
  { v: '$0', l: 'Upfront creator fees', s: 'Pay only for performance' },
]

const CASES = [
  { cat: 'Music', name: 'NHC Murda 60x', views: '12M+ views', subs: '1,456 creator posts', img: '/cs-nhc-murda.png', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a1a)' },
  { cat: 'Music', name: 'ProdByCPKShawn', views: '11.3M views', subs: '1,062 creator posts', img: '/cs-cpkshawn.png', gradient: 'linear-gradient(135deg,#1a2a1a,#0a1a0a)' },
  { cat: 'Music', name: 'Loudpac Glady', views: '3.2M views', subs: '198 creator posts', img: '/cs-glady.png', gradient: 'linear-gradient(135deg,#1a0a2a,#0a050f)' },
  { cat: 'Health & Wellness', name: 'Based Bodyworks', views: '2.1M views', subs: '203 creator posts', img: '/cs-base-body-works.png', gradient: 'linear-gradient(135deg,#2a2a1a,#1a1a0a)' },
  { cat: 'Podcast', name: 'Growing Up Italian', views: '3.8M views', subs: '312 creator posts', img: '/cs-growing-up-italian.png', gradient: 'linear-gradient(135deg,#2a1a1a,#1a0a0a)' },
  { cat: 'Music', name: 'QRUNITUP', views: '1.9M views', subs: '178 creator posts', img: '/cs-qrunitup.png', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a2a)' },
  { cat: 'Music', name: 'Oscen', views: '1.2M views', subs: '252 creator posts', img: '/cs-oscen.jpg', gradient: 'linear-gradient(135deg,#0a1a2a,#05090f)' },
  { cat: 'Health & Wellness', name: 'Bryson Lee', views: '906K views', subs: '116 creator posts', img: '/cs-brysonlee.png', gradient: 'linear-gradient(135deg,#1a1a0a,#0a0a05)' },
  { cat: 'Crypto & Finance', name: 'Cryptorians', views: '209K views', subs: '209 creator posts', img: null, gradient: 'linear-gradient(135deg,#0a1a0a,#051005)' },
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

const CREATOR_POSTS = [
  {
    video: '/murda-clip-1.mp4#t=1',
    username: '@nhcmurda60x',
    caption: 'bro went from 7 posts to 12 million views 🔥 this is crazy',
    likes: '92.1K',
    niche: 'Music',
  },
  {
    video: '/cpkshawn-clip-2.mp4#t=1',
    username: '@musiclovers',
    caption: 'this beat has been stuck in my head for 3 days straight 🎵',
    likes: '48.2K',
    niche: 'Music',
  },
  {
    video: '/bussin-clip-1.mp4#t=1',
    username: '@podcastclips',
    caption: 'They said THIS on the podcast and I can\'t stop replaying it',
    likes: '67.4K',
    niche: 'Podcast',
  },
  {
    video: '/base-clip-2.mp4#t=1',
    username: '@fitnesscreator',
    caption: 'Not sponsored — just actually obsessed with this brand 💪',
    likes: '31.7K',
    niche: 'Health & Fitness',
  },
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

      {/* HERO */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-proof fade-up">
            <div className="hero-proof-dot" />
            2.3B+ views generated across all campaigns
          </div>
          <h1 className="fade-up">
            Stop funding content<br />
            that <em>doesn't work.</em>
          </h1>
          <p className="hero-sub fade-up">
            Hundreds of creators flood TikTok, Instagram, and YouTube with content about your brand.
            You only pay when it performs.
          </p>
          <div className="hero-platforms fade-up">
            <span className="hero-reviews-chip">
              <img src="/whop-logo.png" alt="Whop" className="hero-whop-icon" />
              <span className="hero-reviews-score">4.8</span>
              <span className="hero-reviews-stars">★★★★★</span>
              <span className="hero-reviews-meta">· 1,074 reviews</span>
            </span>
          </div>
          <div className="hero-actions fade-up">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call <span className="arr">→</span>
            </a>
            <Link to="/case-studies" className="btn-ghost">View case studies</Link>
          </div>
          <p className="hero-hint fade-up">30-minute call · No prep needed · Full refund if we don't deliver</p>

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
                <div
                  className="case-img"
                  style={c.img
                    ? { backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
                    : { background: c.gradient }
                  }
                >
                  <div className="case-img-overlay" />
                </div>
                <div className="case-meta">
                  <div className="case-cat">{c.cat}</div>
                  <div className="case-name">{c.name}</div>
                  <div className="case-views">{c.views}</div>
                  <div className="case-spend">{c.subs}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CREATOR CONTENT EXAMPLES */}
      <div className="creator-section">
        <div className="creator-header">
          <div className="section-eyebrow fade-up">What It Looks Like</div>
          <h2 className="section-h2 fade-up">Real content. <em>Real creators.<br />Real accounts.</em></h2>
          <p className="creator-lead fade-up">Every clip is posted from a creator's own account — no "Sponsored" tag, no ad creative, just organic content that feels native to the platform.</p>
        </div>
        <div className="creator-phones-wrap">
          <div className="creator-phones">
            {CREATOR_POSTS.map((post, i) => (
              <div key={i} className="phone-card fade-up">
                <div className="phone-frame">
                  <div className="phone-screen">
                    {post.video && (
                      <video
                        className="phone-video"
                        src={post.video}
                        muted
                        loop
                        playsInline
                        controls
                        preload="metadata"
                        onPlay={(e) => { e.currentTarget.muted = false }}
                      />
                    )}
                    <div className="phone-username-tag">{post.username}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="creator-note fade-up">Real content. Real creators. Zero "sponsored" energy.</p>
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
        <div className="why-scroll-wrap">
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
      </div>

      {/* GUARANTEE STRIP */}
      <div className="guarantee-strip fade-up">
        <div className="guarantee-strip-inner">
          <div className="guarantee-icon">🛡</div>
          <div className="guarantee-content">
            <div className="guarantee-h">100% Money-Back Guarantee</div>
            <div className="guarantee-p">If we don't hit your guaranteed view count, you get every cent back. No questions, no conditions, no fine print.</div>
          </div>
        </div>
      </div>

      {/* IS THIS RIGHT FOR YOU? */}
      <div className="rfy-section">
        <div className="section" style={{ paddingTop: '88px', paddingBottom: '88px' }}>
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
      </div>

      {/* TESTIMONIALS */}
      <div className="section testimonials-section">
        <div className="section-eyebrow fade-up" style={{ justifyContent: 'center' }}>What Clients Say</div>
        <h2 className="section-h2 fade-up" style={{ textAlign: 'center' }}>Don't take our word <em>for it.</em></h2>
        <div className="testimonials-grid">
          <div className="testimonial-card fade-up">
            <div className="testimonial-quote">"its honestly crazy… we went from like 7 posts to over 1.5k and ended up hitting 12 million views. didn't even use the full budget either which makes it even crazier"</div>
            <div className="testimonial-author">
              <div className="testimonial-name">NHC Murda 60x</div>
              <div className="testimonial-role">Music Artist</div>
            </div>
          </div>
          <div className="testimonial-card fade-up">
            <div className="testimonial-quote">"We heard about clipping and decided to try ClipSmart for our first campaign… honestly the video submissions were great and it really pushed BASED out there on tiktok"</div>
            <div className="testimonial-author">
              <div className="testimonial-name">Max</div>
              <div className="testimonial-role">BASED BodyWorks</div>
            </div>
          </div>
          <div className="testimonial-card fade-up">
            <div className="testimonial-quote">"Didn't expect it to move this fast at all. clips were going live within a day or two and the views just kept going up. we're a small team so this saved us a ton of time we didn't have"</div>
            <div className="testimonial-author">
              <div className="testimonial-name">Joe &amp; Sal</div>
              <div className="testimonial-role">Growing Up Italian Podcast</div>
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
            <h2 className="cta-h">Ready to see what your budget <em>actually buys?</em></h2>
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
