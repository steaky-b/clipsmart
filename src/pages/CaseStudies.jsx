import { useState } from 'react'
import './CaseStudies.css'

const CAMPAIGNS = [
  {
    id: 'gains', cat: 'ecommerce', catLabel: 'E-Commerce', name: 'Gains Nutrition', subtitle: 'Supplement Brand',
    brief: 'Supplement brand needing authentic product awareness without relying on influencer flat fees or traditional ads. Goal was DTC sales through organic creator content.',
    results: [
      { v: '4.2M', l: 'Total views' }, { v: '$1,500', l: 'Total spend' },
      { v: '$0.36', l: 'Effective CPM' }, { v: '487', l: 'Creator clips' },
    ],
    highlight: '4.2M organic views at a fraction of paid ad cost.',
    gradient: 'linear-gradient(135deg,#0d1a1a,#050a0a)',
  },
  {
    id: 'cpkshawn', cat: 'music', catLabel: 'Music', name: 'ProdByCPKShawn', subtitle: '"Yo Bunny"',
    brief: 'Music producer promoting a new track. Goal: mass TikTok reach to drive streams and discovery — no ad spend, no product to ship.',
    results: [
      { v: '11.3M', l: 'Total views' }, { v: '$1,000', l: 'Total spend' },
      { v: '$0.09', l: 'Effective CPM' }, { v: '1,062', l: 'Creator clips' },
    ],
    highlight: '$0.09 effective CPM — the lowest we\'ve ever achieved.',
    gradient: 'linear-gradient(135deg,#0d1a0d,#050a05)',
  },
  {
    id: 'murda', cat: 'music', catLabel: 'Music', name: 'NHC Murda 60x', subtitle: '"Murdadale"',
    brief: 'Indie hip-hop artist with a debut single. Started with 7 posts on TikTok. No label backing, no product, no ad budget — just performance UGC.',
    results: [
      { v: '12M+', l: 'Total views' }, { v: '$2,500', l: 'Total spend' },
      { v: '1,456', l: 'Creator posts' }, { v: '60%', l: 'Budget used' },
    ],
    highlight: 'Campaign hit 12M views using only 60% of the budget.',
    quote: 'Went from 7 posts on TikTok to 1,456. From under 1,000 organic views to over 12 million — and we\'d only spent 60% of the budget.',
    gradient: 'linear-gradient(135deg,#0d0d1a,#05050a)',
  },
  {
    id: 'bussin', cat: 'podcast', catLabel: 'Podcast', name: 'Bussin With The Boys', subtitle: 'Sports Podcast',
    brief: 'High-profile sports podcast looking to grow short-form clip virality on TikTok and YouTube Shorts without a large production budget.',
    results: [
      { v: '3.8M', l: 'Total views' }, { v: '$500', l: 'Total spend' },
      { v: '$0.13', l: 'Effective CPM' }, { v: '312', l: 'Creator clips' },
    ],
    highlight: '3.8M views from a $500 test budget.',
    gradient: 'linear-gradient(135deg,#1a0d0d,#0a0505)',
  },
  {
    id: 'base', cat: 'health', catLabel: 'Health & Wellness', name: 'Base Body Works', subtitle: 'Sports Performance',
    brief: 'Sports performance brand targeting gym-goers and athletes across TikTok and Instagram. Needed authentic fitness content, not traditional influencer posts.',
    results: [
      { v: '2.1M', l: 'Total views' }, { v: '$750', l: 'Total spend' },
      { v: '$0.36', l: 'Effective CPM' }, { v: '203', l: 'Creator clips' },
    ],
    highlight: '2.1M organic views targeting gym and fitness audiences.',
    gradient: 'linear-gradient(135deg,#1a1a0d,#0a0a05)',
  },
  {
    id: 'client3', cat: 'sports', catLabel: 'Sports / Events', name: 'Sports Campaign', subtitle: 'PPV Event',
    brief: 'PPV event promotion with targeted creator posts driving awareness and ticket interest across TikTok and Instagram in the weeks leading up to the event.',
    results: [
      { v: '1.9M', l: 'Total views' }, { v: '$500', l: 'Total spend' },
      { v: '$0.26', l: 'Effective CPM' }, { v: '178', l: 'Creator clips' },
    ],
    highlight: '1.9M views driving event awareness and ticket interest.',
    gradient: 'linear-gradient(135deg,#1a0d1a,#0a050a)',
  },
]

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'music', label: 'Music' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'sports', label: 'Sports' },
  { id: 'health', label: 'Health & Wellness' },
]

