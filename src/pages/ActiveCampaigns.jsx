import { Link } from 'react-router-dom'
import './ActiveCampaigns.css'
import {
  ACTIVE_CAMPAIGNS,
  computeSnapshot,
  formatViews,
  formatFull,
  formatMoney,
} from '../data/activeCampaigns'

export default function ActiveCampaigns() {
  const now = Date.now()
  const cards = ACTIVE_CAMPAIGNS.map((c) => ({ campaign: c, snap: computeSnapshot(c, now) }))

  const totalViews = cards.reduce((s, { snap }) => s + snap.views, 0)
  const totalPosts = cards.reduce((s, { snap }) => s + snap.posts, 0)

  const liveStats = [
    { v: String(ACTIVE_CAMPAIGNS.length), l: 'Active campaigns', s: 'Running right now' },
    { v: formatFull(totalPosts) + '+', l: 'Creator posts live', s: 'Across all current campaigns' },
    { v: formatViews(totalViews) + '+', l: 'Views this month', s: 'And climbing' },
    { v: '48hrs', l: 'Avg. time to first clip', s: 'From campaign launch' },
  ]

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
          {liveStats.map(({ v, l, s }) => (
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
          {cards.map(({ campaign, snap }) => {
            const { slug, name, catLabel, subtitle, gradient, img } = campaign
            return (
              <Link key={slug} to={`/active-campaigns/${slug}`} className="ac-card fade-up">
                {/* Full-card 16:9 thumbnail */}
                <div
                  className="ac-card-thumb"
                  style={img
                    ? { backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
                    : { background: gradient }
                  }
                >
                  <div className="ac-card-overlay" />

                  {/* LIVE badge — top right */}
                  <div className="ac-live-badge">
                    <span className="ac-live-dot-sm" />LIVE
                  </div>

                  {/* Bottom content */}
                  <div className="ac-card-content">
                    {/* Avatar + title row */}
                    <div className="ac-card-head">
                      <div className="ac-card-avatar">
                        {img
                          ? <img src={img} alt={name} className="ac-avatar-img" />
                          : <span className="ac-avatar-letter">{name[0]}</span>
                        }
                      </div>
                      <div className="ac-card-title-wrap">
                        <div className="ac-card-name">{name}</div>
                        <div className="ac-card-sub">{catLabel} · {subtitle}</div>
                      </div>
                    </div>

                    {/* Compact metrics + CTA */}
                    <div className="ac-card-metrics-row">
                      <div className="ac-foot-metric">
                        <span className="ac-foot-v">{formatViews(snap.views)}+</span>
                        <span className="ac-foot-l">Views</span>
                      </div>
                      <div className="ac-foot-div" />
                      <div className="ac-foot-metric">
                        <span className="ac-foot-v">{formatFull(snap.posts)}+</span>
                        <span className="ac-foot-l">Posts</span>
                      </div>
                      <div className="ac-foot-div" />
                      <div className="ac-foot-metric">
                        <span className="ac-foot-v">{formatMoney(campaign.budgetTotal)}</span>
                        <span className="ac-foot-l">Budget</span>
                      </div>
                      <span className="ac-card-cta-badge">View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
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
