import './Creators.css'

const STATS = [
  { v: '70K+', l: 'Active creators', s: 'Across all platforms' },
  { v: '60%', l: 'Min. US audience', s: 'Required per creator' },
  { v: '100%', l: 'Manual review', s: 'Every submission checked' },
  { v: '$0.09', l: 'Lowest CPM achieved', s: 'ProdByCPKShawn campaign' },
  { v: '48hrs', l: 'Avg. time to first clip', s: 'From campaign brief' },
]

const REGIONS = [
  { name: 'North America', count: '~55,000', pct: 78 },
  { name: 'Europe', count: '~8,500', pct: 12 },
  { name: 'UK & Ireland', count: '~4,200', pct: 6 },
  { name: 'Rest of World', count: '~2,300', pct: 4 },
]

const NICHES = [
  { icon: '🎵', name: 'Music & Entertainment', count: '~14,000 creators', pct: 80, examples: 'Songs, producers, artists, playlists, music reactions' },
  { icon: '🛍', name: 'E-Commerce & Products', count: '~18,000 creators', pct: 95, examples: 'Product reviews, unboxings, Amazon finds, hauls, gift guides' },
  { icon: '💪', name: 'Health, Fitness & Wellness', count: '~12,000 creators', pct: 72, examples: 'Supplements, training gear, nutrition, mental health, biohacking' },
  { icon: '🎙', name: 'Podcasts & Media', count: '~8,000 creators', pct: 50, examples: 'Clip repurposing, podcast reactions, highlight reels' },
  { icon: '🏆', name: 'Sports & Events', count: '~10,000 creators', pct: 60, examples: 'PPV, sports highlights, event previews, athlete content' },
  { icon: '✈', name: 'Travel & Lifestyle', count: '~6,000 creators', pct: 38, examples: 'Destinations, lifestyle products, travel gear, day-in-the-life' },
]

const APPROVED = [
  '60%+ US audience verified', 'Minimum 500 followers on target platform',
  'Clear niche alignment with campaign brief', 'No previous brand safety violations',
  'Original content — no reposts or duets of competitors',
]

const REJECTED = [
  'Generic, low-effort content ("this product is amazing!")', 'Misleading or exaggerated claims',
  'Wrong audience demographics for the campaign', 'Content that includes competitor brand mentions',
  'Content that looks like an ad — "Sponsored" energy kills performance',
]

const TIERS = [
  { label: 'Base', rpm: '$1', desc: 'Standard performance rate. Earns $1 per 1,000 organic views verified.' },
  { label: 'Growth', rpm: '$1.50', desc: 'Available for established creators with track record of approval.' },
  { label: 'Elite', rpm: '$2–$3', desc: 'Premium tier for top-performing creators with high engagement and consistent approval rates.' },
]

export default function Creators() {
  return (
    <>
      {/* HERO */}
      <div className="creators-hero">
        <div className="section" style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: '60px' }}>
          <div className="cn-inner">
            <div className="cn-hero-left fade-up">
              <div className="section-eyebrow">Creator Network</div>
              <h1>70,000+ creators.<br /><em>All vetted.<br />All performance-paid.</em></h1>
              <p>Every creator in our network is approved before they post for your brand. They earn when content performs — which means they're motivated to make it good.</p>
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '28px', width: 'fit-content' }}>
                Start a campaign →
              </a>
            </div>
            <div className="cn-hero-right fade-up">
              <div className="count-display">
                <div className="count-val">70,000+</div>
                <div className="count-lbl">Active creators in network</div>
                <div className="live-dot"><div className="live-dot-inner" />Growing weekly</div>
              </div>
              <div className="region-grid">
                {REGIONS.map(({ name, count, pct }) => (
                  <div key={name} className="region-card">
                    <div className="rc-region">{name}</div>
                    <div className="rc-count">{count}</div>
                    <div className="rc-pct">{pct}% of network</div>
                    <div className="rc-bar"><div className="rc-fill" style={{ width: pct + '%' }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAT STRIP */}
      <div className="creators-stat-strip stagger">
        {STATS.map(({ v, l, s }) => (
          <div key={l} className="cstat">
            <div className="cstat-v">{v}</div>
            <div className="cstat-l">{l}</div>
            <div className="cstat-s">{s}</div>
          </div>
        ))}
      </div>

      {/* NICHES */}
      <div className="section">
        <div className="section-eyebrow fade-up">Niche Coverage</div>
        <h2 className="section-h2 fade-up">We have creators in <em>your space.</em></h2>
        <p className="section-lead fade-up">Our network spans dozens of content niches. If your brand targets an audience, we have creators already posting for it.</p>
        <div className="niches-grid">
          {NICHES.map(({ icon, name, count, pct, examples }) => (
            <div key={name} className="niche-card fade-up">
              <div className="niche-icon">{icon}</div>
              <div className="niche-name">{name}</div>
              <div className="niche-count">{count}</div>
              <div className="niche-bar-wrap"><div className="niche-bar" style={{ width: pct + '%' }} /></div>
              <div className="niche-examples">{examples}</div>
            </div>
          ))}
        </div>
      </div>

      {/* APPROVED / REJECTED */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">Quality Control</div>
        <h2 className="section-h2 fade-up">Every clip is checked <em>before you pay.</em></h2>
        <div className="approval-grid">
          <div className="approval-col good fade-up">
            <div className="approval-head">✓ What gets approved</div>
            {APPROVED.map(a => (
              <div key={a} className="approval-item">
                <div className="approval-dot good-dot" />
                {a}
              </div>
            ))}
          </div>
          <div className="approval-col bad fade-up">
            <div className="approval-head">✕ What gets rejected</div>
            {REJECTED.map(r => (
              <div key={r} className="approval-item">
                <div className="approval-dot bad-dot" />
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RPM TIERS */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">Creator Earnings</div>
        <h2 className="section-h2 fade-up">What creators earn <em>at each RPM.</em></h2>
        <div className="tiers-grid">
          {TIERS.map(({ label, rpm, desc }) => (
            <div key={label} className={'tier-card fade-up' + (label === 'Growth' ? ' featured' : '')}>
              {label === 'Growth' && <div className="tier-badge">Most Common</div>}
              <div className="tier-label">{label}</div>
              <div className="tier-rpm">{rpm} <span>RPM</span></div>
              <p className="tier-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">A network of 70,000+<br /><em>ready to post for your brand.</em></h2>
            <p className="cta-p">Book a call and we'll show you the creators in your niche before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">30-min call · No commitment</span>
          </div>
        </div>
      </div>
    </>
  )
}
