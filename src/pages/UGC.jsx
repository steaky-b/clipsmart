import { Link } from 'react-router-dom'
import './SocialMediaManagement.css'

const SERVICES = [
  {
    icon: '🎬',
    title: 'Creator Sourcing',
    desc: 'We hand-pick vetted creators from our network who match your brand — the right look, voice, and audience to make your product feel native, not forced.',
  },
  {
    icon: '📝',
    title: 'Brief & Script Writing',
    desc: 'Our team writes conversion-focused briefs and optional scripts so every piece of content hits your key messaging and hooks viewers in the first two seconds.',
  },
  {
    icon: '✂️',
    title: 'Editing & Post-Production',
    desc: 'Raw creator footage is edited by our in-house team — captions, colour grade, music, and platform-specific aspect ratios all handled before delivery.',
  },
  {
    icon: '⚡',
    title: 'Fast Turnaround',
    desc: 'From brief to final deliverable in 7 days. No back-and-forth delays, no chasing creators — we own the production pipeline start to finish.',
  },
  {
    icon: '📦',
    title: 'Unlimited Usage Rights',
    desc: 'Every piece of UGC is delivered with full whitelisting rights. Run it as a paid ad, organic post, or website asset — no licensing restrictions.',
  },
  {
    icon: '🔄',
    title: 'Revision Rounds',
    desc: 'Not quite right? We include revision rounds on every deliverable so you always end up with content you're proud to put spend behind.',
  },
]

const FORMATS = [
  { name: 'Testimonials', desc: 'Real creators sharing authentic product experiences that build trust fast' },
  { name: 'Unboxings', desc: 'First-reaction footage that drives curiosity and purchase intent' },
  { name: 'Tutorials', desc: 'How-to content that shows off product value and reduces buyer hesitation' },
]

const PROCESS = [
  { n: '01', t: 'Strategy & brief', b: 'We learn your product, target audience, and goals. Then we write a creator brief designed to generate high-converting content.' },
  { n: '02', t: 'Creator matching', b: 'We select creators from our vetted network who genuinely fit your brand. You review and approve the lineup before filming begins.' },
  { n: '03', t: 'Filming & production', b: 'Creators film to brief. Our editors handle post-production — captions, cuts, music, and format optimisation for each platform.' },
  { n: '04', t: 'Deliver & iterate', b: 'Final content lands in your hands with full usage rights. We analyse performance and optimise briefs for the next batch.' },
]

export default function UGC() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <Link to="/how-it-works" style={{ color: 'var(--g)', opacity: .7 }}>How It Works</Link>
          &nbsp;/&nbsp;UGC Production
        </div>
        <h1>UGC<br /><em>Production.</em></h1>
        <p>Authentic, ad-ready user-generated content from vetted creators — briefed, filmed, edited, and delivered with full usage rights in 7 days.</p>
      </div>

      {/* SERVICES GRID */}
      <div className="section">
        <div className="section-eyebrow fade-up">What's Included</div>
        <h2 className="section-h2 fade-up">Everything from brief<br /><em>to final cut.</em></h2>
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

      {/* FORMATS */}
      <div className="smm-platforms-section">
        <div className="section">
          <div className="section-eyebrow fade-up">Content Formats</div>
          <h2 className="section-h2 fade-up">Content that converts<br /><em>across every format.</em></h2>
          <div className="smm-platforms">
            {FORMATS.map(({ name, desc }) => (
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
        <h2 className="section-h2 fade-up">Brief to deliverable<br /><em>in 7 days.</em></h2>
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
              UGC gives you the ad creative. Creator campaigns give you the distribution.
              Use both together and your brand gets authentic content produced at scale,
              then amplified across 80,000+ creator accounts — for a fraction of traditional ad spend.
            </p>
            <Link to="/how-it-works/creator-campaign" className="btn-primary" style={{ marginTop: '8px', alignSelf: 'flex-start' }}>
              See creator campaigns →
            </Link>
          </div>
          <div className="smm-combo-right">
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">7 days</div>
              <div className="smm-combo-stat-l">Average turnaround from brief to final deliverable</div>
            </div>
            <div className="smm-combo-stat">
              <div className="smm-combo-stat-v">100%</div>
              <div className="smm-combo-stat-l">Usage rights included — run it anywhere</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Ready to get UGC that<br /><em>actually converts?</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll walk you through exactly how we'd source and brief creators for your brand.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get in touch →
            </a>
            <span className="cta-note">No commitment · Full usage rights guaranteed</span>
          </div>
        </div>
      </div>
    </>
  )
}
