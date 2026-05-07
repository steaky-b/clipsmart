import { Link } from 'react-router-dom'
import './CreatorCampaign.css'

/* ── Step illustrations ── */

function IllustrationBudget() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="cc-step-img" aria-hidden="true">
      {/* Card */}
      <rect x="44" y="20" width="232" height="220" rx="16" fill="var(--s1)" stroke="var(--bd)" strokeWidth="1.5"/>
      <rect x="44" y="20" width="232" height="3" rx="2" fill="var(--g)"/>
      {/* Header pills */}
      <rect x="62" y="40" width="72" height="8" rx="4" fill="var(--g)" fillOpacity="0.22"/>
      <rect x="142" y="42" width="44" height="5" rx="2.5" fill="var(--bd)" opacity="0.9"/>
      {/* Glow behind number */}
      <circle cx="160" cy="118" r="60" fill="var(--g)" fillOpacity="0.045"/>
      {/* Big amount */}
      <text x="160" y="112" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="46" fontWeight="800" fill="var(--g)">$1,000</text>
      {/* Subtext rects */}
      <rect x="102" y="122" width="116" height="6" rx="3" fill="var(--g)" fillOpacity="0.18"/>
      <rect x="118" y="132" width="84" height="5" rx="2.5" fill="var(--g)" fillOpacity="0.1"/>
      {/* Progress track */}
      <rect x="62" y="156" width="196" height="8" rx="4" fill="var(--bd)"/>
      {/* Progress fill — full (budget set) */}
      <rect x="62" y="156" width="196" height="8" rx="4" fill="var(--g)" fillOpacity="0.65"/>
      {/* Glow on fill edge */}
      <circle cx="258" cy="160" r="6" fill="var(--g)" fillOpacity="0.4"/>
      {/* Lock chip */}
      <rect x="86" y="178" width="148" height="30" rx="9" fill="var(--g)" fillOpacity="0.07" stroke="var(--g)" strokeWidth="1" strokeOpacity="0.3"/>
      {/* Lock icon */}
      <rect x="100" y="187" width="12" height="10" rx="3" fill="var(--g)" fillOpacity="0.65"/>
      <path d="M102 187 L102 184 C102 181.5 106 180 106 180 C106 180 110 181.5 110 184 L110 187" stroke="var(--g)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.65"/>
      {/* "HARD CAP LOCKED" placeholder text */}
      <rect x="118" y="188" width="54" height="5" rx="2.5" fill="var(--g)" fillOpacity="0.55"/>
      <rect x="118" y="197" width="36" height="4" rx="2" fill="var(--g)" fillOpacity="0.3"/>
      {/* Decorative corner dots */}
      <circle cx="258" cy="38" r="4" fill="var(--g)" fillOpacity="0.3"/>
      <circle cx="247" cy="38" r="2.5" fill="var(--g)" fillOpacity="0.18"/>
      <circle cx="66" cy="228" r="2.5" fill="var(--g)" fillOpacity="0.18"/>
    </svg>
  )
}

