import { useState } from 'react'
import './Creators.css'

const STATS = [
  { v: '80K+', l: 'Active creators', s: 'Across all platforms' },
  { v: '100%', l: 'Manual review', s: 'Every submission checked' },
  { v: '$0.09', l: 'Lowest CPM achieved', s: 'ProdByCPKShawn campaign' },
  { v: '16hrs', l: 'Avg. time to first clip', s: 'From campaign brief' },
]

const REGIONS = [
  { name: 'North America', count: '~45,000', pct: 56 },
  { name: 'Europe', count: '~18,500', pct: 23 },
  { name: 'UK & Ireland', count: '~9,200', pct: 12 },
  { name: 'Rest of World', count: '~7,300', pct: 9 },
]

const NICHES = [
  { icon: '🛍', name: 'E-Commerce & Products', count: '~18,000 creators', pct: 95, examples: 'Product reviews, unboxings, Amazon finds, hauls, gift guides' },
  { icon: '🎵', name: 'Music & Entertainment', count: '~14,000 creators', pct: 80, examples: 'Songs, producers, artists, playlists, music reactions' },
  { icon: '💪', name: 'Health, Fitness & Wellness', count: '~12,000 creators', pct: 72, examples: 'Supplements, training gear, nutrition, mental health, biohacking' },
  { icon: '🏆', name: 'Sports & Events', count: '~10,000 creators', pct: 60, examples: 'PPV, sports highlights, event previews, athlete content' },
  { icon: '🎙', name: 'Podcasts & Media', count: '~8,000 creators', pct: 50, examples: 'Clip repurposing, podcast reactions, highlight reels' },
  { icon: '✈', name: 'Travel & Lifestyle', count: '~6,000 creators', pct: 38, examples: 'Destinations, lifestyle products, travel gear, day-in-the-life' },
]

const APPROVED = [
  'Minimum 500 followers on target platform',
  'Clear niche alignment with campaign brief',
  'No previous brand safety violations',
  'Original content — no reposts or duets of competitors',
  'Audience quality verified — real engagement, not bot-inflated',
]

const FAQ_CREATORS = [
  {
    q: 'How do creators get paid — and why does that benefit my brand?',
    a: 'Creators earn per view, not per post. That means every creator in your campaign is financially motivated to make content that actually performs. There are no flat rates, no guaranteed payouts for low-effort clips — if it doesn\'t get views, they don\'t get paid. Your budget only goes towards content that works.',
  },
  {
    q: 'With 80,000+ creators, how do you make sure the right ones post for my brand?',
    a: 'When your campaign brief goes live, only creators whose niche, platform, and audience demographics match your target are eligible to apply. Every submission is then manually reviewed before going live — we check content quality, brand alignment, and engagement authenticity. You\'re never at the mercy of an algorithm.',
  },
  {
    q: 'How quickly will content start going live after I launch a campaign?',
    a: 'Typically within 16 hours of your campaign brief going live, you\'ll have your first clip posted and tracked. Most campaigns have multiple clips live within the first 24–48 hours. The network is active — creators are checking for new briefs daily.',
  },
  {
    q: 'What platforms do the creators post on?',
    a: 'The majority of our network posts across TikTok, Instagram Reels, and YouTube Shorts. When setting up your campaign you can specify which platforms to focus on, or run across all three simultaneously to maximise reach. Most brands see the strongest CPM on TikTok, but cross-platform campaigns compound results significantly.',
  },
  {
    q: 'Can I see which creators would post for my brand before committing?',
    a: 'Yes — during your onboarding call we can show you a sample of creators in your niche before you commit a penny. We want you to be confident in the fit before the campaign launches. If the creators don\'t match your expectations, we\'ll find more that do.',
  },
]

const REJECTED = [
  'Generic, low-effort content ("this product is amazing!")',
  'Misleading or exaggerated claims',
  'Wrong audience demographics for the campaign',
  'Content that includes competitor brand mentions',
  'Content that looks like an ad — "Sponsored" energy kills performance',
]

export default function Creators() {
  document.title = 'Creator Network — 80,000+ Verified Creators | ClipSmart'
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      {/* HERO */}
      <div className="creators-hero">
        <div className="section" style={{ paddingTop: 'calc(var(--nav-h) + 80px)', paddingBottom: '60px' }}>
          <div className="cn-inner">
            <div className="cn-hero-left fade-up">
              <div className="section-eyebrow">Creator Network</div>
              <h1>80,000+ creators.<br /><em>All verified.<br />All performance-paid.</em></h1>
              <p>Every creator in our network is approved before they post for your brand. They earn when content performs — which means they're motivated to make it good.</p>
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '28px', width: 'fit-content' }}>
                Start a campaign →
              </a>
            </div>
            <div className="cn-hero-right fade-up">
              <div className="count-display">
                <div className="count-val">80,000+</div>
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

      {/* SOCIAL MEDIA GROWTH */}
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">Grow Your Profile</div>
        <h2 className="section-h2 fade-up">Creators grow <em>as your brand grows.</em></h2>
        <p className="section-lead fade-up">When you run a ClipSmart campaign, your brand gets tagged, featured, and linked across hundreds of creator profiles — sending their audiences directly to your channels.</p>
        <div className="social-grid">
          {[
            { icon: '📈', title: 'Organic follower growth', desc: 'Each creator post drives discovery back to your brand profile. Real followers from real audiences — no paid boosting.' },
            { icon: '🔗', title: 'Cross-platform amplification', desc: 'Creators post across TikTok, Instagram, and YouTube simultaneously, multiplying your brand touchpoints.' },
            { icon: '💬', title: 'Authentic brand mentions', desc: 'Hundreds of organic mentions build brand familiarity faster than any ad campaign can — without the "Sponsored" tag.' },
            { icon: '📊', title: 'Compounding reach', desc: 'Viral clips don\'t disappear. They continue driving views, follows, and traffic long after your campaign ends.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="social-card fade-up">
              <div className="social-card-icon">{icon}</div>
              <h3 className="social-card-t">{title}</h3>
              <p className="social-card-b">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="section creators-faq-section" style={{ paddingTop: 0 }}>
        <div className="section-eyebrow fade-up">Creator FAQ</div>
        <h2 className="section-h2 fade-up">Questions before <em>you join?</em></h2>
        <div className="creators-faq-list">
          {FAQ_CREATORS.map(({ q, a }, i) => (
            <div key={i} className={`creators-faq-item${openFaq === i ? ' open' : ''}`}>
              <button
                className="creators-faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                {q}
                <span className="creators-faq-icon">{openFaq === i ? '−' : '+'}</span>
              </button>
              <div className="creators-faq-a">{a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">A network of 80,000+<br /><em>ready to post for your brand.</em></h2>
            <p className="cta-p">Book a call and we'll show you the creators in your niche before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a free call →
            </a>
            <span className="cta-note">30-min call · Full refund if we don't deliver</span>
          </div>
        </div>
      </div>
    </>
  )
}
