import { useState } from 'react'
import './CaseStudies.css'

const CAMPAIGNS = [
  {
    id: 'base', cat: 'health', catLabel: 'Health & Wellness', name: 'Based Bodyworks', subtitle: 'Sports Performance',
    direction: 'Sports performance brand targeting gym-goers and athletes across TikTok and Instagram. Needed authentic fitness content that felt earned, not advertised — creators briefed to feature the brand naturally within their workout and training content.',
    outcome: '2.1M organic views directly in front of the fitness-obsessed audience. 203 pieces of creator content generated, all from people who already lived the lifestyle the brand was selling.',
    results: [
      { v: '2.1M', l: 'Total views' },
      { v: '203', l: 'Creator submissions' },
    ],
    highlight: '2.1M views direct to a targeted gym and fitness audience.',
    img: '/cs-base-body-works.png',
    gradient: 'linear-gradient(135deg,#1a1a0d,#0a0a05)',
    clips: ['linear-gradient(160deg,#4a4a0d,#1a1a05)','linear-gradient(160deg,#3a3a0a,#151505)','linear-gradient(160deg,#55550d,#1a1a05)'],
    videos: ['/base-clip-1.mp4', '/base-clip-2.mp4', '/base-clip-3.mp4'],
  },
  {
    id: 'bussin', cat: 'podcast', catLabel: 'Podcast', name: 'Growing Up Italian', subtitle: 'Comedy Podcast',
    direction: 'High-profile comedy podcast looking to grow short-form clip virality on TikTok and YouTube Shorts. Brief focused on repurposing the best moments into shareable clips that felt native to each platform.',
    outcome: '3.8M views from a small initial test budget. The clips generated significant new subscribers and introduced the podcast to a younger short-form audience who hadn\'t found it through traditional means.',
    results: [
      { v: '3.8M', l: 'Total views' },
      { v: '312', l: 'Creator submissions' },
    ],
    highlight: '3.8M views and 312 clips from a compact test campaign.',
    img: '/cs-growing-up-italian.png',
    gradient: 'linear-gradient(135deg,#1a0d0d,#0a0505)',
    clips: ['linear-gradient(160deg,#4a0d0d,#1a0505)','linear-gradient(160deg,#3a0a0a,#150505)','linear-gradient(160deg,#550d0d,#1a0505)'],
    videos: ['/bussin-clip-1.mp4', '/bussin-clip-2.mp4', '/bussin-clip-3.mp4'],
  },
  {
    id: 'cpkshawn', cat: 'music', catLabel: 'Music', name: 'ProdByCPKShawn', subtitle: '"Yo Bunny"',
    direction: 'Music producer promoting a new track. Goal: maximum TikTok reach to drive streams and organic discovery — no ad spend, no product to ship. Creators were briefed to use the audio natively in content they\'d post anyway.',
    outcome: '11.3M views across 1,062 creator posts. The track broke into TikTok discovery feeds and drove a significant uplift in streaming numbers — all from creator-led organic content.',
    results: [
      { v: '11.3M', l: 'Total views' },
      { v: '1,062', l: 'Creator submissions' },
    ],
    highlight: '11.3M views and 1,062 clips — the most-submitted campaign in our history.',
    img: '/cs-cpkshawn.png',
    gradient: 'linear-gradient(135deg,#0d1a0d,#050a05)',
    clips: ['linear-gradient(160deg,#0d4a0d,#051a05)','linear-gradient(160deg,#0a3a0a,#051505)','linear-gradient(160deg,#0d550d,#051a05)'],
    videos: ['/cpkshawn-clip-1.mp4', '/cpkshawn-clip-2.mp4', '/cpkshawn-clip-3.mp4'],
  },
  {
    id: 'murda', cat: 'music', catLabel: 'Music', name: 'NHC Murda 60x', subtitle: '"Murdadale"',
    direction: 'Indie hip-hop artist with a debut single. Started with 7 posts on TikTok. No label backing, no product — just an artist who needed ears on their music. Campaign launched with a tight brief focused on authentic street/lifestyle content.',
    outcome: 'Went from 7 TikTok posts to 1,456. Under 1,000 organic views to over 12 million. Campaign ended before the full budget was even used — the results came in fast.',
    results: [
      { v: '12M+', l: 'Total views' },
      { v: '1,456', l: 'Creator posts' },
    ],
    highlight: '12M+ views. Campaign closed at 60% budget — results came early.',
    quote: 'Went from 7 posts on TikTok to 1,456. From under 1,000 organic views to over 12 million — and we\'d only spent 60% of the budget.',
    img: '/cs-nhc-murda.png',
    gradient: 'linear-gradient(135deg,#0d0d1a,#05050a)',
    clips: ['linear-gradient(160deg,#0d0d4a,#05051a)','linear-gradient(160deg,#0a0a3a,#050515)','linear-gradient(160deg,#0d0d55,#05051a)'],
    videos: ['/murda-clip-1.mp4', '/murda-clip-2.mp4', '/murda-clip-3.mp4'],
  },
  {
    id: 'qrunitup', cat: 'music', catLabel: 'Music', name: 'QRUNITUP', subtitle: '"DFWM"',
    direction: 'Music artist promoting a debut single. Brief focused on TikTok-first distribution — getting the audio into the hands of creators whose audiences already consumed similar music content.',
    outcome: '1.9M views from 178 creator posts, driving meaningful streaming uplift and new followers for the artist\'s profile across multiple platforms.',
    results: [
      { v: '1.9M', l: 'Total views' },
      { v: '178', l: 'Creator submissions' },
    ],
    highlight: '1.9M views. Artist profile grew across every platform.',
    img: '/cs-qrunitup.png',
    gradient: 'linear-gradient(135deg,#1a0d1a,#0a050a)',
    clips: ['linear-gradient(160deg,#4a0d4a,#1a051a)','linear-gradient(160deg,#3a0a3a,#150515)','linear-gradient(160deg,#550d55,#1a051a)'],
    videos: ['/QRUNITUIP - DFWM.mp4', '/QRUNITUIP - DFWM(1).mp4', '/QRUNITUIP - DFWM(2).mp4'],
  },
  {
    id: 'glady', cat: 'music', catLabel: 'Music', name: 'Loudpac Glady', subtitle: '"Quit Callin"',
    direction: 'Emerging artist promoting debut single "Quit Callin". Campaign strategy centred on TikTok audio placement — briefing creators to use the track in trending, relatable, and emotional content formats to push the audio into FYP discovery.',
    outcome: '3.2M views across 198 creator submissions. The track gained significant organic traction on TikTok with audio saves and shares extending reach well beyond the initial campaign posts.',
    results: [
      { v: '3.2M', l: 'Total views' },
      { v: '198', l: 'Creator submissions' },
    ],
    highlight: '3.2M views on a debut single. 198 creators brought the audio to life.',
    img: '/cs-glady.png',
    gradient: 'linear-gradient(135deg,#1a0a2a,#0a050f)',
    clips: ['linear-gradient(160deg,#3a0d5a,#15052a)','linear-gradient(160deg,#2a0a4a,#10051f)','linear-gradient(160deg,#4a0d6a,#1a0535)'],
    videos: ['/Loudpac Glady.mp4', '/Loudpac Glady(1).mp4', '/Loudpac Glady(2).mp4'],
  },
  {
    id: 'oscen', cat: 'music', catLabel: 'Music', name: 'Oscen', subtitle: '"Worship"',
    direction: 'Electronic artist seeking broader audience discovery for "Worship". Creators were briefed to integrate the track into cinematic, emotional, and late-night aesthetic content — formats that naturally drive audio saves on TikTok and Reels.',
    outcome: '1.2M views generated from 252 creator posts. The track built a consistent listener base in the electronic and ambient music community, with strong retention on streaming platforms post-campaign.',
    results: [
      { v: '1.2M', l: 'Total views' },
      { v: '252', l: 'Creator submissions' },
    ],
    highlight: '1.2M views and 252 posts driving discovery for an emerging electronic artist.',
    img: '/cs-oscen.jpg',
    gradient: 'linear-gradient(135deg,#0a1a2a,#05090f)',
    clips: ['linear-gradient(160deg,#0d3a5a,#05152a)','linear-gradient(160deg,#0a2a4a,#050f1f)','linear-gradient(160deg,#0d4a6a,#051a35)'],
    videos: ['/Oscen.mp4', '/Oscen(1).mp4', '/Oscen(2).mp4'],
  },
  {
    id: 'brysonlee', cat: 'health', catLabel: 'Health & Wellness', name: 'Bryson Lee', subtitle: '"L22 Fitness Bae"',
    direction: 'Fitness-themed music track by Bryson Lee. Campaign matched the audio directly to gym, workout, and body transformation creators — a natural fit between the music\'s energy and the content these creators already made every day.',
    outcome: '906K views through niche fitness creator content. Despite being a tighter niche campaign, the views were highly targeted — every impression landed in front of a fitness-engaged audience.',
    results: [
      { v: '906K', l: 'Total views' },
      { v: '116', l: 'Creator submissions' },
    ],
    highlight: '906K targeted views directly inside the fitness community.',
    img: '/cs-brysonlee.png',
    gradient: 'linear-gradient(135deg,#1a1a0a,#0a0a05)',
    clips: ['linear-gradient(160deg,#3a3a0d,#15150a)','linear-gradient(160deg,#2a2a0a,#101005)','linear-gradient(160deg,#4a4a0d,#1a1a05)'],
    videos: ['/Bryson Lee.mp4', '/Bryson Lee(1).mp4', '/Bryson Lee(2).mp4'],
  },
  {
    id: 'cryptorians', cat: 'crypto', catLabel: 'Crypto & Finance', name: 'Cryptorians', subtitle: 'Clipping Campaign',
    direction: 'Crypto content brand looking to grow their TikTok and YouTube audience through short-form clip distribution. Brief focused on repurposing their best educational and entertainment moments into platform-native clips that drove follows and channel discovery.',
    outcome: '209K views from 209 creator submissions. The campaign consistently drove new followers and subscribers to Cryptorians\' own channels — exactly the compounding growth a content brand needs.',
    results: [
      { v: '209K', l: 'Total views' },
      { v: '209', l: 'Creator submissions' },
    ],
    highlight: '209 creators. 209K views. Consistent channel growth in the crypto niche.',
    img: '/cs-cryptorians.png',
    gradient: 'linear-gradient(135deg,#0a1a0a,#051005)',
    clips: ['linear-gradient(160deg,#0d4a0d,#051a05)','linear-gradient(160deg,#0a3a0a,#051505)','linear-gradient(160deg,#0d550d,#051a05)'],
    videos: ['/Cryptorians.mp4', '/Cryptorians(1).mp4', '/Cryptorians(2).mp4'],
  },
]

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'music', label: 'Music' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'crypto', label: 'Crypto & Finance' },
]