function IllustrationCreators() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="cc-step-img" aria-hidden="true">
      {/* Left phone */}
      <rect x="46" y="50" width="64" height="112" rx="12" fill="var(--s1)" stroke="var(--bd)" strokeWidth="1.5"/>
      <rect x="54" y="66" width="48" height="36" rx="6" fill="var(--bd)" fillOpacity="0.8"/>
      <rect x="54" y="66" width="48" height="36" rx="6" fill="var(--g)" fillOpacity="0.06"/>
      <path d="M70 80 L70 90 L80 85 Z" fill="var(--g)" fillOpacity="0.4"/>
      <rect x="54" y="108" width="36" height="5" rx="2.5" fill="var(--t1)" fillOpacity="0.15"/>
      <rect x="54" y="117" width="24" height="4" rx="2" fill="var(--t1)" fillOpacity="0.08"/>
      <rect x="64" y="52" width="16" height="6" rx="3" fill="var(--bg)"/>
      {/* Avatar row — left */}
      <circle cx="58" cy="142" r="6" fill="var(--bd)"/>
      <rect x="68" y="138" width="28" height="4" rx="2" fill="var(--t1)" fillOpacity="0.12"/>
      <rect x="68" y="145" width="18" height="3" rx="1.5" fill="var(--t1)" fillOpacity="0.07"/>

      {/* Right phone */}
      <rect x="210" y="50" width="64" height="112" rx="12" fill="var(--s1)" stroke="var(--bd)" strokeWidth="1.5"/>
      <rect x="218" y="66" width="48" height="36" rx="6" fill="var(--bd)" fillOpacity="0.8"/>
      <rect x="218" y="66" width="48" height="36" rx="6" fill="var(--g)" fillOpacity="0.06"/>
      <path d="M234 80 L234 90 L244 85 Z" fill="var(--g)" fillOpacity="0.4"/>
      <rect x="218" y="108" width="36" height="5" rx="2.5" fill="var(--t1)" fillOpacity="0.15"/>
      <rect x="218" y="117" width="24" height="4" rx="2" fill="var(--t1)" fillOpacity="0.08"/>
      <rect x="228" y="52" width="16" height="6" rx="3" fill="var(--bg)"/>
      <circle cx="222" cy="142" r="6" fill="var(--bd)"/>
      <rect x="232" y="138" width="28" height="4" rx="2" fill="var(--t1)" fillOpacity="0.12"/>
      <rect x="232" y="145" width="18" height="3" rx="1.5" fill="var(--t1)" fillOpacity="0.07"/>

      {/* Center phone — featured, green border */}
      <rect x="120" y="24" width="80" height="148" rx="14" fill="var(--s1)" stroke="var(--g)" strokeWidth="1.5"/>
      {/* Video thumbnail */}
      <rect x="130" y="42" width="60" height="52" rx="8" fill="var(--g)" fillOpacity="0.12" stroke="var(--g)" strokeWidth="0.75" strokeOpacity="0.3"/>
      {/* Play button */}
      <circle cx="160" cy="68" r="14" fill="var(--g)" fillOpacity="0.15"/>
      <path d="M155 62 L155 74 L167 68 Z" fill="var(--g)" fillOpacity="0.8"/>
      {/* Content lines */}
      <rect x="130" y="100" width="54" height="5" rx="2.5" fill="var(--t1)" fillOpacity="0.22"/>
      <rect x="130" y="109" width="38" height="4" rx="2" fill="var(--t1)" fillOpacity="0.13"/>
      {/* Like + view row */}
      <circle cx="136" cy="126" r="8" fill="var(--g)" fillOpacity="0.1" stroke="var(--g)" strokeWidth="0.75" strokeOpacity="0.4"/>
      <path d="M133 127 C133 125.3 135.5 124.8 136 126 C136.5 124.8 139 125.3 139 127 C139 128.8 136 130.8 136 130.8 C136 130.8 133 128.8 133 127Z" fill="var(--g)" fillOpacity="0.65"/>
      <rect x="148" y="122" width="28" height="8" rx="4" fill="var(--g)" fillOpacity="0.08" stroke="var(--g)" strokeWidth="0.75" strokeOpacity="0.3"/>
      <rect x="152" y="125" width="14" height="4" rx="2" fill="var(--g)" fillOpacity="0.4"/>
      {/* Posted badge */}
      <rect x="130" y="142" width="60" height="16" rx="5" fill="var(--g)" fillOpacity="0.12" stroke="var(--g)" strokeWidth="0.75" strokeOpacity="0.5"/>
      <circle cx="139" cy="150" r="3" fill="var(--g)" fillOpacity="0.7"/>
      <rect x="145" y="147" width="30" height="5" rx="2.5" fill="var(--g)" fillOpacity="0.5"/>
      {/* Notch */}
      <rect x="148" y="26" width="24" height="7" rx="3.5" fill="var(--bg)"/>

      {/* 80K badge */}
      <rect x="72" y="182" width="176" height="34" rx="10" fill="var(--g)" fillOpacity="0.08" stroke="var(--g)" strokeWidth="1" strokeOpacity="0.3"/>
      <text x="160" y="205" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="15" fontWeight="800" fill="var(--g)">80,000+ Creators</text>
    </svg>
  )
}

