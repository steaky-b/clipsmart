import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LINKS = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/calculator', label: 'ROI Calculator' },
  { to: '/creators', label: 'Creators' },
  { to: '/active-campaigns', label: 'Active Campaigns' },
  { to: '/case-studies', label: 'Past Campaigns' },
  { to: '/work-with-us', label: 'Work With Us' },
]

const MOBILE_BREAKPOINT = 900

function getViewportWidth() {
  if (typeof window === 'undefined') return MOBILE_BREAKPOINT + 1
  return (window.visualViewport ? window.visualViewport.width : window.innerWidth)
}

/* ── User chip shown when logged in ── */
function UserChip({ user, profile, signOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const displayName = profile?.username || user.email?.split('@')[0] || 'User'
  const initial = displayName[0].toUpperCase()

  return (
    <div className="nav-user-wrap" ref={ref}>
      <button className="nav-user-btn" onClick={() => setOpen(!open)}>
        <span className="nav-user-avatar">{initial}</span>
        <span className="nav-user-name">{displayName}</span>
        <span className="nav-user-chevron">▾</span>
      </button>
      {open && (
        <div className="nav-user-menu">
          <Link
            to="/active-campaigns"
            className="nav-user-item"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <div className="nav-user-divider" />
          <button
            className="nav-user-item nav-user-signout"
            onClick={() => { signOut(); setOpen(false) }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => getViewportWidth() <= MOBILE_BREAKPOINT)
  const { pathname } = useLocation()
  const { user, profile, signOut } = useAuth()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const update = () => setIsMobile(getViewportWidth() <= MOBILE_BREAKPOINT)
    const vv = window.visualViewport
    if (vv) vv.addEventListener('resize', update)
    window.addEventListener('resize', update)
    return () => {
      if (vv) vv.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => { if (!isMobile) setOpen(false) }, [isMobile])

  return (
    <>
      <nav className="nav" data-mob={isMobile ? 'true' : undefined}>
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="ClipSmart" className="nav-logo-img" />
          ClipSmart
        </Link>

        <div className="nav-links">
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </div>

        <button
          className={'mob-menu-btn' + (open ? ' open' : '')}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>

        {/* Auth button — replaces Book a Call */}
        {user ? (
          <UserChip user={user} profile={profile} signOut={signOut} />
        ) : (
          <Link to="/active-campaigns" className="nav-signin">
            Sign In →
          </Link>
        )}
      </nav>

      <div className={'mob-drawer' + (open ? ' open' : '')}>
        <NavLink to="/" end onClick={() => setOpen(false)} className={({ isActive }) => isActive ? 'mob-active' : ''}>Home</NavLink>
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) => isActive ? 'mob-active' : ''}
          >
            {label}
          </NavLink>
        ))}
        {user ? (
          <button
            className="mob-book"
            style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
            onClick={() => { signOut(); setOpen(false) }}
          >
            Sign Out ({profile?.username || user.email?.split('@')[0]})
          </button>
        ) : (
          <Link
            to="/active-campaigns"
            className="mob-book"
            onClick={() => setOpen(false)}
          >
            Sign In →
          </Link>
        )}
      </div>
    </>
  )
}
