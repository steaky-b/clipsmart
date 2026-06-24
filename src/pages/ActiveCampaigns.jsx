import { Link } from 'react-router-dom'
import './ActiveCampaigns.css'

/*
  Add your current active clients here.
  Each entry will appear as a card on the page.
  Leave `results` empty or partial — the "LIVE" badge shows instead of final numbers.
*/
const ACTIVE = [
  {
    id: 'client1',
    name: 'Client Name',
    cat: 'Music',
    subtitle: 'Campaign running',
    gradient: 'linear-gradient(135deg,#0d1a0d,#050a05)',
    img: null,
    budget: '$1,000',
    status: 'Live now',
    posts: '340+',
    views: '2.1M+',
  },
  {
    id: 'client2',
    name: 'Client Name',
    cat: 'Health & Wellness',
    subtitle: 'Campaign running',
    gradient: 'linear-gradient(135deg,#1a1a0d,#0a0a05)',
    img: null,
    budget: '$2,000',
    status: 'Live now',
    posts: '610+',
    views: '4.8M+',
  },
  {
    id: 'client3',
    name: 'Client Name',
    cat: 'E-commerce',
    subtitle: 'Campaign running',
    gradient: 'linear-gradient(135deg,#0d0d1a,#05050a)',
    img: null,
    budget: '$500',
    status: 'Live now',
    posts: '180+',
    views: '900K+',
  },
]

const LIVE_STATS = [
  { v: '3', l: 'Active campaigns', s: 'Running right now' },
  { v: '1,130+', l: 'Creator posts live', s: 'Across all current campaigns' },
  { v: '7.8M+', l: 'Views this month', s: 'And climbing' },
  { v: '48hrs', l: 'Avg. time to first clip', s: 'From campaign launch' },
]

export default function ActiveCampaigns() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <span className="ac-live-dot" aria-hidden="true" />
          Active Campaigns
        </div>
        <h1>Campaigns running<br /><em>right now.</em></h1>
        <p>These are live. Creators are posting. Views are rolling in. This is what performance UGC looks like in real time.</p>
      </div>

      {/* LIVE STATS */}
      <div className="ac-stats stats-section">
        <div className="stats-inner stagger">
          {LIVE_STATS.map(({ v, l, s }) => (
            <div key={l} className="stat-block">
              <div className="stat-v">{v}</div>
              <div className="stat-l">{l}</div>
              <div className="stat-s">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CAMPAIGN GRID */}
      <div className="section" style={{ paddingTop: '52px' }}>
        <div className="section-eyebrow fade-up">
          <span className="ac-live-dot" aria-hidden="true" />
          Live Now
        </div>
        <h2 className="section-h2 fade-up">Every active campaign.<br /><em>All in real time.</em></h2>

        <div className="ac-grid">
          {ACTIVE.map(({ id, name, cat, subtitle, gradient, img, budget, status, posts, views }) => (
            <div key={id} className="ac-card fade-up">
              <div
                className="ac-card-visual"
                style={img
                  ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: gradient }
                }
              >
                {img && <div className="ac-card-visual-overlay" />}
                <div className="ac-live-badge">
                  <span className="ac-live-dot-sm" />
                  LIVE
                </div>
                <div className="ac-card-cat">{cat}</div>
                <div className="ac-card-name">{name}</div>
              </div>
              <div className="ac-card-body">
                <div className="ac-card-sub">{subtitle}</div>
                <div className="ac-card-metrics">
                  <div className="ac-metric">
                    <div className="ac-metric-v">{views}</div>
                    <div className="ac-metric-l">Views so far</div>
                  </div>
                  <div className="ac-metric">
                    <div className="ac-metric-v">{posts}</div>
                    <div className="ac-metric-l">Creator posts</div>
                  </div>
                  <div className="ac-metric">
                    <div className="ac-metric-v">{budget}</div>
                    <div className="ac-metric-l">Budget</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PAST CAMPAIGNS LINK */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="ac-past-link fade-up">
          <div className="ac-past-left">
            <div className="section-eyebrow">Archive</div>
            <h2 className="section-h2">Want to see what we've<br /><em>already delivered?</em></h2>
            <p style={{ fontSize: '15px', color: 'var(--t1)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '480px' }}>
              Every number on the Past Campaigns page is verified — real budgets, real creators, real views.
            </p>
            <Link to="/case-studies" className="btn-primary">View past campaigns →</Link>
          </div>
          <div className="ac-past-stats">
            <div className="ac-past-stat">
              <div className="ac-past-stat-v">2.3B+</div>
              <div className="ac-past-stat-l">Total views delivered across all past campaigns</div>
            </div>
            <div className="ac-past-stat">
              <div className="ac-past-stat-v">9</div>
              <div className="ac-past-stat-l">Completed campaigns across music, health, and more</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to be on this<br /><em>page next?</em></h2>
            <p className="cta-p">Book a call and your campaign could be live within 48 hours.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start a campaign →
            </a>
            <span className="cta-note">Live in 48 hours · Pay only for views</span>
          </div>
        </div>
      </div>
    </>
  )
}