function IllustrationReview() {
  const checks = [
    { y: 90,  ok: true,  w1: 88, w2: 52 },
    { y: 122, ok: true,  w1: 66, w2: 72 },
    { y: 154, ok: true,  w1: 100, w2: 36 },
    { y: 186, ok: false, w1: 56, w2: 84 },
  ]
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="cc-step-img" aria-hidden="true">
      {/* Card */}
      <rect x="44" y="18" width="232" height="224" rx="16" fill="var(--s1)" stroke="var(--bd)" strokeWidth="1.5"/>
      <rect x="44" y="18" width="232" height="3" rx="2" fill="var(--g)"/>
      {/* Header */}
      <rect x="62" y="36" width="90" height="8" rx="4" fill="var(--g)" fillOpacity="0.22"/>
      <rect x="160" y="38" width="56" height="5" rx="2.5" fill="var(--bd)" opacity="0.9"/>
      {/* Column labels */}
      <rect x="62" y="54" width="140" height="5" rx="2.5" fill="var(--t1)" fillOpacity="0.06"/>
      <rect x="214" y="54" width="42" height="5" rx="2.5" fill="var(--g)" fillOpacity="0.15"/>
      {/* Divider */}
      <line x1="62" y1="70" x2="258" y2="70" stroke="var(--bd)" strokeWidth="1"/>
      {/* Review rows */}
      {checks.map(({ y, ok, w1, w2 }, i) => (
        <g key={i}>
          <rect x="58" y={y - 10} width="204" height="26" rx="6" fill={ok ? 'var(--g)' : '#e05050'} fillOpacity="0.04"/>
          {ok ? (
            <>
              <circle cx="80" cy={y + 3} r="9" fill="var(--g)" fillOpacity="0.12" stroke="var(--g)" strokeWidth="1" strokeOpacity="0.5"/>
              <path d={`M76 ${y + 3} L79.5 ${y + 6.5} L85.5 ${y - 1}`} stroke="var(--g)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </>
          ) : (
            <>
              <circle cx="80" cy={y + 3} r="9" fill="#e05050" fillOpacity="0.12" stroke="#e05050" strokeWidth="1" strokeOpacity="0.5"/>
              <path d={`M76 ${y - 1} L84 ${y + 7} M84 ${y - 1} L76 ${y + 7}`} stroke="#e05050" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            </>
          )}
          <rect x="98" y={y} width={w1} height="5" rx="2.5" fill={ok ? 'var(--t1)' : '#e05050'} fillOpacity={ok ? '0.2' : '0.28'}/>
          <rect x={98 + w1 + 6} y={y} width={w2} height="5" rx="2.5" fill="var(--t1)" fillOpacity="0.09"/>
          <rect x="98" y={y + 9} width={Math.round(w1 * 0.55)} height="4" rx="2" fill="var(--t1)" fillOpacity="0.06"/>
        </g>
      ))}
      {/* Footer */}
      <line x1="44" y1="214" x2="276" y2="214" stroke="var(--bd)" strokeWidth="1"/>
      <rect x="62" y="223" width="32" height="6" rx="3" fill="var(--g)" fillOpacity="0.5"/>
      <rect x="100" y="223" width="84" height="6" rx="3" fill="var(--g)" fillOpacity="0.28"/>
      <rect x="192" y="225" width="48" height="4" rx="2" fill="var(--t1)" fillOpacity="0.07"/>
    </svg>
  )
}

