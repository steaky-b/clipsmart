import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthModal from '../components/AuthModal'
import { supabase, isSupabaseReady } from '../lib/supabase'
import {
  ACTIVE_CAMPAIGNS,
  computeSnapshot,
  formatViews,
  formatMoney,
} from '../data/activeCampaigns'
import { PAST_CAMPAIGNS } from '../data/pastCampaigns'

// Augment past campaigns with the fields CampaignsView needs
const PAST_AS_ACTIVE = PAST_CAMPAIGNS.map((p) => ({
  slug:            p.id,
  name:            p.name,
  cat:             p.cat,
  catLabel:        p.catLabel,
  subtitle:        p.subtitle,
  img:             p.img,
  gradient:        p.gradient,
  clientRpm:       1.00,
  budgetTotal:     2500,
  viewsGuaranteed: 2000000,
  baseViews:       0,
  basePosts:       0,
  baseCreators:    0,
  anchorISO:       '2025-06-01T00:00:00Z',
  platformSplit:   { TikTok: 60, Instagram: 30, YouTube: 10 },
  isPast:          true,
}))

const ALL_CAMPAIGNS = [...ACTIVE_CAMPAIGNS, ...PAST_AS_ACTIVE]
import './Dashboard.css'

/* ─────────────────────────────────────────────
   DEMO DATA
───────────────────────────────────────────── */
const DEMO_JOINED = [
  { campaignSlug: 'murdadale',     joinedDate: 'Jun 22, 2026', status: 'Active', postsSubmitted: 3, acceptedPosts: 3, earnings: 48.50 },
  { campaignSlug: 'based-bodyworks', joinedDate: 'Jun 25, 2026', status: 'Active', postsSubmitted: 1, acceptedPosts: 1, earnings: 12.40 },
]

const DEMO_WALLET = {
  available: 142.30, totalEarned: 218.50, pendingEarnings: 76.20,
  transactions: [
    { id: 1, campaign: 'NHC Murda',          date: 'Jun 28', views: 48500, amount: 48.50, status: 'paid'    },
    { id: 2, campaign: 'Based Bodyworks',     date: 'Jun 27', views: 12400, amount: 12.40, status: 'paid'    },
    { id: 3, campaign: 'NHC Murda',          date: 'Jun 26', views: 34200, amount: 34.20, status: 'pending' },
    { id: 4, campaign: 'Growing Up Italian',  date: 'Jun 25', views: 78600, amount: 78.60, status: 'paid'    },
    { id: 5, campaign: 'Based Bodyworks',     date: 'Jun 24', views: 45000, amount: 45.00, status: 'pending' },
  ],
}

const DEMO_SUBMISSIONS = [
  { id: 1, campaign: 'NHC Murda',          platform: 'TikTok',    date: 'Jun 28', status: 'accepted', views: 48500 },
  { id: 2, campaign: 'NHC Murda',          platform: 'TikTok',    date: 'Jun 27', status: 'accepted', views: 34200 },
  { id: 3, campaign: 'Based Bodyworks',     platform: 'Instagram', date: 'Jun 26', status: 'accepted', views: 12400 },
  { id: 4, campaign: 'NHC Murda',          platform: 'TikTok',    date: 'Jun 25', status: 'denied',   views: 0     },
  { id: 5, campaign: 'Growing Up Italian',  platform: 'TikTok',    date: 'Jun 24', status: 'accepted', views: 78600 },
  { id: 6, campaign: 'Based Bodyworks',     platform: 'TikTok',    date: 'Jun 22', status: 'pending',  views: 0     },
]

/* ─────────────────────────────────────────────
   CATEGORY GRADIENTS  (vibrant, for card banners)
───────────────────────────────────────────── */
const CAT_BANNER = {
  music:    'linear-gradient(135deg, #14084a 0%, #3d1899 100%)',
  health:   'linear-gradient(135deg, #041a0c 0%, #0b5230 100%)',
  podcast:  'linear-gradient(135deg, #201203 0%, #5c370b 100%)',
  ugc:      'linear-gradient(135deg, #041525 0%, #0a3d7c 100%)',
  clipping: 'linear-gradient(135deg, #1f0a03 0%, #5c250b 100%)',
  gaming:   'linear-gradient(135deg, #1a0330 0%, #4a0868 100%)',
}

/* ─────────────────────────────────────────────
   ICON FACTORY
───────────────────────────────────────────── */
function Ic({ c, size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {c}
    </svg>
  )
}

