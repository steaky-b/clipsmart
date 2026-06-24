import { Link } from 'react-router-dom'

export default function Footer() {
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
              <Link to="/case-studies">Past Campaigns</Link>
              <Link to="/work-with-us">Work With Us</Link>
              <a href="/dashboard/">Client Dashboard</a>
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
        </div>
      </div>
    </footer>
  )
}
