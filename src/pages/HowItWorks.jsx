import { Link } from 'react-router-dom'
import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <div className="hiw-viewport hiw-viewport--scroll">
      <div className="hiw-title-block">
        <div className="section-eyebrow hiw-eyebrow">How It Works</div>
        <h1 className="hiw-h1">Awareness<br /><em>leads to sales.</em></h1>
        <p className="hiw-sub">Choose your path — performance-based UGC campaigns or managed video clipping.</p>
      </div>

      <div className="hiw-hub-inner hiw-hub-inner--two">
        <Link to="/how-it-works/ugc" className="hiw-hub-card">
          <div className="hiw-hub-tag">Content Creation</div>
          <h2 className="hiw-hub-h">UGC<br />Campaign</h2>
          <p className="hiw-hub-p">
            We source and brief vetted creators to produce high-converting UGC ads — raw,
            authentic content built for paid social that actually stops the scroll.
          </p>
          <div className="hiw-hub-stats">
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">Fast</div>
              <div className="hiw-hub-stat-l">7-day turnaround</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">100%</div>
              <div className="hiw-hub-stat-l">Usage rights</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">Ad-ready</div>
              <div className="hiw-hub-stat-l">Delivered edited</div>
            </div>
          </div>
          <div className="hiw-hub-cta">Explore this service →</div>
        </Link>

        <Link to="/how-it-works/clipping" className="hiw-hub-card">
          <div className="hiw-hub-tag">Performance Clips</div>
          <h2 className="hiw-hub-h">Clipping<br />Campaign</h2>
          <p className="hiw-hub-p">
            We clip, caption, and repurpose your long-form content into high-retention short-form
            videos optimised for TikTok, Reels, and YouTube Shorts.
          </p>
          <div className="hiw-hub-stats">
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">30+</div>
              <div className="hiw-hub-stat-l">Clips per month</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">3</div>
              <div className="hiw-hub-stat-l">Platforms</div>
            </div>
            <div className="hiw-hub-stat">
              <div className="hiw-hub-stat-v">Done</div>
              <div className="hiw-hub-stat-l">For you</div>
            </div>
          </div>
          <div className="hiw-hub-cta">Explore this service →</div>
        </Link>
      </div>
    </div>
  )
}