const OVERVIEW_STATS = [
  { v: '2.3B+', l: 'Combined views generated', s: 'Across all campaigns' },
  { v: '4,400+', l: 'Creator clips approved', s: 'Manually reviewed across all brands' },
  { v: '9', l: 'Campaigns completed', s: 'Music · Health · Podcast · Crypto' },
  { v: '4', l: 'Different niches', s: 'And growing every month' },
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

      {/* FEATURED */}
      <div className="section cs-featured-section">
        <div className="section-eyebrow fade-up">Most Talked About</div>
        <h2 className="section-h2 fade-up">Our biggest campaign <em>to date.</em></h2>
          <div className="cs-featured fade-up">
          <div className="csf-left">
            <div className="csf-tag">Music · Featured Campaign</div>
            {featured.img
              ? <img src={featured.img} alt={featured.name} className="csf-img" />
              : <div className="csf-logo">NHC</div>
            }
            <div className="csf-name">{featured.name}</div>
            <div className="csf-sub">Music Artist · {featured.subtitle}</div>
            <p className="csf-desc">
              Indie hip-hop artist with a debut single. Started with 7 posts on TikTok.
              No label, no ad budget — just performance UGC and a creator network.
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

      {/* FILTER + GRID */}
      <div className="section" style={{ paddingTop: '52px' }}>
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
              <div
                className={'cs-card-visual' + (c.img ? ' has-img' : '')}
                style={c.img
                  ? { backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
                  : { background: c.gradient }
                }
              >
                {c.img && <div className="cs-card-visual-overlay" />}
                <div className="cs-card-cat">{c.catLabel}</div>
                <div className="cs-card-name">{c.name}</div>
              </div>
              <div className="cs-card-body">
                <div className="cs-card-clips">
                  {[0, 1, 2].map((i) => {
                    const bg = c.clips?.[i]
                    const src = c.videos?.[i]

                    return (
                      <div key={i} className="cs-clip" style={{ background: bg }}>
                        {src ? (
                          <video
                            className="cs-clip-video-thumb"
                            controls
                            playsInline
                            preload="metadata"
                            onClick={(e) => e.stopPropagation()}
                            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 1 }}
                            onPlay={(e) => { e.currentTarget.muted = false }}
                            onMouseLeave={(e) => { e.currentTarget.pause() }}
                          >
                            <source src={`${src}#t=1`} type="video/mp4" />
                          </video>
                        ) : null}
                        <div className="cs-clip-play">▶</div>
                      </div>
                    )
                  })}
                </div>
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
            <div
              className={'cs-modal-head' + (modalData.img ? ' has-img' : '')}
              style={modalData.img
                ? { backgroundImage: `url(${modalData.img})`, backgroundSize: 'cover', backgroundPosition: 'center top' }
                : { background: modalData.gradient }
              }
            >
              <div className="csm-cat">{modalData.catLabel}</div>
              <div className="csm-name">{modalData.name}</div>
              <div className="csm-sub">{modalData.subtitle}</div>
            </div>
            <div className="cs-modal-body">
              <div className="csm-section-label">Campaign Direction</div>
              <p className="csm-brief">{modalData.direction}</p>
              <div className="csm-results">
                {modalData.results.map(({ v, l }) => (
                  <div key={l} className="csm-result">
                    <div className="csm-result-v">{v}</div>
                    <div className="csm-result-l">{l}</div>
                  </div>
                ))}
              </div>
              <div className="csm-section-label">Outcome</div>
              <p className="csm-brief">{modalData.outcome}</p>
              <div className="csm-highlight">{modalData.highlight}</div>
              {modalData.quote && (
                <blockquote className="csm-quote">"{modalData.quote}"</blockquote>
              )}
              {modalData.videos?.length > 0 && (
                <div className="cs-modal-clips">
                  <div className="cs-modal-clips-label">Creator clips from this campaign</div>
                  <div className="cs-modal-clips-row">
                    {modalData.videos.map((src, i) => (
                      <div key={i} className="cs-modal-clip-wrap">
                        <video
                          className="cs-modal-clip-video"
                          controls
                          playsInline
                          preload="metadata"
                          onPlay={(e) => { e.currentTarget.muted = false }}
                          onError={(e) => {
                            const wrap = e.currentTarget.closest('.cs-modal-clip-wrap')
                            if (wrap) wrap.classList.add('error')
                          }}
                        >
                          <source src={`${src}#t=1`} type="video/mp4" />
                        </video>
                        <div className="cs-modal-clip-fallback" aria-hidden="true">▶</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <a
                href="https://calendly.com/esaanwar/partner-with-clipsmart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary csm-cta"
              >
                Start a campaign →
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
