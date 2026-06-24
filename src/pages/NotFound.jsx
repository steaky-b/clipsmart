import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="nf-wrap">
      <div className="nf-inner">
        <div className="nf-code">404</div>
        <h1 className="nf-h">Page not found.</h1>
        <p className="nf-p">The page you're looking for doesn't exist or has been moved.</p>
        <div className="nf-actions">
          <Link to="/" className="btn-primary">Back to home →</Link>
          <Link to="/case-studies" className="btn-ghost">View past campaigns</Link>
        </div>
      </div>
    </div>
  )
}
