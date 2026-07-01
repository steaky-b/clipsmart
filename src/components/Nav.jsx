import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

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
  // visualViewport.width returns the PHYSICAL screen width in CSS px, independent
  // of any browser zoom level. Falls back to innerWidth for older browsers.
  if (typeof window === 'undefined') return MOBILE_BREAKPOINT + 1
  return (window.visualViewport ? window.visualViewport.width : window.innerWidth)
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => getViewportWidth() <= MOBILE_BREAKPOINT)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const update = () => setIsMobile(getViewportWidth() <= MOBILE_BREAKPOINT)
    // Listen to both visual-viewport resize (mobile pinch-zoom) and window resize
    const vv = window.visualViewport
    if (vv) vv.addEventListener('resize', update)
    window.addEventListener('resize', update)
    return () => {
      if (vv) vv.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Close drawer when switching to desktop
  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  return (
    <>
      {/* data-mob attribute is the JS fallback: it forces the CSS media-query
          behaviour even if the browser zoom level has widened the layout viewport */}
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

        <a
          href="https://calendly.com/esaanwar/partner-with-clipsmart"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
        >
          Book a Call →
        </a>
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
        <a
          href="https://calendly.com/esaanwar/partner-with-clipsmart"
          target="_blank"
          rel="noopener noreferrer"
          className="mob-book"
          onClick={() => setOpen(false)}
        >
          Book a free call →
        </a>
      </div>
    </>
  )
}
