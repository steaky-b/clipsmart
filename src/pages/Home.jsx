import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ══════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════ */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])
  return count
}

function useCountUpOnView(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const rafRef = useRef(null)
  useEffect(() => {
    if (target === 0) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(eased * target)
        if (progress < 1) rafRef.current = requestAnimationFrame(step)
        else setCount(target)
      }
      rafRef.current = requestAnimationFrame(step)
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [target, duration])
  return [count, ref]
}

function StatBlock({ prefix, target, decimals, suffix, l, s }) {
  const [count, ref] = useCountUpOnView(target)
  let display
  if (target === 0) {
    display = `${prefix}0${suffix}`
  } else if (decimals > 0) {
    display = `${prefix}${parseFloat(count.toFixed(decimals))}${suffix}`
  } else {
    display = `${prefix}${Math.floor(count)}${suffix}`
  }
  return (
    <div ref={ref} className="stat-block">
      <div className="stat-v">{display}</div>
      <div className="stat-l">{l}</div>
      <div className="stat-s">{s}</div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   HERO CAMPAIGN WIDGET (right-side infographic)
══════════════════════════════════════════════ */
const WIDGET_CAMPAIGNS = [
  {
    name: 'NHC Murda',
    category: 'Music',
    startViews: 12847293,
    posts: 1456,
    creators: 318,
    cpm: '$0.81',
    platforms: [{ name: 'TikTok', pct: 72 }, { name: 'Instagram', pct: 20 }, { name: 'YouTube', pct: 8 }],
    tickers: [
      { handle: '@artist.clips', views: '92.1K' },
      { handle: '@musicvault', views: '48.2K' },
      { handle: '@viralbeats', views: '67.4K' },
    ],
    color: '#2ECC71',
  },
  {
    name: 'Based Bodyworks',
    category: 'Health & Wellness',
    startViews: 2100000,
    posts: 203,
    creators: 97,
    cpm: '$0.94',
    platforms: [{ name: 'TikTok', pct: 61 }, { name: 'Instagram', pct: 32 }, { name: 'YouTube', pct: 7 }],
    tickers: [
      { handle: '@liftedwithleo', views: '198K' },
      { handle: '@hypertrophy.hub', views: '142K' },
    ],
    color: '#2ECC71',
  },
]

/* ── sparkline bar heights for the mini chart ── */
const SPARKLINE = [18, 26, 22, 34, 29, 42, 38, 55, 48, 62, 58, 72, 68, 84, 78, 100, 94, 88, 96, 100]

function HeroCampaignWidget() {
  const campaign = WIDGET_CAMPAIGNS[0]
  const [views, setViews] = useState(campaign.startViews)
  const [posts, setPosts] = useState(campaign.posts)
  const [tickerIdx, setTickerIdx] = useState(0)
  const [tickerVisible, setTickerVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => {
      setViews(v => v + Math.floor(Math.random() * 380 + 90))
      if (Math.random() > 0.96) setPosts(p => p + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTickerVisible(false)
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % campaign.tickers.length)
        setTickerVisible(true)
      }, 280)
    }, 3000)
    return () => clearInterval(id)
  }, [campaign.tickers.length])

  const fmt = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(2) + 'M'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
    return n.toLocaleString()
  }

  const ticker = campaign.tickers[tickerIdx]

  return (
    <div className={'hw-widget' + (mounted ? ' hw-widget--in' : '')}>

      {/* ── HEADER ── */}
      <div className="hw-header">
        <div className="hw-header-left">
          <div className="hw-live-pill">
            <span className="hw-live-dot" />
            Live
          </div>
          <div className="hw-campaign-name">{campaign.name}</div>
          <div className="hw-campaign-cat">{campaign.category}</div>
        </div>
        <div className="hw-header-right">
          <div className="hw-cpm-pill">{campaign.cpm} CPM</div>
        </div>
      </div>

      {/* ── VIEW COUNTER + SPARKLINE ── */}
      <div className="hw-counter-row">
        <div className="hw-counter-left">
          <div className="hw-views">{fmt(views)}</div>
          <div className="hw-views-label">Organic views generated</div>
          <div className="hw-views-sub">↑ +{fmt(Math.floor(Math.random() * 1200 + 800))} in the last hour</div>
        </div>
        <div className="hw-sparkline">
          {SPARKLINE.map((h, i) => (
            <div
              key={i}
              className="hw-spark-bar"
              style={{ height: `${h}%`, animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      </div>

      {/* ── PLATFORM BARS ── */}
      <div className="hw-platforms">
        {campaign.platforms.map(({ name, pct }) => (
          <div key={name} className="hw-platform-row">
            <span className="hw-platform-name">{name}</span>
            <div className="hw-bar-track">
              <div className="hw-bar-fill" style={{ width: mounted ? `${pct}%` : '0%' }} />
            </div>
            <span className="hw-platform-pct">{pct}%</span>
          </div>
        ))}
      </div>

      {/* ── STAT PILLS ── */}
      <div className="hw-stat-pills">
        <div className="hw-stat-pill">
          <div className="hw-stat-pill-v">{posts.toLocaleString()}</div>
          <div className="hw-stat-pill-l">Posts</div>
        </div>
        <div className="hw-stat-pill">
          <div className="hw-stat-pill-v">{campaign.creators}</div>
          <div className="hw-stat-pill-l">Creators</div>
        </div>
        <div className="hw-stat-pill hw-stat-pill--green">
          <div className="hw-stat-pill-v">{campaign.cpm}</div>
          <div className="hw-stat-pill-l">eff. CPM</div>
        </div>
      </div>

      {/* ── CREATOR FEED (rotating) ── */}
      <div className="hw-feed-label">Top performing post right now</div>
      <div className={'hw-feed-row' + (tickerVisible ? '' : ' hw-feed-row--out')}>
        <div className="hw-feed-avatar">{ticker.handle[1].toUpperCase()}</div>
        <div className="hw-feed-info">
          <div className="hw-feed-handle">{ticker.handle}</div>
          <div className="hw-feed-bar-wrap">
            <div className="hw-feed-bar" style={{ width: `${(parseFloat(ticker.views) / 100) * 0.7 + 30}%` }} />
          </div>
        </div>
        <div className="hw-feed-views">{ticker.views}</div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   CPM COMPARISON INFOGRAPHIC
══════════════════════════════════════════════ */
function CPMComparisonChart() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect() }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const bars = [
    { label: 'Google Ads', cpm: '$12.40', pct: 100, muted: true },
    { label: 'Meta Ads', cpm: '$9.80', pct: 79, muted: true },
    { label: 'Influencer', cpm: '$8.50', pct: 69, muted: true },
    { label: 'TikTok Ads', cpm: '$7.20', pct: 58, muted: true },
    { label: 'ClipSmart', cpm: 'from $0.81', pct: 7, muted: false, highlight: true },
  ]

  return (
    <div className="cpm-chart" ref={ref}>
      <div className="cpm-chart-eyebrow">Effective CPM Comparison</div>
      <div className="cpm-chart-bars">
        {bars.map(({ label, cpm, pct, muted, highlight }) => (
          <div key={label} className={'cpm-row' + (highlight ? ' cpm-row--highlight' : '')}>
            <div className="cpm-row-label">{label}</div>
            <div className="cpm-row-track">
              <div
                className={'cpm-row-fill' + (highlight ? ' cpm-row-fill--green' : '')}
                style={{ width: animated ? `${pct}%` : '0%' }}
              />
            </div>
            <div className={'cpm-row-val' + (highlight ? ' cpm-row-val--green' : '')}>{cpm}</div>
          </div>
        ))}
      </div>
      <div className="cpm-chart-note">Lower is better · Organic reach, no ad spend</div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   PLATFORM REACH INFOGRAPHIC
══════════════════════════════════════════════ */
function PlatformReachInfographic() {
  const platforms = [
    {
      name: 'TikTok',
      share: '68%',
      reach: '1B+ daily active users',
      color: '#fff',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.82 4.82 0 0 1-1.01-.04z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      share: '23%',
      reach: '500M+ Reels views daily',
      color: '#E1306C',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      share: '9%',
      reach: '70M+ Shorts daily views',
      color: '#FF0000',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="platform-reach">
      <div className="platform-reach-cards">
        {platforms.map(({ name, share, reach, color, icon }) => (
          <div key={name} className="platform-reach-card">
            <div className="platform-reach-icon" style={{ color }}>{icon}</div>
            <div className="platform-reach-share">{share}</div>
            <div className="platform-reach-name">{name}</div>
            <div className="platform-reach-sub">{reach}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const TICKER_ITEMS = [
  { value: '2.3B+', label: 'Total Views Generated' },
  { value: '80K+', label: 'Active Creators' },
  { value: 'from $0.81', label: 'Effective CPM Achieved' },
  { value: '100%', label: 'Organic — Zero Ad Account Risk' },
  { value: '48hrs', label: 'Campaign Goes Live' },
  { label: 'Performance-Based · Pay Only For Results' },
]

const STATS = [
  { prefix: '', target: 2.3, decimals: 1, suffix: 'B+', l: 'Total views generated', s: 'Across all campaigns' },
  { prefix: '', target: 80, decimals: 0, suffix: 'K+', l: 'Active creators', s: 'In our network' },
  { prefix: '', target: 1, decimals: 1, suffix: 'M+', l: 'Guaranteed views', s: 'Per $1,000 — guaranteed' },
  { prefix: '', target: 1024, decimals: 0, suffix: '+', l: 'Campaigns run', s: 'And counting' },
]

const CASES = [
  { id: 'murda', cat: 'Music', name: 'NHC Murda 60x', views: '12M+ views', subs: '1,456 creator posts', img: '/cs-nhc-murda.png', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a1a)' },
  { id: 'cpkshawn', cat: 'Music', name: 'ProdByCPKShawn', views: '11.3M views', subs: '1,062 creator posts', img: '/cs-cpkshawn.png', gradient: 'linear-gradient(135deg,#1a2a1a,#0a1a0a)' },
  { id: 'glady', cat: 'Music', name: 'Loudpac Glady', views: '3.2M views', subs: '198 creator posts', img: '/cs-glady.png', gradient: 'linear-gradient(135deg,#1a0a2a,#0a050f)' },
  { id: 'base', cat: 'Health & Wellness', name: 'Based Bodyworks', views: '2.1M views', subs: '203 creator posts', img: '/cs-base-body-works.png', gradient: 'linear-gradient(135deg,#2a2a1a,#1a1a0a)' },
  { id: 'bussin', cat: 'Podcast', name: 'Growing Up Italian', views: '3.8M views', subs: '312 creator posts', img: '/cs-growing-up-italian.png', gradient: 'linear-gradient(135deg,#2a1a1a,#1a0a0a)' },
  { id: 'qrunitup', cat: 'Music', name: 'QRUNITUP', views: '1.9M views', subs: '178 creator posts', img: '/cs-qrunitup.png', gradient: 'linear-gradient(135deg,#1a1a2a,#0a0a2a)' },
  { id: 'oscen', cat: 'Music', name: 'Oscen', views: '1.2M views', subs: '252 creator posts', img: '/cs-oscen.jpg', gradient: 'linear-gradient(135deg,#0a1a2a,#05090f)' },
  { id: 'brysonlee', cat: 'Health & Wellness', name: 'Bryson Lee', views: '906K views', subs: '116 creator posts', img: '/cs-brysonlee.png', gradient: 'linear-gradient(135deg,#1a1a0a,#0a0a05)' },
  { id: 'cryptorians', cat: 'Crypto & Finance', name: 'Cryptorians', views: '209K views', subs: '209 creator posts', img: '/cs-cryptorians.png', gradient: 'linear-gradient(135deg,#0a1a0a,#051005)' },
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
  { video: '/murda-clip-1.mp4#t=1', username: '@nhcmurda60x', caption: 'bro went from 7 posts to 12 million views 🔥', likes: '92.1K', niche: 'Music' },
  { video: '/cpkshawn-clip-2.mp4#t=1', username: '@musiclovers', caption: 'this beat has been stuck in my head for 3 days straight 🎵', likes: '48.2K', niche: 'Music' },
  { video: '/bussin-clip-1.mp4#t=1', username: '@podcastclips', caption: "They said THIS on the podcast and I can't stop replaying it", likes: '67.4K', niche: 'Podcast' },
  { video: '/base-clip-2.mp4#t=1', username: '@fitnesscreator', caption: 'Not sponsored — just actually obsessed with this brand 💪', likes: '31.7K', niche: 'Health & Fitness' },
]

const FAQS = [
  { q: 'What is performance UGC?', a: 'Performance UGC means creators post about your brand from their own accounts — and you only pay when content hits your view threshold. No flat fees. No "projected" results. Only real views, counted after they happen.' },
  { q: 'How does the pricing work?', a: "You pay per 1,000 organic views. At our standard rate, a $1,000 budget guarantees a minimum of 1,000,000 views. You'll often get more, because creators are incentivised to over-deliver." },
  { q: 'Do I need to ship products to creators?', a: "For most campaigns, no. Our creators are briefed with talking points, angles, and messaging. For product-based brands, we can facilitate seeding — but it's not required to launch." },
  { q: 'What platforms do creators post on?', a: 'Primarily TikTok, Instagram Reels, and YouTube Shorts. All three are tracked. Views from all platforms count toward your campaign total.' },
  { q: 'How quickly does a campaign go live?', a: 'Once onboarded and budget confirmed, your campaign brief goes out to the creator network within 24–48 hours. First clips typically appear within 16 hours.' },
  { q: 'What types of brands work best with ClipSmart?', a: 'E-commerce brands, music artists, podcasters, health & wellness products, sports events, and franchise businesses. If your audience watches short-form video, ClipSmart works.' },
]

/* ══════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════ */
export default function Home() {
  const reviewCount = useCountUp(1074)
  const creatorCount = useCountUp(74648)

  return (
    <>
      {/* ── HERO ── */}
      <div className="hero">
        <div className="hero-inner">
          {/* Left: text + CTAs */}
          <div className="hero-left">
            <div className="hero-proof fade-up">
              <div className="hero-proof-dot" />
              2.3B+ views generated across all campaigns
            </div>
            <h1 className="fade-up">
              Without volume,<br />
              nobody will <em>see you.</em>
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
                <span className="hero-reviews-live-dot" aria-hidden="true" />
                <span className="hero-reviews-live-label">LIVE</span>
                <span className="hero-reviews-meta">{reviewCount.toLocaleString()}+ reviews</span>
              </span>
              <span className="hero-reviews-chip">
                <span className="hero-reviews-live-dot" aria-hidden="true" />
                <span className="hero-reviews-live-label">LIVE</span>
                <span className="hero-reviews-meta">{creatorCount.toLocaleString()}+ creators</span>
              </span>
            </div>

            <div className="hero-actions fade-up">
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a free call <span className="arr">→</span>
              </a>
              <Link to="/case-studies" className="btn-ghost">View past campaigns</Link>
            </div>
            <p className="hero-hint fade-up">30-minute call · No prep needed · Full refund if we don't deliver</p>
          </div>

          {/* Right: live campaign infographic */}
          <div className="hero-right fade-up">
            <HeroCampaignWidget />
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
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

      {/* ── STATS ── */}
      <div className="home-stats stats-section">
        <div className="stats-inner stagger">
          {STATS.map((stat) => (
            <StatBlock key={stat.l} {...stat} />
          ))}
        </div>
      </div>

      {/* ── PLATFORM REACH INFOGRAPHIC ── */}
      <div className="platform-reach-section">
        <div className="platform-reach-inner">
          <div className="platform-reach-copy">
            <div className="section-eyebrow">Where Your Audience Lives</div>
            <h2 className="section-h2">Three platforms.<br /><em>Billions of eyeballs.</em></h2>
            <p className="section-lead">Your creators post natively on every major short-form platform — no reposts, no watermarks, just content that feels native to each feed.</p>
          </div>
          <PlatformReachInfographic />
        </div>
      </div>

      {/* ── CASE STUDIES CAROUSEL ── */}
      <div className="cases-section">
        <div className="cases-header">
          <div className="cases-header-left">
            <div className="section-eyebrow fade-up">Real Results</div>
            <h2 className="section-h2 fade-up">Campaigns that <em>speak<br />for themselves.</em></h2>
          </div>
          <Link to="/case-studies" className="view-all fade-up">View all past campaigns →</Link>
        </div>
        <div className="cases-track-wrap">
          <div className="cases-track">
            {[...CASES, ...CASES].map((c, i) => (
              <Link key={i} to="/case-studies" state={{ modalId: c.id }} className="case-thumb">
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
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── CREATOR CONTENT EXAMPLES ── */}
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

      {/* ── HOW IT WORKS PREVIEW ── */}
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
              <div className="hc-val">from $0.81</div>
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

      {/* ── WHY DIFFERENT ── */}
      <div className="section why-section">
        <div className="why-header fade-up">
          <div>
            <div className="section-eyebrow">Why Different</div>
            <h2 className="section-h2">ClipSmart vs <em>everything<br />you've tried before.</em></h2>
          </div>
          <CPMComparisonChart />
        </div>
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

      {/* ── GUARANTEE STRIP ── */}
      <div className="guarantee-strip fade-up">
        <div className="guarantee-strip-inner">
          <div className="guarantee-icon">🛡</div>
          <div className="guarantee-content">
            <div className="guarantee-h">100% Money-Back Guarantee</div>
            <div className="guarantee-p">If we don't hit your guaranteed view count, you get every cent back. No questions, no conditions, no fine print.</div>
          </div>
        </div>
      </div>

      {/* ── IS THIS RIGHT FOR YOU ── */}
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
                  Let's talk →
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

      {/* ── TESTIMONIALS ── */}
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

      {/* ── FAQ ── */}
      <div className="faq-section">
        <div className="faq-inner">
          <div>
            <div className="section-eyebrow fade-up">FAQ</div>
            <h2 className="section-h2 fade-up">Questions we <em>always get.</em></h2>
            <p className="section-lead fade-up">If yours isn't here, book a call — we answer everything in 30 minutes.</p>
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary fade-up">
              Schedule a call →
            </a>
          </div>
          <div className="faq-list fade-up">
            {FAQS.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
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
