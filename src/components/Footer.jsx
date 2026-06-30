import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Footer() {
  const { theme, toggle } = useTheme()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <img src="/logo.png" alt="ClipSmart" className="nav-logo-img" />
              ClipSmart
            </Link>
            <p>Performance UGC campaigns that pay for themselves. You only pay when your content performs.</p>
          </div>

          <div>
            <div className="footer-col-h">Services</div>
            <nav className="footer-links">
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/how-it-works/creator-campaign">Creator Campaigns</Link>
              <Link to="/how-it-works/social-media">Social Media Management</Link>
              <Link to="/calculator">ROI Calculator</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-h">Company</div>
            <nav className="footer-links">
              <Link to="/creators">Creator Network</Link>
              <Link to="/active-campaigns">Active Campaigns</Link>
              <a href="/dashboard/">Client Dashboard</a>
              <Link to="/case-studies">Past Campaigns</Link>
              <Link to="/work-with-us">Work With Us</Link>
            </nav>
          </div>

          <div>
            <div className="footer-col-h">Get Started</div>
            <nav className="footer-links">
              <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer">Book a Free Call</a>
              <a href="mailto:contact@clipsmart.co.uk">contact@clipsmart.co.uk</a>
            </nav>
          </div>

          <div>
            <div className="footer-col-h">Follow Us</div>
            <nav className="footer-links">
              <a href="https://www.tiktok.com/@clipsmart" target="_blank" rel="noopener noreferrer">TikTok</a>
              <a href="https://www.instagram.com/clipsmart" target="_blank" rel="noopener noreferrer">Instagram</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ClipSmart. All rights reserved.</span>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <button className="theme-toggle" onClick={toggle} aria-label="Toggle colour theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>
    </footer>
  )
}