function IllustrationGraph() {
  const baseY = 218
  const bars = [
    { x: 72,  h: 24,  op: 0.2  },
    { x: 104, h: 48,  op: 0.32 },
    { x: 136, h: 74,  op: 0.47 },
    { x: 168, h: 98,  op: 0.62 },
    { x: 200, h: 118, op: 0.78 },
    { x: 232, h: 140, op: 1.0  },
  ]
  const goalY = baseY - 140 - 6
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="cc-step-img" aria-hidden="true">
      {/* Card */}
      <rect x="44" y="20" width="232" height="220" rx="16" fill="var(--s1)" stroke="var(--bd)" strokeWidth="1.5"/>
      <rect x="44" y="20" width="232" height="3" rx="2" fill="var(--g)"/>
      {/* Header */}
      <rect x="62" y="38" width="68" height="8" rx="4" fill="var(--g)" fillOpacity="0.22"/>
      <rect x="138" y="40" width="48" height="5" rx="2.5" fill="var(--bd)" opacity="0.9"/>
      {/* Big metric */}
      <text x="160" y="76" textAnchor="middle" fontFamily="'Bricolage Grotesque', sans-serif" fontSize="30" fontWeight="800" fill="var(--g)">1,000,000+</text>
      {/* "Views generated" subtext rects */}
      <rect x="104" y="83" width="112" height="6" rx="3" fill="var(--g)" fillOpacity="0.17"/>
      {/* Goal dashed line */}
      <line x1="64" y1={goalY} x2="256" y2={goalY} stroke="var(--g)" strokeWidth="1" strokeDasharray="5 3" strokeOpacity="0.38"/>
      {/* Goal label chip */}
      <rect x="228" y={goalY - 14} width="26" height="12" rx="4" fill="var(--g)" fillOpacity="0.12" stroke="var(--g)" strokeWidth="0.75" strokeOpacity="0.4"/>
      <rect x="232" y={goalY - 11} width="18" height="5" rx="2.5" fill="var(--g)" fillOpacity="0.6"/>
      {/* Mid grid line */}
      <line x1="64" y1={baseY - 70} x2="256" y2={baseY - 70} stroke="var(--bd)" strokeWidth="0.75"/>
      {/* Baseline */}
      <line x1="64" y1={baseY} x2="256" y2={baseY} stroke="var(--bd)" strokeWidth="1"/>
      {/* Bars */}
      {bars.map(({ x, h, op }, i) => (
        <rect key={i} x={x} y={baseY - h} width="24" height={h} rx="3" fill="var(--g)" fillOpacity={op}/>
      ))}
      {/* Glow behind tallest bar */}
      <rect x="232" y={baseY - 140} width="24" height="140" rx="3" fill="var(--g)" fillOpacity="0.08"/>
      {/* $1 / 1K chip */}
      <rect x="80" y="228" width="160" height="6" rx="3" fill="var(--g)" fillOpacity="0.13"/>
    </svg>
  )
}

const ILLUSTRATIONS = [IllustrationBudget, IllustrationCreators, IllustrationReview, IllustrationGraph]

const STEPS = [
  {
    n: '01', title: 'You fund a campaign budget',
    body: 'Set your budget — that\'s your hard cap. Every $1,000 guarantees a minimum of 1,000,000 views. You will not spend a cent over your cap without approval.',
    stat: { v: '1M+', l: '$1,000 = 1M+ guaranteed views' },
  },
  {
    n: '02', title: 'Creators post content about your brand',
    body: 'Your campaign launches inside our community of 80,000+ creators. They produce original short-form videos on TikTok, Instagram, and YouTube — from their own accounts, organically. No ad accounts. No "Sponsored" labels.',
    stat: { v: '80K+', l: 'Active creators briefed instantly' },
  },
  {
    n: '03', title: 'We manually review every submission',
    body: 'Before any clip counts toward your budget, our team reviews it. Wrong tone, wrong audience, off-brand, low quality — rejected instantly. You never pay for content that doesn\'t meet your standard.',
    stat: { v: '100%', l: 'Manual review on every clip' },
  },
  {
    n: '04', title: 'You pay only for views that happened',
    body: 'Deducted from your budget as views roll in. Track every clip, every view, every penny in real time. When the budget is spent, the campaign ends.',
    stat: { v: '$1', l: 'Per 1,000 organic views — nothing more' },
  },
]

const MECHANICS = [
  {
    title: 'Hard budget cap', icon: '🔒',
    body: 'You set a maximum. We cannot, and will not, spend over it. No surprise invoices. No "additional fees". Your cap is your cap.',
  },
  {
    title: 'View threshold approval', icon: '✓',
    body: 'Every clip must hit a minimum view threshold before it counts. Low-performing content never touches your budget.',
  },
  {
    title: 'Manual clip review', icon: '👁',
    body: 'Every submission is reviewed by a human before approval. Off-brand, low quality, or wrong audience = instant rejection.',
  },
]

