import { Link } from 'react-router-dom'
import './SocialMediaManagement.css'

const SERVICES = [
  {
    icon: '📋',
    title: 'Content Strategy',
    desc: 'We build a content calendar tailored to your brand — the right formats, hooks, and posting cadence for maximum organic reach on TikTok, Instagram, and YouTube Shorts.',
  },
  {
    icon: '✂️',
    title: 'Content Creation & Editing',
    desc: 'Our team handles scripting, editing, and production. We take your raw footage or brand assets and turn them into scroll-stopping short-form content ready to post.',
  },
  {
    icon: '📅',
    title: 'Consistent Posting',
    desc: 'We manage your posting schedule so your brand stays visible every day — without you lifting a finger. Consistency is the single biggest driver of organic growth.',
  },
  {
    icon: '📈',
    title: 'Audience Growth',
    desc: 'Organic follower growth through strategic content, hashtag research, trend-riding, and community engagement. Real followers, not bought ones.',
  },
  {
    icon: '🤝',
    title: 'Creator Amplification',
    desc: 'Pair your social media management with our creator network. Every campaign post drives traffic back to your profiles, compounding your follower growth.',
  },
  {
    icon: '📊',
    title: 'Monthly Reporting',
    desc: 'Clear, no-nonsense monthly reports covering follower growth, reach, engagement rate, and top-performing content — so you always know what\'s working.',
  },
]

const PLATFORMS = [
  { name: 'TikTok', desc: 'Short-form video, viral reach, trend-driven content' },
  { name: 'Instagram Reels', desc: 'Reels, Stories, and feed posts for brand building' },
  { name: 'YouTube Shorts', desc: 'Discoverable short-form content with lasting shelf life' },
]

const PROCESS = [
  { n: '01', t: 'Brand audit & strategy call', b: 'We review your current social presence, competitor landscape, and brand voice. Then we build a 30-day content strategy.' },
  { n: '02', t: 'Content production begins', b: 'Scripts, edits, and assets are prepared in advance. You approve the first batch before anything goes live.' },
  { n: '03', t: 'We post. You grow.', b: 'Your content calendar runs on autopilot. We handle scheduling, captions, hashtags, and engagement monitoring.' },
  { n: '04', t: 'Monthly review & optimisation', b: 'We review performance data every month and refine the strategy — doubling down on what works, cutting what doesn\'t.' },
]

export default function SocialMediaManagement() {
  document.title = 'Social Media Management — Managed Growth | ClipSmart'
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <Link to="/how-it-works" style={{ color: 'var(--g)', opacity: .7 }}>How It Works</Link>
          &nbsp;/&nbsp;Social Media Management
        </div>
        <h1>Social Media<br /><em>Management.</em></h1>
        <p>We manage and grow your brand's social media presence — strategy, content, posting, and audience growth, all handled for you.</p>
      </div>

      {/* SERVICES GRID */}
      <div className="section">
        <div className="section-eyebrow fade-up">What's Included</div>
        <h2 className="section-h2 fade-up">Everything your brand needs<br /><em>to grow online.</em></h2>
        <div className="smm-services-grid">
          {SERVICES.map(({ icon, title, desc }) => (
            <div key={title} className="smm-service-card fade-up">
              <div className="smm-service-icon">{icon}</div>
              <h3 className="smm-service-t">{title}</h3>
              <p className="smm-service-b">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PLATFORMS */}
      <div className="smm-platforms-section">
        <div className="section">
          <div className="section-eyebrow fade-up">Platforms</div>
          <h2 className="section-h2 fade-up">We grow your presence<br /><em>where it matters.</em></h2>
          <div className="smm-platforms">
            {PLATFORMS.map(({ name, desc }) => (
              <div key={name} className="smm-platform fade-up">
                <div className="smm-platform-name">{name}</div>
                <div className="smm-platform-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className="section">
        <div className="section-eyebrow fade-up">The Process</div>
        <h2 className="section-h2 fade-up">Simple onboarding.<br /><em>Hands-off for you.</em></h2>
        <div className="smm-process">
          {PROCESS.map(({ n, t, b }) => (
            <div key={n} className="smm-process-step fade-up">
              <div className="smm-step-num">{n}</div>
              <div>
                <div className="smm-step-t">{t}</div>
                <div className="smm-step-b">{b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMBO CALLOUT */}
      <div className="section smm-combo-section" style={{ paddingTop: 0 }}>
        <div className="smm-combo-card fade-up">
          <div className="smm-combo-left">
            <div className="section-eyebrow">Power Move</div>
            <h2 className="smm-combo-h">Pair it with <em>Creator Campaigns</em></h2>
            <p className="smm-combo-p">
              The most powerful brands use both services together.
              Creator campaigns flood your niche with content.
              Social media management ensures every new viewer lands on a polished, active profile.
              The result: follower growth that compounds month over month.
            </p>
            <Link to="/how-it-works/creator-campaign" className="btn-primary" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
              See creator campaigns →
            </Link>
          </div>
          <div className="smm-combo-right">
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">2×</div>
              <div className="smm-combo-stat-l">Faster profile growth when combined with creator campaigns</div>
            </div>
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">100%</div>
              <div className="smm-combo-stat-l">Organic — zero paid amplification required</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to hand off your<br /><em>social media?</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll walk you through exactly how we'd approach your brand's growth.</p>
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