const OVERVIEW_STATS = [
  { v: '25.5M+', l: 'Total verified views', s: 'Across all campaigns' },
  { v: '$0.09', l: 'Lowest CPM achieved', s: 'ProdByCPKShawn campaign' },
  { v: '3,699', l: 'Creator clips approved', s: 'Manually reviewed' },
  { v: '6', l: 'Campaigns shown', s: 'Music · Podcast · E-com · Sports' },
]

export default function CaseStudies() {
  const [activeCat, setActiveCat] = useState('all')
  const [activeModal, setActiveModal] = useState(null)

  const featured = CAMPAIGNS.find(c => c.id === 'murda')
  const filtered = activeCat === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.cat === activeCat)
  const modalData = activeModal ? CAMPAIGNS.find(c => c.id === activeModal) : null

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Case Studies</div>
        <h1>Not projections.<br /><em>Real campaigns.</em></h1>
        <p>Every number below is verified. Real money, real creators, real views.</p>
      </div>

      {/* OVERVIEW STATS */}
      <div className="stats-section">
        <div className="stats-inner stagger">
          {OVERVIEW_STATS.map(({ v, l, s }) => (
            <div key={l} className="stat-block">
              <div className="stat-v">{v}</div>
              <div className="stat-l">{l}</div>
              <div className="stat-s">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <div className="section">
        <div className="section-eyebrow fade-up">Most Talked About</div>
        <h2 className="section-h2 fade-up">Our most talked-about <em>result.</em></h2>
        <div className="cs-featured fade-up">
          <div className="csf-left">
            <div className="csf-tag">Music · Featured Campaign</div>
            <div className="csf-logo">NHC</div>
            <div className="csf-name">{featured.name}</div>
            <div className="csf-sub">Music Artist · {featured.subtitle}</div>
            <p className="csf-desc">
              Indie hip-hop artist with a new single. Started with 7 posts on TikTok.
              Wanted organic growth — no product to ship, no ads.
            </p>
          </div>
          <div className="csf-right">
            <div className="csf-metrics">
              {featured.results.map(({ v, l }) => (
                <div key={l} className="csfm">
                  <div className="csfm-val">{v}</div>
                  <div className="csfm-lbl">{l}</div>
                </div>
              ))}
            </div>
            <blockquote className="csf-quote">
              "{featured.quote}"
            </blockquote>
            <button className="btn-primary csf-btn" onClick={() => setActiveModal('murda')}>
              Full breakdown →
            </button>
          </div>
        </div>
      </div>

      {/* FILTER + GRID */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">All Campaigns</div>
        <h2 className="section-h2 fade-up">Every campaign. Every <em>result.</em></h2>
        <div className="cs-filter fade-up">
          {CATS.map(({ id, label }) => (
            <button key={id} className={'cs-ftab' + (activeCat === id ? ' on' : '')} onClick={() => setActiveCat(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="cs-grid">
          {filtered.map(c => (
            <button key={c.id} className="cs-card fade-up" onClick={() => setActiveModal(c.id)}>
              <div className="cs-card-visual" style={{ background: c.gradient }}>
                <div className="cs-card-cat">{c.catLabel}</div>
                <div className="cs-card-name">{c.name}</div>
              </div>
              <div className="cs-card-body">
                <div className="cs-card-metrics">
                  {c.results.slice(0, 2).map(({ v, l }) => (
                    <div key={l} className="cscm">
                      <div className="cscm-val">{v}</div>
                      <div className="cscm-lbl">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="cs-card-highlight">{c.highlight}</div>
                <div className="cs-card-cta">View breakdown →</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {modalData && (
        <div className="cs-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="cs-modal" onClick={e => e.stopPropagation()}>
            <button className="cs-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">×</button>
            <div className="cs-modal-head" style={{ background: modalData.gradient }}>
              <div className="csm-cat">{modalData.catLabel}</div>
              <div className="csm-name">{modalData.name}</div>
              <div className="csm-sub">{modalData.subtitle}</div>
            </div>
            <div className="cs-modal-body">
              <p className="csm-brief">{modalData.brief}</p>
              <div className="csm-results">
                {modalData.results.map(({ v, l }) => (
                  <div key={l} className="csm-result">
                    <div className="csm-result-v">{v}</div>
                    <div className="csm-result-l">{l}</div>
                  </div>
                ))}
              </div>
              <div className="csm-highlight">{modalData.highlight}</div>
              {modalData.quote && (
                <blockquote className="csm-quote">"{modalData.quote}"</blockquote>
              )}
              <a
                href="https://calendly.com/esaanwar/partner-with-clipsmart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary csm-cta"
              >
                Book a call like this →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Want results like these<br /><em>for your brand?</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll show you what your budget gets — before you commit anything.</p>
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
