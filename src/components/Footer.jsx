import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">
          <div className="nav-logo-mark">+</div>
          clip smart
        </Link>

        <nav className="footer-links">
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/brands">Brands</Link>
          <Link to="/creators">Creators</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/work-with-us">Work With Us</Link>
        </nav>

        <p className="footer-copy">© {new Date().getFullYear()} ClipSmart. All rights reserved.</p>
      </div>
    </footer>
  )
}
