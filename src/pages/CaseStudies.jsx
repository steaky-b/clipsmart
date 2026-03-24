import './CaseStudies.css'

const CASES = [
  {
    id: 'cpkshawn', cat: 'Music', name: 'ProdByCPKShawn', track: '"Yo Bunny"',
    brief: 'Music producer promoting a new track. Goal: mass TikTok reach to drive streams and discovery — no ad spend, no product to ship.',
    results: [
      { v: '11.3M', l: 'Total views' }, { v: '$1,000', l: 'Total spend' },
      { v: '$0.09', l: 'Effective CPM' }, { v: '1,062', l: 'Creator clips' },
    ],
    highlight: '$0.09 effective CPM — the lowest we\'ve ever achieved.',
    gradient: 'linear-gradient(135deg,#0d1a0d,#050a05)',
  },
  {
    id: 'murda', cat: 'Music', name: 'NHC Murda 60x', track: '"Murdadale"',
    brief: 'Indie hip-hop artist with a debut single. Started with 7 posts on TikTok. No label backing, no product, no ad budget.',
    results: [
      { v: '12M+', l: 'Total views' }, { v: '$2,500', l: 'Total spend' },
      { v: '1,456', l: 'Creator posts' }, { v: '60%', l: 'Budget used' },
    ],
    highlight: 'Campaign hit 12M views using only 60% of the budget.',
    quote: 'Went from 7 posts on TikTok to 1,456. From under 1,000 organic views to over 12 million — and we\'d only spent 60% of the budget.',
    gradient: 'linear-gradient(135deg,#0d0d1a,#05050a)',
  },
  {
    id: 'bussin', cat: 'Podcast', name: 'Bussin With The Boys', track: 'Sports Podcast',
    brief: 'High-profile sports podcast looking to grow short-form clip virality on TikTok and YouTube Shorts.',
    results: [
      { v: '3.8M', l: 'Total views' }, { v: '$500', l: 'Total spend' },
      { v: '312', l: 'Creator clips' }, { v: '$0.13', l: 'Effective CPM' },
    ],
    highlight: '3.8M views from a $500 test budget.',
    gradient: 'linear-gradient(135deg,#1a0d0d,#0a0505)',
  },
  {
    id: 'gains', cat: 'E-Commerce', name: 'Gains Nutrition', track: 'Supplement Brand',
    brief: 'Supplement brand needing authentic product awareness without relying on influencer flat fees or traditional ads.',
    results: [
      { v: '4.2M', l: 'Total views' }, { v: '$1,500', l: 'Total spend' },
      { v: '487', l: 'Creator clips' }, { v: '$0.36', l: 'Effective CPM' },
    ],
    highlight: '4.2M organic views at a fraction of paid ad cost.',
    gradient: 'linear-gradient(135deg,#0d1a1a,#050a0a)',
  },
]

export default function CaseStudies() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Case Studies</div>
        <h1>Not projections.<br /><em>Real campaigns.</em></h1>
        <p>Every number below is verified. Every campaign was real money, real creators, real views.</p>
      </div>

      {/* OVERVIEW STATS */}
      <div className="stats-section">
        <div className="stats-inner stagger">
          {[
            { v: '21.5M+', l: 'Total verified views', s: 'Across all case studies' },
            { v: '$5,250', l: 'Total spend shown', s: 'Across all case studies' },
            { v: '$0.09', l: 'Lowest CPM achieved', s: 'ProdByCPKShawn campaign' },
            { v: '3,239', l: 'Creator clips approved', s: 'Manually reviewed' },
          ].map(({ v, l, s }) => (
            <div key={l} className="stat-block">
              <div className="stat-v">{v}</div>
              <div className="stat-l">{l}</div>
              <div className="stat-s">{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CASES */}
      <div className="cases-list">
        {CASES.map(({ id, cat, name, track, brief, results, highlight, quote, gradient }, i) => (
          <div key={id} className={'case-study-block' + (i % 2 === 1 ? ' alt' : '')}>
            <div className="csb-inner section">
              <div className="csb-visual fade-up" style={{ background: gradient }}>
                <div className="csb-cat">{cat}</div>
                <div className="csb-name">{name}</div>
                <div className="csb-track">{track}</div>
                <div className="csb-highlight-badge">{highlight}</div>
              </div>
              <div className="csb-content fade-up">
                <div className="section-eyebrow" style={{ marginBottom: '12px' }}>{cat}</div>
                <h2 className="csb-h">{name}</h2>
                <p className="csb-brief">{brief}</p>
                <div className="csb-results">
                  {results.map(({ v, l }) => (
                    <div key={l} className="csb-result">
                      <div className="csb-result-v">{v}</div>
                      <div className="csb-result-l">{l}</div>
                    </div>
                  ))}
                </div>
                {quote && (
                  <blockquote className="csb-quote">"{quote}"</blockquote>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
            <span className="cta-note">No commitment · No agency fees</span>
          </div>
        </div>
      </div>
    </>
  )
}
