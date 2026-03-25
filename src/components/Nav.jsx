import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/creators', label: 'Creators' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/work-with-us', label: 'Work With Us' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="ClipSmart" className="nav-logo-img" />
          clip smart
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