const COMPARE = [
  { label: 'Pricing model', them: 'Flat fee or retainer', us: 'Pay per 1,000 views' },
  { label: 'Guarantees', them: 'Projections only', us: 'Minimum 1M views per $1K' },
  { label: 'Content origin', them: 'Branded / sponsored', us: '100% organic creator posts' },
  { label: 'Risk', them: 'Pay upfront, hope it works', us: 'Pay after views happen' },
  { label: 'Launch time', them: '2–4 weeks', us: '48 hours' },
  { label: 'Budget waste', them: 'Possible — no refund', us: 'Full refund if we don\'t deliver' },
]

export default function CreatorCampaign() {
  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <Link to="/how-it-works" style={{ color: 'var(--g)', opacity: .7 }}>How It Works</Link>
          &nbsp;/&nbsp;Creator Campaign Growth
        </div>
        <h1>Creator Campaign<br /><em>Growth.</em></h1>
        <p>Set a budget. We brief 80,000+ creators. They post. You only pay when content hits your view threshold.</p>
      </div>

      {/* STEPS */}
      <div className="cc-steps">
        {STEPS.map(({ n, title, body, stat }, i) => {
          const Illustration = ILLUSTRATIONS[i]
          return (
            <div key={n} className={'cc-step fade-up' + (i % 2 === 1 ? ' even' : ' odd')}>
              <div className="cc-step-content">
                <div className="cc-step-label">
                  <div className="cc-step-num">{n}</div>
                  Step {['One', 'Two', 'Three', 'Four'][i]}
                </div>
                <h2 className="cc-step-h">{title}</h2>
                <p className="cc-step-p">{body}</p>
                <div className="cc-stat">
                  <div className="cc-stat-v">{stat.v}</div>
                  <div className="cc-stat-l">{stat.l}</div>
                </div>
              </div>
              <div className="cc-step-visual">
                <Illustration />
              </div>
            </div>
          )
        })}
      </div>

      {/* MECHANICS */}
      <div className="cc-mechanics-section">
        <div className="section">
          <div className="section-eyebrow fade-up">Budget Protection</div>
          <h2 className="section-h2 fade-up">Three mechanics that<br /><em>protect your budget.</em></h2>
          <div className="cc-mechanics-grid">
            {MECHANICS.map(({ title, icon, body }) => (
              <div key={title} className="cc-mechanic-card fade-up">
                <div className="cc-mechanic-icon">{icon}</div>
                <h3 className="cc-mechanic-t">{title}</h3>
                <p className="cc-mechanic-b">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPARE */}
      <div className="section">
        <div className="section-eyebrow fade-up">Comparison</div>
        <h2 className="section-h2 fade-up">ClipSmart vs everything<br /><em>you've tried before.</em></h2>
        <div className="cc-compare-scroll">
          <div className="cc-compare fade-up">
            <div className="cc-compare-head">
              <div />
              <div className="cc-compare-col-head">Everyone Else</div>
              <div className="cc-compare-col-head green">ClipSmart</div>
            </div>
            {COMPARE.map(({ label, them, us }) => (
              <div key={label} className="cc-compare-row">
                <div className="cc-compare-label">{label}</div>
                <div className="cc-compare-them">{them}</div>
                <div className="cc-compare-us">{us}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-box fade-up">
          <div>
            <h2 className="cta-h">Seen enough?<br /><em>Let's build your campaign.</em></h2>
            <p className="cta-p">Book a 30-minute call and we'll map out exactly what your budget gets — before you commit a penny.</p>
          </div>
          <div className="cta-actions">
            <a href="https://calendly.com/esaanwar/partner-with-clipsmart" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Start a campaign →
            </a>
            <span className="cta-note">Full refund if we don't hit your guaranteed views</span>
          </div>
        </div>
      </div>
    </>
  )
}