const IcHome     = (p) => <Ic {...p} c={<><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>} />
const IcArrowLeft = (p) => <Ic {...p} c={<><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></>} />
const IcJoined  = (p) => <Ic {...p} c={<><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></>} />
const IcWallet  = (p) => <Ic {...p} c={<><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>} />
const IcClips   = (p) => <Ic {...p} c={<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></>} />
const IcZap     = (p) => <Ic {...p} c={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />
const IcSupport = (p) => <Ic {...p} c={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>} />
const IcUpload  = (p) => <Ic {...p} c={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>} />
const IcSearch  = (p) => <Ic {...p} c={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>} />
const IcChevron = (p) => <Ic {...p} c={<polyline points="6 9 12 15 18 9"/>} />
const IcClose   = (p) => <Ic {...p} c={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>} />
const IcSignout = (p) => <Ic {...p} c={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>} />
const IcLink    = (p) => <Ic {...p} c={<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>} />
const IcCheck   = (p) => <Ic {...p} c={<polyline points="20 6 9 17 4 12"/>} />
const IcFilter    = (p) => <Ic {...p} c={<><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></>} />
const IcSortAz    = (p) => <Ic {...p} c={<><path d="M11 5h9M11 9h7M11 13h5"/><polyline points="3 8 6 5 9 8"/><line x1="6" y1="5" x2="6" y2="19"/></>} />
const IcArrowRight = (p) => <Ic {...p} c={<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>} />

function IcDiscord({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
    </svg>
  )
}
function IcInstagram({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
function IcTikTok({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.18 8.18 0 0 0 4.79 1.53V6.75a4.85 4.85 0 0 1-1.02-.06z"/>
    </svg>
  )
}
function IcYouTube({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}
function IcXSocial({ size = 16, ...p }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function PlatformIcons({ platformSplit, size = 13 }) {
  const platforms = Object.entries(platformSplit || {})
    .filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 4)
  return (
    <div className="db-platform-icons">
      {platforms.map(([name]) => {
        const ic = { key: name, size }
        if (name === 'TikTok')    return <IcTikTok    {...ic} />
        if (name === 'Instagram') return <IcInstagram {...ic} />
        if (name === 'YouTube')   return <IcYouTube   {...ic} />
        if (name === 'X')         return <IcXSocial   {...ic} />
        return null
      })}
    </div>
  )
}

const CAT_COLORS = {
  music:    { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.3)' },
  health:   { color: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.3)'  },
  podcast:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)'  },
  ugc:      { color: '#38bdf8', bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.3)'  },
  clipping: { color: '#fb923c', bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.3)'  },
  gaming:   { color: '#f472b6', bg: 'rgba(244,114,182,0.12)', border: 'rgba(244,114,182,0.3)' },
  crypto:   { color: '#22d3ee', bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.3)'  },
}
function CatBadge({ cat, label }) {
  const s = CAT_COLORS[cat] || { color: '#888', bg: 'rgba(136,136,136,0.12)', border: 'rgba(136,136,136,0.3)' }
  return <span className="db-cat-badge" style={{ color: s.color, background: s.bg, borderColor: s.border }}>{label}</span>
}

function SignInPrompt({ onSignIn, message }) {
  return (
    <div className="db-signin-card">
      <div className="db-signin-card-icon">🔒</div>
      <h3 className="db-signin-card-h">Sign in to continue</h3>
      <p className="db-signin-card-p">{message}</p>
      <button className="db-signin-card-btn" onClick={onSignIn}>Sign in / Create account</button>
    </div>
  )
}

function DemoBanner({ onSignIn }) {
  return (
    <div className="db-demo-banner">
      <div className="db-demo-banner-left">
        <span className="db-demo-pill">DEMO</span>
        <span className="db-demo-text">Sample data — sign in to see your real activity.</span>
      </div>
      <button className="db-demo-signin-btn" onClick={onSignIn}>Sign in →</button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   USER AVATAR DROPDOWN (top-right of main area)
═══════════════════════════════════════════════════════ */
function UserAvatarDropdown({ user, profile, signOut }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function outside(e) { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  const name    = profile?.username || user.email?.split('@')[0] || 'User'
  const initial = name[0].toUpperCase()
  const avatar  = profile?.avatar_url || null

  return (
    <div className="db-av-wrap" ref={wrapRef}>
      <button className="db-av-btn" onClick={() => setOpen((o) => !o)} aria-label="Profile menu">
        {avatar
          ? <img src={avatar} alt={name} className="db-av-img" />
          : <span className="db-av-circle">{initial}</span>
        }
      </button>
      {open && (
        <div className="db-av-menu">
          <div className="db-av-menu-head">
            <span className="db-av-menu-init">{initial}</span>
            <div>
              <div className="db-av-menu-name">{name}</div>
              <div className="db-av-menu-email">{user.email}</div>
            </div>
          </div>
          <div className="db-av-divider" />
          <button className="db-av-item" onClick={() => setOpen(false)}>My Profile</button>
          <button className="db-av-item" onClick={() => setOpen(false)}>Account Settings</button>
          <button className="db-av-item" onClick={() => setOpen(false)}>Connected Accounts</button>
          <div className="db-av-divider" />
          <button className="db-av-item db-av-item--danger" onClick={() => { signOut(); setOpen(false) }}>Log Out</button>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   HERO ANALYTICS WIDGET (right side of hero banner)
═══════════════════════════════════════════════════════ */
const HA_BARS = [22, 35, 48, 30, 55, 42, 68, 85]

function HeroAnalytics() {
  return (
    <div className="db-ha">
      <div className="db-ha-float db-ha-float--tl">+$48.50 earned</div>
      <div className="db-ha-float db-ha-float--br">3.85M views</div>
      <div className="db-ha-card">
        <div className="db-ha-head">
          <span className="db-ha-title">Clip Performance</span>
          <span className="db-ha-growth">+34% ↑</span>
        </div>
        <div className="db-ha-chart">
          {HA_BARS.map((h, i) => (
            <div key={i} className="db-ha-col">
              <div className="db-ha-bar" style={{ height: `${h}%` }} />
            </div>
          ))}
        </div>
        <div className="db-ha-total">Week total: <strong>$60.70</strong></div>
        <div className="db-ha-platforms">
          <div className="db-ha-pltf">
            <div className="db-ha-pltf-bar" style={{ width: '78%', background: '#2ECC71' }} />
            <span>TikTok 78%</span>
          </div>
          <div className="db-ha-pltf">
            <div className="db-ha-pltf-bar" style={{ width: '16%', background: '#e1306c' }} />
            <span>Instagram 16%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   EXPLORE CAMPAIGNS VIEW
═══════════════════════════════════════════════════════ */
const PLATFORM_TABS = [
  { id: 'all',       label: 'All platforms' },
  { id: 'Instagram', Icon: IcInstagram      },
  { id: 'TikTok',    Icon: IcTikTok         },
  { id: 'YouTube',   Icon: IcYouTube        },
  { id: 'X',         Icon: IcXSocial        },
]
const SORT_OPTIONS = [
  { id: 'cpm',    label: 'Highest CPM'    },
  { id: 'views',  label: 'Most Views'     },
  { id: 'budget', label: 'Largest Budget' },
]
const HOW_STEPS = [
  { n: '01', icon: '🎯', t: 'Pick a Campaign', d: 'Browse active campaigns and choose one that fits your content style and audience.' },
  { n: '02', icon: '📱', t: 'Post Your Clip',  d: 'Create and post your video, then submit the URL to us via the Submit Clip button.' },
  { n: '03', icon: '💰', t: 'Earn Per View',   d: 'Get paid for every 1,000 views your accepted clips generate. Fully transparent.' },
]

const CAT_LABELS = ['all', 'music', 'health', 'podcast', 'ugc', 'clipping', 'gaming']
const CAT_DISPLAY = { all: 'All', music: 'Music', health: 'Health', podcast: 'Podcast', ugc: 'UGC', clipping: 'Clipping', gaming: 'Gaming', crypto: 'Crypto' }

function CampaignsView({ onApply }) {
  const [snapshots, setSnapshots] = useState(() =>
    ALL_CAMPAIGNS.map((c) => ({ campaign: c, snap: computeSnapshot(c, Date.now()) }))
  )
  const [viewAll, setViewAll]   = useState(false)
  const [isMob, setIsMob]       = useState(() => getVW() <= DB_MOBILE_BP)
  const carouselRef             = useRef(null)

  useEffect(() => {
    const upd = () => setIsMob(getVW() <= DB_MOBILE_BP)
    window.addEventListener('resize', upd)
    const vv = window.visualViewport
    if (vv) vv.addEventListener('resize', upd)
    return () => { window.removeEventListener('resize', upd); if (vv) vv.removeEventListener('resize', upd) }
  }, [])

  function scrollCarousel(dir) {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: dir * carouselRef.current.offsetWidth * 0.85, behavior: 'smooth' })
  }
  const [search,       setSearch]       = useState('')
  const [platform,     setPlatform]     = useState('all')
  const [sort,         setSort]         = useState('cpm')
  const [catFilter,    setCatFilter]    = useState('all')
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [showCatMenu,  setShowCatMenu]  = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setSnapshots(ALL_CAMPAIGNS.map((c) => ({ campaign: c, snap: computeSnapshot(c, Date.now()) })))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  let filtered = snapshots.filter(({ campaign: c }) => {
    const q = search.trim().toLowerCase()
    if (q && !c.name.toLowerCase().includes(q) && !c.catLabel.toLowerCase().includes(q)) return false
    if (platform !== 'all' && !(c.platformSplit || {})[platform]) return false
    if (catFilter !== 'all' && c.cat !== catFilter) return false
    return true
  })
  if (sort === 'cpm')    filtered = [...filtered].sort((a, b) => b.campaign.clientRpm - a.campaign.clientRpm)
  if (sort === 'views')  filtered = [...filtered].sort((a, b) => b.snap.views - a.snap.views)
  if (sort === 'budget') filtered = [...filtered].sort((a, b) => b.campaign.budgetTotal - a.campaign.budgetTotal)

  return (
    <div className="db-view db-explore">
      {/* ── TITLE ROW ── */}
      <div className="db-explore-title-row">
        <div className="db-explore-title-left">
          <h1 className="db-explore-h">Active Campaigns</h1>
          <div className="db-explore-live-pill">
            <span className="db-live-dot-sm" />
            {ALL_CAMPAIGNS.length} Campaigns
          </div>
        </div>
        {isMob && (
          <button className="db-view-all-btn" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? '← Carousel' : 'View All →'}
          </button>
        )}
      </div>

      {/* ── CONTROLS ROW (search + dropdowns) ── */}
      <div className="db-controls-bar">
        <label className="db-search-wrap">
          <IcSearch size={14} />
          <input
            className="db-search"
            placeholder="Search for a campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {/* Campaign type dropdown */}
        <div className="db-ctrl-dd" style={{ position: 'relative' }}>
          <button className="db-ctrl-btn" onClick={() => { setShowCatMenu(!showCatMenu); setShowSortMenu(false) }}>
            <IcFilter size={13} />
            <span className="db-ctrl-text">Type: </span><strong>{CAT_DISPLAY[catFilter]}</strong>
            <IcChevron size={12} />
          </button>
          {showCatMenu && (
            <div className="db-sort-menu">
              {CAT_LABELS.map((id) => (
                <button key={id} className={'db-sort-item' + (catFilter === id ? ' active' : '')}
                  onClick={() => { setCatFilter(id); setShowCatMenu(false) }}>{CAT_DISPLAY[id]}</button>
              ))}
            </div>
          )}
        </div>
        {/* Sort dropdown */}
        <div className="db-ctrl-dd" style={{ position: 'relative' }}>
          <button className="db-ctrl-btn" onClick={() => { setShowSortMenu(!showSortMenu); setShowCatMenu(false) }}>
            <IcSortAz size={13} />
            <span className="db-ctrl-text">Sort: </span><strong className="db-ctrl-sort-val">{SORT_OPTIONS.find((o) => o.id === sort)?.label}</strong>
            <IcChevron size={12} />
          </button>
          {showSortMenu && (
            <div className="db-sort-menu">
              {SORT_OPTIONS.map((o) => (
                <button key={o.id} className={'db-sort-item' + (sort === o.id ? ' active' : '')}
                  onClick={() => { setSort(o.id); setShowSortMenu(false) }}>{o.label}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── PLATFORM TABS ── */}
      <div className="db-platform-tabs">
        {PLATFORM_TABS.map(({ id, label, Icon }) => (
          <button key={id} className={'db-platform-tab' + (platform === id ? ' active' : '')} onClick={() => setPlatform(id)}>
            {Icon ? <><Icon size={14} /><span className="db-ptab-txt">{id}</span></> : label}
          </button>
        ))}
      </div>

      {/* ── SHOWING COUNT ── */}
      <p className="db-showing-count">Showing {filtered.length} of {ALL_CAMPAIGNS.length} campaigns</p>

      {/* ── CAROUSEL ARROWS (mobile only, non-viewAll) ── */}
      {isMob && !viewAll && filtered.length > 0 && (
        <div className="db-carousel-arrows">
          <button className="db-carousel-arrow" onClick={() => scrollCarousel(-1)} aria-label="Previous">
            <IcArrowLeft size={15} />
          </button>
          <button className="db-carousel-arrow" onClick={() => scrollCarousel(1)} aria-label="Next">
            <IcArrowRight size={15} />
          </button>
        </div>
      )}

      {/* ── CAMPAIGN GRID / CAROUSEL ── */}
      {filtered.length === 0 ? (
        <div className="db-empty"><div className="db-empty-icon">🔍</div><h3>No campaigns match</h3><p>Try adjusting your search or filters.</p></div>
      ) : (
        <div className={`db-compact-grid${isMob && !viewAll ? ' db-compact-carousel' : ''}`} ref={carouselRef}>
          {filtered.map(({ campaign: c, snap }) => {
            const activePct = Math.min(100, Math.round((snap.budgetSpent / c.budgetTotal) * 100))
            const cs = CAT_COLORS[c.cat] || { color: '#888', bg: 'rgba(136,136,136,0.12)', border: 'rgba(136,136,136,0.3)' }
            const cardGrad = `linear-gradient(135deg, ${cs.color}1a 0%, var(--s1) 55%)`
            return (
              <div key={c.slug} className="db-compact-card" style={{ background: cardGrad }}>
                {/* Top row: category badge + platform icons */}
                <div className="db-ccard-top">
                  <CatBadge cat={c.cat} label={c.catLabel.toUpperCase()} />
                  <PlatformIcons platformSplit={c.platformSplit} size={12} />
                </div>

                {/* Campaign logo + name */}
                <div className="db-ccard-ident">
                  <div className="db-ccard-icon" style={c.img
                    ? { padding: 0, overflow: 'hidden', border: `1px solid ${cs.border}` }
                    : { background: cs.bg, border: `1px solid ${cs.border}` }
                  }>
                    {c.img ? (
                      <img src={c.img} alt={c.name} className="db-ccard-icon-img" />
                    ) : (
                      <span className="db-ccard-icon-letter" style={{ color: cs.color }}>
                        {c.name[0]}
                      </span>
                    )}
                  </div>
                  <div className="db-ccard-name-wrap">
                    <div className="db-compact-name">{c.name}</div>
                    <div className="db-ccard-cat-lbl" style={{ color: cs.color }}>{c.catLabel.toUpperCase()}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="db-ccard-desc">{c.subtitle}</p>

                {/* Progress */}
                <div className="db-ccard-progress-lbl">
                  <span>Progress</span>
                  <span style={{ color: cs.color, fontWeight: 700 }}>{activePct}%</span>
                </div>
                <div className="db-progress">
                  <div className="db-progress-bar" style={{ width: `${activePct}%`, background: cs.color }} />
                </div>

                {/* Stats row */}
                <div className="db-ccard-stats">
                  <div className="db-ccard-stat">
                    <div className="db-ccard-stat-v">{formatMoney(c.budgetTotal)}</div>
                    <div className="db-ccard-stat-l">Total Budget</div>
                  </div>
                  <div className="db-ccard-stat">
                    <div className="db-ccard-stat-v">${c.clientRpm.toFixed(2)}</div>
                    <div className="db-ccard-stat-l">Per 1k Views</div>
                  </div>
                </div>

                <button className="db-apply-btn" onClick={() => onApply(c)}>
                  Apply to campaign →
                </button>
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   JOINED CAMPAIGNS VIEW
═══════════════════════════════════════════════════════ */
function JoinedCampaignsView({ user, onSignIn, onSubmitClip }) {
  const [realData, setRealData]   = useState(null) // null=not loaded
  const [fetching, setFetching]   = useState(false)
  const isDemo = !user || !isSupabaseReady || realData === null

  useEffect(() => {
    if (!user || !isSupabaseReady) return
    setFetching(true)
    supabase
      .from('applications')
      .select('campaign_slug, status, created_at')
      .eq('user_id', user.id)
      .eq('status', 'accepted')
      .then(async ({ data: apps, error }) => {
        if (error || !apps) { setRealData([]); setFetching(false); return }
        // Enrich with submission counts and earnings
        const enriched = await Promise.all(apps.map(async (app) => {
          const [{ count: posts }, { data: txData }] = await Promise.all([
            supabase.from('submissions').select('id', { count: 'exact' }).eq('user_id', user.id).eq('campaign_slug', app.campaign_slug).eq('status', 'accepted'),
            supabase.from('transactions').select('amount_usd').eq('user_id', user.id).eq('campaign_slug', app.campaign_slug),
          ])
          const earnings = (txData || []).reduce((s, t) => s + (t.amount_usd || 0), 0)
          return { campaignSlug: app.campaign_slug, joinedDate: new Date(app.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), status: 'Active', postsSubmitted: posts || 0, acceptedPosts: posts || 0, earnings }
        }))
        setRealData(enriched)
        setFetching(false)
      })
  }, [user])

  const displayData = isDemo ? DEMO_JOINED : realData

  return (
    <div className="db-view">
      <div className="db-view-header">
        <div className="db-view-eyebrow"><IcJoined size={13} /> Joined Campaigns</div>
        <h1 className="db-view-h">Your Campaigns</h1>
        <p className="db-view-sub">{user && !isDemo ? `${displayData.length} active campaigns you have been accepted to. Keep posting to earn.` : 'Campaigns you have been accepted to work with.'}</p>
      </div>
      {isDemo && <DemoBanner onSignIn={onSignIn} />}
      {fetching && <div className="db-loading">Loading your campaigns…</div>}
      {!fetching && displayData.length === 0 && user && (
        <div className="db-empty-state">
          <IcJoined size={36} />
          <p>You haven't been accepted to any campaigns yet.</p>
          <p className="db-empty-sub">Browse Active Campaigns and apply to get started.</p>
        </div>
      )}
      <div className="db-compact-grid">
        {displayData.map((j) => {
          const c = ACTIVE_CAMPAIGNS.find((x) => x.slug === j.campaignSlug)
          if (!c) return null
          const snap     = computeSnapshot(c, Date.now())
          const activePct = Math.min(100, Math.round((snap.budgetSpent / c.budgetTotal) * 100))
          const cs = CAT_COLORS[c.cat] || { color: '#888', bg: 'rgba(136,136,136,0.12)', border: 'rgba(136,136,136,0.3)' }
          return (
            <div key={j.campaignSlug} className="db-compact-card">
              {/* Top row */}
              <div className="db-ccard-top">
                <CatBadge cat={c.cat} label={c.catLabel.toUpperCase()} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="db-badge db-badge--active">● {j.status}</span>
                  <PlatformIcons platformSplit={c.platformSplit} size={12} />
                </div>
              </div>

              {/* Identity */}
              <div className="db-ccard-ident">
                <div className="db-ccard-icon" style={{ background: cs.bg, border: `1px solid ${cs.border}` }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 4v14M4 11h14" stroke={cs.color} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="db-ccard-name-wrap">
                  <div className="db-compact-name">{c.name}</div>
                  <div className="db-ccard-cat-lbl" style={{ color: cs.color }}>Partner since {j.joinedDate}</div>
                </div>
              </div>

              {/* Partner stats */}
              <div className="db-ccard-partner-stats">
                <div className="db-ccard-pstat">
                  <div className="db-ccard-pstat-v" style={{ color: '#2ECC71' }}>${j.earnings.toFixed(2)}</div>
                  <div className="db-ccard-pstat-l">Earned</div>
                </div>
                <div className="db-ccard-pstat">
                  <div className="db-ccard-pstat-v">{formatViews(snap.views)}</div>
                  <div className="db-ccard-pstat-l">Camp. Views</div>
                </div>
                <div className="db-ccard-pstat">
                  <div className="db-ccard-pstat-v">{j.acceptedPosts}/{j.postsSubmitted}</div>
                  <div className="db-ccard-pstat-l">Clips OK</div>
                </div>
              </div>

              {/* Progress */}
              <div className="db-ccard-progress-lbl">
                <span>Campaign Progress</span>
                <span style={{ color: cs.color, fontWeight: 700 }}>{activePct}%</span>
              </div>
              <div className="db-progress">
                <div className="db-progress-bar" style={{ width: `${activePct}%`, background: cs.color }} />
              </div>

              {/* Rate */}
              <div className="db-ccard-stats">
                <div className="db-ccard-stat">
                  <div className="db-ccard-stat-v">${c.clientRpm.toFixed(2)}</div>
                  <div className="db-ccard-stat-l">Per 1k Views</div>
                </div>
                <div className="db-ccard-stat">
                  <div className="db-ccard-stat-v">{formatMoney(c.budgetTotal)}</div>
                  <div className="db-ccard-stat-l">Total Budget</div>
                </div>
              </div>

              <button className="db-apply-btn" onClick={onSubmitClip}>
                Submit Clip →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   WALLET VIEW
═══════════════════════════════════════════════════════ */
function WalletView({ user, onSignIn, onWithdraw }) {
  const [walletData, setWalletData]     = useState(null)
  const [fetching, setFetching]         = useState(false)
  const [paypalEmail, setPaypalEmail]   = useState(null)   // null = not loaded yet
  const [paypalInput, setPaypalInput]   = useState('')
  const [paypalEditing, setPaypalEditing] = useState(false)
  const [paypalSaving, setPaypalSaving] = useState(false)
  const [paypalMsg, setPaypalMsg]       = useState({ text: '', ok: true })
  const isDemo = !user || !isSupabaseReady || walletData === null

  /* Load transactions */
  useEffect(() => {
    if (!user || !isSupabaseReady) return
    setFetching(true)
    supabase
      .from('transactions')
      .select('id, campaign_slug, amount_usd, views_counted, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data: txs, error }) => {
        setFetching(false)
        if (error || !txs) { setWalletData({ available: 0, totalEarned: 0, pendingEarnings: 0, transactions: [] }); return }
        const paid    = txs.filter(t => t.status === 'paid')
        const pending = txs.filter(t => t.status === 'pending')
        const totalEarned  = paid.reduce((s, t) => s + (t.amount_usd || 0), 0)
        const pendingTotal = pending.reduce((s, t) => s + (t.amount_usd || 0), 0)
        setWalletData({
          available: totalEarned,
          totalEarned: totalEarned + pendingTotal,
          pendingEarnings: pendingTotal,
          transactions: txs.map(t => ({
            id: t.id,
            campaign: t.campaign_slug,
            date: new Date(t.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
            views: t.views_counted || 0,
            amount: t.amount_usd || 0,
            status: t.status,
          })),
        })
      })
  }, [user])

  /* Load saved PayPal email */
  useEffect(() => {
    if (!user || !isSupabaseReady) return
    supabase
      .from('profiles')
      .select('paypal_email')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        const saved = data?.paypal_email || ''
        setPaypalEmail(saved)
        setPaypalInput(saved)
      })
  }, [user])

  async function savePaypal() {
    const trimmed = paypalInput.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setPaypalMsg({ text: 'Please enter a valid email address.', ok: false })
      return
    }
    setPaypalSaving(true)
    const { error } = await supabase
      .from('profiles')
      .update({ paypal_email: trimmed })
      .eq('id', user.id)
    setPaypalSaving(false)
    if (error) {
      setPaypalMsg({ text: 'Could not save — please try again.', ok: false })
    } else {
      setPaypalEmail(trimmed)
      setPaypalEditing(false)
      setPaypalMsg({ text: 'PayPal account linked successfully!', ok: true })
      setTimeout(() => setPaypalMsg({ text: '', ok: true }), 3500)
    }
  }

  const w = isDemo ? DEMO_WALLET : walletData
  if (!w) return null

  return (
    <div className="db-view">
      <div className="db-view-header">
        <div className="db-view-eyebrow"><IcWallet size={13} /> Wallet</div>
        <h1 className="db-view-h">Your Wallet</h1>
        <p className="db-view-sub">Track your earnings and withdraw your available balance.</p>
      </div>
      {isDemo && <DemoBanner onSignIn={onSignIn} />}
      {fetching && <div className="db-loading">Loading wallet data…</div>}

      {/* ── BALANCE CARDS ── */}
      <div className="db-stat-cards">
        <div className="db-stat-card db-stat-card--primary">
          <div className="db-stat-card-label">Available to Withdraw</div>
          <div className="db-stat-card-value">${w.available.toFixed(2)}</div>
          <div className="db-stat-card-sub">Ready to cash out</div>
          <button className="db-withdraw-btn" onClick={onWithdraw}>Withdraw Funds</button>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-card-label">Total Earned</div>
          <div className="db-stat-card-value">${w.totalEarned.toFixed(2)}</div>
          <div className="db-stat-card-sub">All time earnings</div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-card-label">Pending</div>
          <div className="db-stat-card-value">${w.pendingEarnings.toFixed(2)}</div>
          <div className="db-stat-card-sub">Processing now</div>
        </div>
      </div>

      {/* ── PAYPAL PAYOUT ACCOUNT ── */}
      {user && !isDemo && (
        <div className="db-paypal-section">
          <div className="db-paypal-hdr">
            <div className="db-paypal-hdr-left">
              {/* PayPal wordmark SVG */}
              <svg height="20" viewBox="0 0 101 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PayPal">
                <path d="M12.237 2.6H5.318C4.85 2.6 4.45 2.94 4.376 3.402L1.6 21.27c-.056.35.215.666.57.666h3.307c.467 0 .867-.34.94-.803l.742-4.702c.073-.463.474-.803.94-.803h2.215c4.608 0 7.27-2.228 7.963-6.644.313-1.931.013-3.447-.893-4.508-.995-1.165-2.76-1.876-5.147-1.876zm.807 6.55c-.382 2.51-2.302 2.51-4.158 2.51H7.83l.741-4.694c.044-.28.286-.487.57-.487h.487c1.265 0 2.459 0 3.076.72.368.43.48 1.07.34 1.95zM33.456 9.074H30.14c-.284 0-.526.207-.57.487l-.146.926-.232-.336c-.718-1.043-2.319-1.392-3.917-1.392-3.665 0-6.796 2.777-7.405 6.676-.317 1.944.133 3.802 1.236 5.097.01.01.02.022.029.033 1.013 1.189 2.457 1.684 4.179 1.684 2.952 0 4.59-1.898 4.59-1.898l-.148.92c-.057.35.215.667.57.667h2.983c.467 0 .866-.34.94-.803l1.791-11.348c.057-.352-.215-.669-.57-.669l-.014.156zm-4.62 6.463c-.32 1.896-1.826 3.169-3.743 3.169-.963 0-1.733-.31-2.228-.896-.491-.583-.676-1.413-.521-2.338.3-1.882 1.831-3.196 3.718-3.196.942 0 1.708.312 2.213.903.508.594.708 1.43.561 2.358zM51.348 9.074h-3.334c-.32 0-.62.16-.8.426l-4.618 6.8-1.959-6.536c-.123-.41-.5-.69-.928-.69H37.07c-.396 0-.672.39-.543.764l3.688 10.82-3.469 4.896c-.271.383.003.91.467.91h3.33c.318 0 .616-.156.797-.42l11.14-16.082c.265-.382-.009-.908-.472-.908l-.66.02z" fill="#253B80"/>
                <path d="M62.193 2.6h-6.92c-.466 0-.866.34-.939.803l-2.778 17.868c-.056.35.215.666.57.666h3.545c.326 0 .604-.237.655-.56l.788-4.945c.073-.463.474-.803.94-.803h2.215c4.607 0 7.27-2.228 7.963-6.644.313-1.931.012-3.447-.894-4.508-.994-1.165-2.76-1.876-5.145-1.876zm.807 6.55c-.382 2.51-2.302 2.51-4.158 2.51h-1.056l.741-4.694c.044-.28.286-.487.57-.487h.487c1.265 0 2.459 0 3.076.72.368.43.48 1.07.34 1.95zM83.41 9.074H80.1c-.284 0-.527.207-.57.487l-.147.926-.232-.336c-.718-1.043-2.318-1.392-3.916-1.392-3.665 0-6.797 2.777-7.405 6.676-.317 1.944.133 3.802 1.235 5.097l.03.033c1.013 1.189 2.456 1.684 4.178 1.684 2.953 0 4.59-1.898 4.59-1.898l-.148.92c-.056.35.215.667.57.667h2.983c.467 0 .866-.34.94-.803l1.791-11.348c.057-.352-.215-.669-.57-.669l-.018.156zm-4.62 6.463c-.32 1.896-1.826 3.169-3.743 3.169-.963 0-1.733-.31-2.229-.896-.49-.583-.675-1.413-.52-2.338.3-1.882 1.83-3.196 3.717-3.196.942 0 1.709.312 2.214.903.507.594.707 1.43.561 2.358zM87.317 3.046l-2.82 17.955c-.056.35.215.666.57.666h2.853c.467 0 .867-.34.94-.803L91.64 3.016c.057-.35-.215-.667-.57-.667h-3.18c-.283 0-.526.207-.57.697z" fill="#179BD7"/>
              </svg>
              <h3 className="db-paypal-title">Payout Account</h3>
            </div>
            <p className="db-paypal-desc">Your earnings will be sent to this PayPal account when you withdraw.</p>
          </div>

          {paypalEmail && !paypalEditing ? (
            /* Linked state */
            <div className="db-paypal-linked">
              <div className="db-paypal-linked-info">
                <span className="db-paypal-check"><IcCheck size={14} /></span>
                <span className="db-paypal-linked-email">{paypalEmail}</span>
              </div>
              <button className="db-paypal-change-btn" onClick={() => { setPaypalEditing(true); setPaypalMsg({ text: '', ok: true }) }}>
                Change
              </button>
            </div>
          ) : (
            /* Link / Edit form */
            <div className="db-paypal-form">
              <div className="db-paypal-input-row">
                <input
                  className="db-paypal-input"
                  type="email"
                  placeholder="your-paypal@email.com"
                  value={paypalInput}
                  onChange={(e) => setPaypalInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && savePaypal()}
                />
                <button className="db-paypal-save-btn" onClick={savePaypal} disabled={paypalSaving}>
                  {paypalSaving ? 'Saving…' : paypalEditing ? 'Update' : 'Link PayPal'}
                </button>
                {paypalEditing && (
                  <button className="db-paypal-cancel-btn" onClick={() => { setPaypalEditing(false); setPaypalInput(paypalEmail || '') }}>
                    Cancel
                  </button>
                )}
              </div>
              {paypalMsg.text && (
                <p className={`db-paypal-msg${paypalMsg.ok ? ' ok' : ' err'}`}>{paypalMsg.text}</p>
              )}
            </div>
          )}

          {paypalMsg.text && !paypalEditing && (
            <p className={`db-paypal-msg${paypalMsg.ok ? ' ok' : ' err'}`}>{paypalMsg.text}</p>
          )}
        </div>
      )}

      {/* ── TRANSACTION HISTORY ── */}
      <div className="db-tx-section">
        <h3 className="db-section-h3">Transaction History</h3>
        {w.transactions.length === 0 && user && !isDemo ? (
          <div className="db-empty-state"><IcWallet size={32} /><p>No transactions yet.</p></div>
        ) : (
          <div className="db-tx-table-wrap">
            <div className="db-tx-table">
              <div className="db-tx-head"><span>Date</span><span>Campaign</span><span>Views</span><span>Amount</span><span>Status</span></div>
              {w.transactions.map((t) => (
                <div key={t.id} className="db-tx-row">
                  <span className="db-tx-date">{t.date}</span>
                  <span className="db-tx-campaign">{t.campaign}</span>
                  <span className="db-tx-views">{formatViews(t.views)}</span>
                  <span className="db-tx-amount">+${t.amount.toFixed(2)}</span>
                  <span><span className={'db-badge db-badge--' + t.status}>{t.status === 'paid' ? 'Paid' : 'Pending'}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MY SUBMISSIONS VIEW
═══════════════════════════════════════════════════════ */
function SubmissionsView({ user, onSignIn }) {
  const [subs, setSubs]       = useState(null)
  const [fetching, setFetching] = useState(false)
  const isDemo = !user || !isSupabaseReady || subs === null

  useEffect(() => {
    if (!user || !isSupabaseReady) return
    setFetching(true)
    supabase
      .from('submissions')
      .select('id, campaign_slug, platform, status, views_count, submitted_at')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })
      .then(({ data, error }) => {
        setFetching(false)
        if (error) { setSubs([]); return }
        setSubs((data || []).map(s => ({
          id: s.id,
          campaign: s.campaign_slug,
          platform: s.platform,
          date: new Date(s.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          status: s.status,
          views: s.views_count || 0,
        })))
      })
  }, [user])

  const displaySubs = isDemo ? DEMO_SUBMISSIONS : (subs || [])
  const counts = {
    accepted: displaySubs.filter((s) => s.status === 'accepted').length,
    pending:  displaySubs.filter((s) => s.status === 'pending').length,
    denied:   displaySubs.filter((s) => s.status === 'denied').length,
  }

  return (
    <div className="db-view">
      <div className="db-view-header">
        <div className="db-view-eyebrow"><IcClips size={13} /> My Submissions</div>
        <h1 className="db-view-h">My Submissions</h1>
        <p className="db-view-sub">All {displaySubs.length} clip submissions across campaigns.</p>
      </div>
      {isDemo && <DemoBanner onSignIn={onSignIn} />}
      {fetching && <div className="db-loading">Loading submissions…</div>}
      {!fetching && displaySubs.length === 0 && user && !isDemo ? (
        <div className="db-empty-state"><IcClips size={36} /><p>No submissions yet — submit your first clip!</p></div>
      ) : (
        <>
          <div className="db-sub-summary">
            <span className="db-badge db-badge--accepted">{counts.accepted} Accepted</span>
            <span className="db-badge db-badge--pending">{counts.pending} Pending</span>
            <span className="db-badge db-badge--denied">{counts.denied} Denied</span>
          </div>
          <div className="db-subs-table-wrap">
            <div className="db-subs-table">
              <div className="db-subs-head"><span>Campaign</span><span>Platform</span><span>Date</span><span>Status</span><span>Views</span></div>
              {displaySubs.map((s) => (
                <div key={s.id} className="db-subs-row">
                  <span className="db-subs-campaign">{s.campaign}</span>
                  <span className="db-subs-platform">{s.platform}</span>
                  <span className="db-subs-date">{s.date}</span>
                  <span><span className={'db-badge db-badge--' + s.status}>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span></span>
                  <span className={s.views > 0 ? 'db-subs-views' : 'db-subs-views-none'}>{s.views > 0 ? formatViews(s.views) : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SUBMIT CLIP MODAL
═══════════════════════════════════════════════════════ */
function SubmitClipModal({ onClose, onSuccess, user }) {
  const [campaign, setCampaign] = useState(ACTIVE_CAMPAIGNS[0]?.slug || '')
  const [platform, setPlatform] = useState('TikTok')
  const [url,      setUrl]      = useState('')
  const [note,     setNote]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [err,      setErr]      = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!url.trim()) return
    setLoading(true)
    setErr(null)
    if (user && isSupabaseReady) {
      const { error } = await supabase.from('submissions').insert({
        user_id: user.id,
        campaign_slug: campaign,
        platform,
        video_url: url.trim(),
        note: note.trim() || null,
        status: 'pending',
      })
      setLoading(false)
      if (error) { setErr('Could not submit clip. Please try again.'); return }
      onSuccess()
    } else {
      setTimeout(() => { setLoading(false); onSuccess() }, 900)
    }
  }

  return (
    <div className="db-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="db-modal">
        <div className="db-modal-hdr">
          <h2 className="db-modal-title">Submit a Clip</h2>
          <button className="db-modal-close" onClick={onClose}><IcClose size={18} /></button>
        </div>
        <form className="db-modal-form" onSubmit={handleSubmit}>
          <div className="db-modal-field">
            <label className="db-modal-lbl">Campaign</label>
            <select className="db-modal-sel" value={campaign} onChange={(e) => setCampaign(e.target.value)}>
              {ACTIVE_CAMPAIGNS.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div className="db-modal-field">
            <label className="db-modal-lbl">Platform</label>
            <div className="db-modal-pltf-row">
              {['TikTok', 'Instagram', 'YouTube'].map((p) => (
                <button key={p} type="button" className={'db-modal-pltf-btn' + (platform === p ? ' active' : '')} onClick={() => setPlatform(p)}>{p}</button>
              ))}
            </div>
          </div>
          <div className="db-modal-field">
            <label className="db-modal-lbl">Video URL</label>
            <input className="db-modal-inp" placeholder="https://tiktok.com/@yourhandle/video/..." value={url} onChange={(e) => setUrl(e.target.value)} required />
          </div>
          <div className="db-modal-field">
            <label className="db-modal-lbl">Note <span className="db-modal-opt">(optional)</span></label>
            <textarea className="db-modal-txt" placeholder="Any notes for the review team..." value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
          </div>
          {err && <p className="db-modal-err">{err}</p>}
          <button className="db-modal-submit" type="submit" disabled={loading || !url.trim()}>
            {loading ? 'Submitting...' : 'Submit Clip'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════════════ */
const MAIN_NAV = [
  { id: 'return',      label: 'Return',           Icon: IcArrowLeft, isBack: true },
  { id: 'joined',      label: 'Joined Campaigns', Icon: IcJoined               },
  { id: 'wallet',      label: 'Wallet',           Icon: IcWallet               },
  { id: 'submissions', label: 'My Submissions',   Icon: IcClips                },
]
const SUPPORT_NAV = [
  { id: 'campaigns', label: 'Active Campaigns', Icon: IcZap     },
  { id: 'support',   label: 'Live Support',     Icon: IcSupport },
]

const DB_MOBILE_BP = 768

function getVW() {
  if (typeof window === 'undefined') return DB_MOBILE_BP + 1
  // Use window.innerWidth — this is the layout viewport, exactly what CSS
  // media queries use. visualViewport.width is the visual viewport (smaller
  // when iOS browser chrome is visible) and causes a mismatch with CSS.
  return window.innerWidth
}

export default function Dashboard() {
  const [activeView,      setActiveView]      = useState('campaigns')
  const [authModal,       setAuthModal]       = useState(null)
  const [toast,           setToast]           = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [drawerOpen,      setDrawerOpen]      = useState(false)
  const [isMobile,        setIsMobile]        = useState(() => getVW() <= DB_MOBILE_BP)
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])

  // JS-based mobile detection — same pattern as Nav.jsx to bypass Chrome's auto-zoom
  useEffect(() => {
    const update = () => setIsMobile(getVW() <= DB_MOBILE_BP)
    const vv = window.visualViewport
    if (vv) vv.addEventListener('resize', update)
    window.addEventListener('resize', update)
    return () => {
      if (vv) vv.removeEventListener('resize', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Auto-close drawer when switching to desktop
  useEffect(() => { if (!isMobile) setDrawerOpen(false) }, [isMobile])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(null), 3500) }

  function openSupport() { if (typeof window !== 'undefined' && window.Tawk_API) window.Tawk_API.toggle() }

  async function handleApply(campaign) {
    if (!user) { setAuthModal({ intent: `Apply to ${campaign.name}` }); return }
    if (isSupabaseReady) {
      const { error } = await supabase.from('applications').upsert(
        { user_id: user.id, campaign_slug: campaign.slug, status: 'pending' },
        { onConflict: 'user_id,campaign_slug', ignoreDuplicates: true }
      )
      if (error) { showToast('Could not apply — please try again.'); return }
    }
    showToast(`Applied to ${campaign.name}! Your application is under review.`)
  }

  function handleSubmitClip() {
    if (!user) { setAuthModal({ intent: 'Submit a clip to a campaign' }); return }
    setShowSubmitModal(true)
  }

  function handleWithdraw() { showToast('Withdrawal request sent — funds arrive within 3–5 business days.') }

  function handleNavClick(id) {
    if (id === 'support') { openSupport(); return }
    setActiveView(id)
    setDrawerOpen(false)
  }

  function renderView() {
    switch (activeView) {
      case 'campaigns':    return <CampaignsView onApply={handleApply} />
      case 'joined':       return <JoinedCampaignsView user={user} onSignIn={() => setAuthModal({ intent: 'View joined campaigns' })} onSubmitClip={handleSubmitClip} />
      case 'wallet':       return <WalletView user={user} onSignIn={() => setAuthModal({ intent: 'View your wallet' })} onWithdraw={handleWithdraw} />
      case 'submissions':  return <SubmissionsView user={user} onSignIn={() => setAuthModal({ intent: 'View your submissions' })} />
      default:             return <CampaignsView onApply={handleApply} />
    }
  }

  /* ── Shared nav items (no footer — rendered in sidebar-top and drawer-body) ── */
  const sidebarNav = (
    <>
      {user && (
        <div className="db-user-badge">
          <div className="db-ub-av">{(profile?.username || user.email || '?')[0].toUpperCase()}</div>
          <div className="db-ub-info">
            <div className="db-ub-name">{profile?.username || 'Creator'}</div>
            <div className="db-ub-email">{user.email}</div>
          </div>
          <button className="db-signout-btn" onClick={signOut} title="Sign out"><IcSignout size={14} /></button>
        </div>
      )}
      <p className="db-section-lbl">MAIN</p>
      <nav className="db-nav">
        {MAIN_NAV.map(({ id, label, Icon, isBack }) =>
          isBack ? (
            <button key={id} className="db-nav-item" onClick={() => navigate(-1)}>
              <Icon size={17} />{label}
            </button>
          ) : (
            <button key={id} className={'db-nav-item' + (activeView === id ? ' active' : '')} onClick={() => handleNavClick(id)}>
              <Icon size={17} />{label}
            </button>
          )
        )}
      </nav>
      <p className="db-section-lbl">SUPPORT</p>
      <nav className="db-nav">
        {SUPPORT_NAV.map(({ id, label, Icon }) => (
          <button key={id} className={'db-nav-item' + (activeView === id ? ' active' : '')} onClick={() => handleNavClick(id)}>
            <Icon size={17} />{label}
          </button>
        ))}
      </nav>
    </>
  )

  /* ── Shared footer (submit clip, social links) ── */
  const sidebarFoot = (
    <div className="db-sidebar-foot">
      <button className="db-submit-clip-btn" onClick={() => { setDrawerOpen(false); handleSubmitClip() }}>
        <IcUpload size={17} />Submit Clip
      </button>
      <div className="db-social-row">
        <a href="https://discord.gg/clipsmart" target="_blank" rel="noopener noreferrer" className="db-social-link" title="Discord">
          <IcDiscord size={16} />
        </a>
        <a href="https://www.instagram.com/clipsmart" target="_blank" rel="noopener noreferrer" className="db-social-link" title="Instagram">
          <IcInstagram size={16} />
        </a>
      </div>
    </div>
  )

  return (
    <div className="db-root">
      {/* ──────── MOBILE TOP BAR (hamburger + logo) — JS-controlled ──────── */}
      <div className="db-mobile-topbar">
        <button className="db-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">
          <span /><span /><span />
        </button>
        <Link to="/" className="db-logo db-logo--topbar">
          <img src="/logo.png" alt="ClipSmart" className="db-logo-img" />
          <span>ClipSmart</span>
        </Link>
        <div className="db-mobile-topbar-auth">
          {user
            ? <UserAvatarDropdown user={user} profile={profile} signOut={signOut} />
            : <button className="db-topbar-clip-btn" onClick={() => setAuthModal({ intent: 'Sign in to apply to campaigns' })}>Sign In</button>
          }
        </div>
      </div>

      {/* ──────── MOBILE DRAWER OVERLAY ──────── */}
      <div className={`db-drawer-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <aside className="db-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="db-drawer-hdr">
            <Link to="/" className="db-logo" onClick={() => setDrawerOpen(false)}>
              <img src="/logo.png" alt="ClipSmart" className="db-logo-img" />
              <span>ClipSmart</span>
            </Link>
            <button className="db-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">
              <IcClose size={20} />
            </button>
          </div>
          <div className="db-drawer-body">{sidebarNav}</div>
          {sidebarFoot}
        </aside>
      </div>

      {/* ──────── DESKTOP SIDEBAR — JS-controlled ──────── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-top">
          <Link to="/" className="db-logo">
            <img src="/logo.png" alt="ClipSmart" className="db-logo-img" />
            <span>ClipSmart</span>
          </Link>
          {sidebarNav}
        </div>
        {sidebarFoot}
      </aside>

      {/* Floating auth buttons — top-right, desktop only */}
      {!isMobile && (
        <div className="db-auth-float">
          {user
            ? <UserAvatarDropdown user={user} profile={profile} signOut={signOut} />
            : <>
                <button className="db-dtb-signin" onClick={() => setAuthModal({ intent: 'Sign in to your account', initialTab: 'signin' })}>
                  Login
                </button>
                <button className="db-dtb-register" onClick={() => setAuthModal({ intent: 'Create your free account', initialTab: 'signup' })}>
                  Register
                </button>
              </>
          }
        </div>
      )}

      <main className="db-main">
        {renderView()}
      </main>

      {/* Mobile floating Submit Clip button */}
      <button className="db-mobile-fab" onClick={handleSubmitClip}>
        <IcUpload size={18} />Submit Clip
      </button>

      {toast && <div className="db-toast"><span className="db-live-dot-sm" />{toast}</div>}

      {authModal && (
        <AuthModal intent={authModal.intent} initialTab={authModal.initialTab} onClose={() => setAuthModal(null)} onSuccess={() => setAuthModal(null)} />
      )}

      {showSubmitModal && (
        <SubmitClipModal
          user={user}
          onClose={() => setShowSubmitModal(false)}
          onSuccess={() => { setShowSubmitModal(false); showToast("Clip submitted! We'll review it within 24 hours.") }}
        />
      )}
    </div>
  )
}
