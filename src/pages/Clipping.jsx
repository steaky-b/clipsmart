import { Link } from 'react-router-dom'
import './SocialMediaManagement.css'

const SERVICES = [
  {
    icon: '✂️',
    title: 'Long-Form to Short-Form',
    desc: 'We watch your podcasts, interviews, livestreams, and YouTube videos and identify the highest-retention moments — then clip them into punchy short-form content.',
  },
  {
    icon: '💬',
    title: 'Captions & Text Overlays',
    desc: 'Every clip gets styled captions and animated text overlays optimised for silent viewing — the format that generates the most engagement on TikTok, Reels, and Shorts.',
  },
  {
    icon: '🎨',
    title: 'On-Brand Editing',
    desc: 'Colour grade, music, pacing, and transitions that match your brand identity. Every clip feels intentional, not like a rushed export.',
  },
  {
    icon: '📐',
    title: 'Platform Formatting',
    desc: 'Each clip is reformatted for every platform — 9:16 for TikTok and Reels, optimised thumbnails for Shorts, with platform-specific hooks and CTAs.',
  },
  {
    icon: '🚀',
    title: 'Volume at Speed',
    desc: '30+ clips per month, delivered on a consistent schedule. More content means more at-bats, and more at-bats means more viral moments.',
  },
  {
    icon: '📊',
    title: 'Performance Feedback',
    desc: 'We track which clips perform and feed that data back into the editing process — doubling down on the formats, hooks, and topics that drive views.',
  },
]

const PLATFORMS = [
  { name: 'TikTok', desc: 'Hook-driven clips built for FYP discovery and viral reach' },
  { name: 'Instagram Reels', desc: 'Polished short-form for brand building and Explore page growth' },
  { name: 'YouTube Shorts', desc: 'Evergreen short-form with strong search and shelf-life potential' },
]

const PROCESS = [
  { n: '01', t: 'Send us your footage', b: 'Drop your long-form content — podcast episodes, stream VODs, interview recordings, or raw footage. We handle everything from there.' },
  { n: '02', t: 'We identify the moments', b: 'Our team watches your content and pulls the highest-retention, most shareable clips — the moments people would watch twice.' },
  { n: '03', t: 'Edit, caption, and format', b: 'Every clip is edited with captions, branded overlays, and formatted for each platform. You get polished, ready-to-post content.' },
  { n: '04', t: 'Deliver and optimise', b: 'Clips land in your inbox on a regular schedule. We review performance monthly and refine our selection process to maximise views.' },
]

export default function Clipping() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <Link to="/how-it-works" style={{ color: 'var(--g)', opacity: .7 }}>How It Works</Link>
          &nbsp;/&nbsp;Video Clipping
        </div>
        <h1>Video<br /><em>Clipping.</em></h1>
        <p>We turn your long-form content into 30+ high-retention short-form clips per month — captioned, formatted, and ready to post across TikTok, Reels, and Shorts.</p>
      </div>

      {/* SERVICES GRID */}
      <div className="section">
        <div className="section-eyebrow fade-up">What's Included</div>
        <h2 className="section-h2 fade-up">From raw footage<br /><em>to viral clips.</em></h2>
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
          <h2 className="section-h2 fade-up">One piece of content.<br /><em>Three platforms.</em></h2>
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
        <h2 className="section-h2 fade-up">Send footage.<br /><em>Get clips.</em></h2>
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
              Clipping fills your social feeds with consistent content.
              Creator campaigns amplify your brand across 80,000+ accounts simultaneously.
              Together, they create a flywheel — organic content builds authority while campaigns
              flood your niche with views, driving traffic straight back to your profiles.
            </p>
            <Link to="/how-it-works/creator-campaign" className="btn-primary" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
              See creator campaigns →
            </Link>
          </div>
          <div className="smm-combo-right">
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">30+</div>
              <div className="smm-combo-stat-l">Clips delivered every month, ready to post</div>
            </div>
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">3×</div>
              <div className="smm-combo-stat-l">Platforms covered from a single piece of footage</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to turn your content<br /><em>into clips that perform?</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll show you exactly how we'd approach your content and what kind of volume to expect.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get in touch →
            </a>
            <span className="cta-note">No commitment · 30+ clips per month</span>
          </div>
        </div>
      </div>
    </>
  )
}
