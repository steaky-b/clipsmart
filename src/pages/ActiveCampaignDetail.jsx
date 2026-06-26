import { Link, useParams, Navigate } from 'react-router-dom'
import './ActiveCampaignDetail.css'
import {
  getActiveCampaign,
  daysSince,
  formatViews,
  formatFull,
  formatMoney,
} from '../data/activeCampaigns'
import { useLiveCampaign } from '../hooks/useLiveCampaign'

function platformLabel(p) {
  return p
}

export default function ActiveCampaignDetail() {
  const { id } = useParams()
  const campaign = getActiveCampaign(id)
  const live = useLiveCampaign(campaign)

  if (!campaign) {
    return <Navigate to="/active-campaigns" replace />
  }

  const dayN = daysSince(campaign.onboardedDate)

  const budgetPct = Math.min(100, (live.budgetSpent / campaign.budgetTotal) * 100)
  const guaranteePct = Math.min(100, (live.views / campaign.viewsGuaranteed) * 100)
  const projectedViews = Math.round((campaign.budgetTotal / campaign.clientRpm) * 1000)
  const avgViewsPerPost = live.posts > 0 ? Math.round(live.views / live.posts) : 0
  const platformEntries = Object.entries(campaign.platformSplit)

  return (
    <>
      {/* HERO */}
      <div
        className={'acd-hero' + (campaign.img ? ' has-img' : '')}
        style={campaign.img
          ? { backgroundImage: `url(${campaign.img})` }
          : { background: campaign.gradient }
        }
      >
        <div className="acd-hero-overlay" />
        <div className="acd-hero-inner">
          <Link to="/active-campaigns" className="acd-back">← All active campaigns</Link>
          <div className="acd-live-badge">
            <span className="acd-live-dot" />
            LIVE NOW
          </div>
          <div className="acd-hero-cat">{campaign.catLabel}</div>
          <h1 className="acd-hero-name">{campaign.name}</h1>
          <div className="acd-hero-sub">{campaign.subtitle}</div>
          <div className="acd-hero-meta">
            <span><strong>Day {dayN}</strong> of campaign</span>
            <span className="acd-dot-sep" />
            <span>Onboarded {new Date(campaign.onboardedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <span className="acd-dot-sep" />
            <span>{formatFull(live.creators)} creators active</span>
          </div>
        </div>
      </div>

      {/* PRIMARY LIVE COUNTERS */}
      <div className="acd-section">
        <div className="acd-counter-grid">
          <div className="acd-counter acd-counter-primary">
            <div className="acd-counter-label">
              <span className="acd-pulse-dot" /> Total views · live
            </div>
            <div className="acd-counter-v acd-counter-v-big">{formatFull(live.views)}</div>
            <div className="acd-counter-s">{formatViews(live.views)} and climbing every second</div>
          </div>
          <div className="acd-counter">
            <div className="acd-counter-label">Creator posts</div>
            <div className="acd-counter-v">{formatFull(live.posts)}</div>
            <div className="acd-counter-s">{avgViewsPerPost.toLocaleString('en-US')} avg views / post</div>
          </div>
          <div className="acd-counter">
            <div className="acd-counter-label">Views / day</div>
            <div className="acd-counter-v">{formatViews(live.viewsPerDay)}</div>
            <div className="acd-counter-s">Current run rate</div>
          </div>
        </div>
      </div>

      {/* BUDGET + GUARANTEE */}
      <div className="acd-section">
        <div className="acd-two-col">
          <div className="acd-panel">
            <div className="acd-panel-h">Budget · pay per view</div>
            <div className="acd-budget-row">
              <div>
                <div className="acd-budget-v acd-spent">{formatMoney(live.budgetSpent)}</div>
                <div className="acd-budget-l">Spent so far</div>
              </div>
              <div className="acd-budget-right">
                <div className="acd-budget-v">{formatMoney(live.budgetRemaining)}</div>
                <div className="acd-budget-l">Remaining of {formatMoney(campaign.budgetTotal)}</div>
              </div>
            </div>
            <div className="acd-bar">
              <div className="acd-bar-fill" style={{ width: `${budgetPct}%` }} />
            </div>
            <div className="acd-bar-caption">
              <span>{budgetPct.toFixed(1)}% of budget used</span>
              <span>~{formatViews(projectedViews)} views at full budget</span>
            </div>
          </div>

          <div className="acd-panel">
            <div className="acd-panel-h">Guaranteed views</div>
            <div className="acd-budget-row">
              <div>
                <div className="acd-budget-v">{formatViews(live.views)}</div>
                <div className="acd-budget-l">Delivered</div>
              </div>
              <div className="acd-budget-right">
                <div className="acd-budget-v">{formatViews(campaign.viewsGuaranteed)}</div>
                <div className="acd-budget-l">Guaranteed minimum</div>
              </div>
            </div>
            <div className="acd-bar">
              <div className="acd-bar-fill acd-bar-fill-alt" style={{ width: `${guaranteePct}%` }} />
            </div>
            <div className="acd-bar-caption">
              <span>{guaranteePct.toFixed(1)}% of guarantee</span>
              <span>Full refund if we miss</span>
            </div>
          </div>
        </div>
      </div>

      {/* BEST VIDEOS */}
      <div className="acd-section">
        <div className="section-eyebrow">Top performers</div>
        <h2 className="section-h2">Best videos <em>so far.</em></h2>
        <div className="acd-videos-grid">
          {campaign.bestVideos.map((v, i) => {
            // Make the #1 clip's counter tick along with the live total.
            const liveViews = i === 0
              ? v.views + Math.floor((live.views - campaign.baseViews) * 0.04)
              : v.views
            return (
              <div key={v.handle} className="acd-video-card">
                <div className="acd-video-rank">#{i + 1}</div>
                <div className="acd-video-wrap">
                  <video
                    className="acd-video"
                    controls
                    playsInline
                    preload="metadata"
                    onPlay={(e) => { e.currentTarget.muted = false }}
                    onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1 }}
                    onError={(e) => {
                      const wrap = e.currentTarget.closest('.acd-video-wrap')
                      if (wrap) wrap.classList.add('error')
                    }}
                  >
                    <source src={`${v.video}#t=1`} type="video/mp4" />
                  </video>
                  <div className="acd-video-fallback" aria-hidden="true">▶</div>
                </div>
                <div className="acd-video-meta">
                  <div className="acd-video-handle">{v.handle}</div>
                  <div className="acd-video-platform">{platformLabel(v.platform)}</div>
                </div>
                <div className="acd-video-views">
                  {i === 0 && <span className="acd-pulse-dot" />}
                  {formatFull(liveViews)} views
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* PLATFORM SPLIT + ACTIVITY */}
      <div className="acd-section">
        <div className="acd-two-col">
          <div className="acd-panel">
            <div className="acd-panel-h">Where the views are coming from</div>
            <div className="acd-platforms">
              {platformEntries.map(([name, pct]) => (
                <div key={name} className="acd-platform">
                  <div className="acd-platform-top">
                    <span>{name}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="acd-bar acd-bar-sm">
                    <div className="acd-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="acd-platform-views">{formatViews(Math.round(live.views * pct / 100))} views</div>
                </div>
              ))}
            </div>
          </div>

          <div className="acd-panel">
            <div className="acd-panel-h">
              <span className="acd-pulse-dot" /> Live activity
            </div>
            <div className="acd-activity">
              {live.activity.length === 0 && (
                <div className="acd-activity-empty">Watching for new activity…</div>
              )}
              {live.activity.map((a) => (
                <div key={a.id} className={'acd-activity-row acd-activity-' + a.kind}>
                  <span className="acd-activity-dot" />
                  <span className="acd-activity-text">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHAT'S HAPPENED SO FAR */}
      <div className="acd-section">
        <div className="acd-panel acd-summary">
          <div className="acd-panel-h">What's happened so far</div>
          <p className="acd-summary-text">{campaign.summary}</p>
          <div className="acd-summary-stats">
            <div className="acd-summary-stat">
              <div className="acd-summary-stat-v">{dayN}</div>
              <div className="acd-summary-stat-l">Days live</div>
            </div>
            <div className="acd-summary-stat">
              <div className="acd-summary-stat-v">{formatFull(live.creators)}</div>
              <div className="acd-summary-stat-l">Creators activated</div>
            </div>
            <div className="acd-summary-stat">
              <div className="acd-summary-stat-v">{formatViews(live.views)}</div>
              <div className="acd-summary-stat-l">Views generated</div>
            </div>
            <div className="acd-summary-stat">
              <div className="acd-summary-stat-v">{budgetPct.toFixed(0)}%</div>
              <div className="acd-summary-stat-l">Budget deployed</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Want a campaign like this<br /><em>running for you?</em></h2>
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
