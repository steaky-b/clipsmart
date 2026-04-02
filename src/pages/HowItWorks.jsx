import { Link } from 'react-router-dom'
import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="hiw-viewport">
      <div className="hiw-title-block">
        <div className="section-eyebrow hiw-eyebrow">How It Works</div>
        <h1 className="hiw-h1">Awareness<br /><em>leads to sales.</em></h1>
        <p className="hiw-sub">Choose your path — performance-based creator campaigns or managed social media growth.</p>
      </div>

      <div className="hiw-hub-inner">
        <Link to="/how-it-works/creator-campaign" className="hiw-hub-card">
          <div className="hiw-hub-tag">Campaign Growth</div>
          <h2 className="hiw-hub-h">Creator Campaign<br />Growth</h2>
          <p className="hiw-hub-p">
            80,000+ creators post about your brand on TikTok, Instagram, and YouTube.
            You only pay when content performs — 1M+ views guaranteed per $1,000.
          </p>
          <div className="hiw-hub-stats">
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">1M+</div>
              <div className="hiw-hub-stat-l">Views per $1,000</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">48hrs</div>
              <div className="hiw-hub-stat-l">Campaign live</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">$0</div>
              <div className="hiw-hub-stat-l">Upfront fees</div>
            </div>
          </div>
          <div className="hiw-hub-cta">Get the full breakdown →</div>
        </Link>

        <Link to="/how-it-works/social-media" className="hiw-hub-card">
          <div className="hiw-hub-tag">Profile Growth</div>
          <h2 className="hiw-hub-h">Social Media<br />Management</h2>
          <p className="hiw-hub-p">
            We manage and grow your brand's social media presence — content strategy,
            posting, audience building, and creator-powered amplification, all handled for you.
          </p>
          <div className="hiw-hub-stats">
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">100%</div>
              <div className="hiw-hub-stat-l">Managed for you</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">3+</div>
              <div className="hiw-hub-stat-l">Platforms covered</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">Real</div>
              <div className="hiw-hub-stat-l">Organic growth</div>
            </div>
          </div>
          <div className="hiw-hub-cta">Explore this service →</div>
        </Link>
      </div>
    </div>
  )
}
