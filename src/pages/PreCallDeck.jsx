import { useCallback, useEffect, useRef, useState } from 'react'
import { CAMPAIGNS } from './CaseStudies'
import './PreCallDeck.css'

const TOTAL_SLIDES = 11

const HIGHLIGHT_IDS = ['cpkshawn', 'murda', 'gains']

const DECK_VIDEO_SPECS = [
  { campaignId: 'cpkshawn', videoIndex: 0 },
  { campaignId: 'gains', videoIndex: 0 },
]

function getDeckVideos() {
  return DECK_VIDEO_SPECS.map(({ campaignId, videoIndex }) => {
    const c = CAMPAIGNS.find((x) => x.id === campaignId)
    if (!c?.videos?.[videoIndex]) return null
    const views = c.results.find((r) => r.l === 'Total views')?.v
    return {
      src: c.videos[videoIndex],
      name: c.name,
      views,
      niche: c.catLabel,
    }
  }).filter(Boolean)
}

const RFY_ITEMS = [
  { icon: '🛍', label: 'E-commerce & DTC' },
  { icon: '🎵', label: 'Music artists & producers' },
  { icon: '🎙', label: 'Podcasters & media' },
  { icon: '💪', label: 'Health & wellness' },
  { icon: '🏆', label: 'Sports & PPV' },
  { icon: '📱', label: 'Apps & digital products' },
]

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.82 4.82 0 0 1-1.01-.04z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

export default function PreCallDeck() {
  document.title = 'Before your call — ClipSmart'
  const [slide, setSlide] = useState(0)
  const touchStartX = useRef(null)
  const deckVideos = useRef(getDeckVideos()).current

  const next = useCallback(() => {
    setSlide((s) => Math.min(TOTAL_SLIDES - 1, s + 1))
  }, [])

  const prev = useCallback(() => {
    setSlide((s) => Math.max(0, s - 1))
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (e) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const end = e.changedTouches[0]?.clientX
    if (end == null) return
    const dx = end - start
    if (Math.abs(dx) < 48) return
    if (dx < 0) next()
    else prev()
  }

  const progress = ((slide + 1) / TOTAL_SLIDES) * 100

  const highlightCampaigns = HIGHLIGHT_IDS.map((id) => CAMPAIGNS.find((c) => c.id === id)).filter(Boolean)

  return (
    <div
      className="deck-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Pre-call presentation"
    >
      <header className="deck-top">
        <div className="deck-progress-track" aria-hidden>
          <div className="deck-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="deck-counter" aria-live="polite">
          {slide + 1} / {TOTAL_SLIDES}
        </span>
      </header>

      <div className="deck-stage">
        <div key={slide} className="deck-slide-panel">
          {slide === 0 && (
            <div className="deck-slide-inner">
              <div className="deck-logo-row">
                <img src="/logo.png" alt="" className="deck-logo-img" />
                <span className="deck-logo-text">ClipSmart</span>
              </div>
              <div className="deck-eyebrow">Before our call</div>
              <h1 className="deck-h1">
                Everything you need to know — <em>in a few minutes</em>
              </h1>
              <p className="deck-sub">
                Use the arrows or swipe. On the call we&apos;ll go deep on your numbers and next steps — this deck is so
                you&apos;re not starting from zero.
              </p>
              <p className="deck-tagline">Performance UGC · Pay only when content performs</p>
            </div>
          )}

          {slide === 1 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Context</div>
              <h1 className="deck-h1">
                Why brands are <em>tired</em> of the usual playbook
              </h1>
              <div className="deck-two-col">
                <div className="deck-card">
                  <h3>Paid ads</h3>
                  <ul>
                    <li>Often $8–15+ CPM before creative and management</li>
                    <li>Ad account risk, bans, and auction volatility</li>
                    <li>You rent reach — when the spend stops, the asset is gone</li>
                  </ul>
                </div>
                <div className="deck-card">
                  <h3>Traditional influencers</h3>
                  <ul>
                    <li>Flat fees up front — results are a hope, not a guarantee</li>
                    <li>One or few posts, not a flood of organic angles</li>
                    <li>Hard to scale without renegotiating every time</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {slide === 2 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">The offer</div>
              <h1 className="deck-h1">
                Pay per <em>1,000 organic views</em> — not flat creator fees
              </h1>
              <ul className="deck-bullets">
                <li>
                  <strong style={{ color: 'var(--white)' }}>$1,000 budget → 1M+ views guaranteed</strong> (minimum before
                  your campaign runs — same framing as the rest of the site)
                </li>
                <li>Creators post from their own accounts on short-form platforms — no &quot;Sponsored&quot; positioning</li>
                <li>
                  <strong style={{ color: 'var(--white)' }}>Hard budget cap</strong> — spend does not exceed what you set
                </li>
              </ul>
            </div>
          )}

          {slide === 3 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">How it works</div>
              <h1 className="deck-h1">
                Four steps from <em>budget</em> to views
              </h1>
              <div className="deck-steps">
                <div className="deck-step">
                  <div className="deck-step-num">01</div>
                  <div className="deck-step-title">Fund a campaign budget</div>
                  <div className="deck-step-body">You set the cap. Guaranteed minimum views are agreed before launch.</div>
                </div>
                <div className="deck-step">
                  <div className="deck-step-num">02</div>
                  <div className="deck-step-title">Creators post</div>
                  <div className="deck-step-body">Many creators ship original clips from their accounts across platforms.</div>
                </div>
                <div className="deck-step">
                  <div className="deck-step-num">03</div>
                  <div className="deck-step-title">Manual review</div>
                  <div className="deck-step-body">Every clip is reviewed. Off-brand or low quality does not count toward spend.</div>
                </div>
                <div className="deck-step">
                  <div className="deck-step-num">04</div>
                  <div className="deck-step-title">Pay for views that count</div>
                  <div className="deck-step-body">Only approved views deduct from your budget. Track clips in real time.</div>
                </div>
              </div>
              <p className="deck-timeline">
                Brief to the network in <strong style={{ color: 'var(--t1)' }}>24–48 hours</strong>. First clips often
                within <strong style={{ color: 'var(--t1)' }}>~16 hours</strong>. Many campaigns are{' '}
                <strong style={{ color: 'var(--t1)' }}>live in 48–72 hours</strong> after onboarding.
              </p>
            </div>
          )}

          {slide === 4 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Economics</div>
              <h1 className="deck-h1">
                Same budget — <em>very different</em> reach
              </h1>
              <p className="deck-sub" style={{ marginBottom: 8 }}>
                Illustrative comparison using ~$10 CPM paid social vs our ~$0.09 effective CPM on strong campaigns.
              </p>
              <div className="deck-econ-bars">
                <div>
                  <div className="deck-econ-label">Effective CPM (lower is better)</div>
                  <div className="deck-econ-row">
                    <div>
                      <div className="deck-econ-bar-wrap">
                        <div className="deck-econ-bar cs">~$0.09</div>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 6 }}>ClipSmart (example)</div>
                    </div>
                    <div>
                      <div className="deck-econ-bar-wrap">
                        <div className="deck-econ-bar ads">~$10</div>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 6 }}>Paid ads (ballpark)</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="deck-econ-note">
                At ~$10 CPM, <strong>$1,000</strong> buys on the order of <strong>100K impressions</strong>. With
                ClipSmart&apos;s guarantee, <strong>$1,000</strong> is tied to <strong>1M+ organic views</strong> minimum —
                plus you keep the organic footprint across creator accounts, not just one ad placement.
              </p>
            </div>
          )}

          {slide === 5 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Proof</div>
              <h1 className="deck-h1">
                Real campaigns — <em>real numbers</em>
              </h1>
              <div className="deck-case-grid">
                {highlightCampaigns.map((c) => (
                  <div key={c.id} className="deck-case-card">
                    <div className="deck-case-cat">{c.catLabel}</div>
                    <div className="deck-case-name">{c.name}</div>
                    <div className="deck-case-metrics">
                      {c.results.slice(0, 4).map(({ v, l }) => (
                        <div key={l} className="deck-case-m">
                          <strong>{v}</strong>
                          <span>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 6 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Example content</div>
              <h1 className="deck-h1">
                This is what <em>creator clips</em> look like
              </h1>
              <p className="deck-sub" style={{ marginBottom: 4 }}>
                Two samples from real campaigns (music + e-commerce).
              </p>
              <div className="deck-videos">
                {deckVideos.map((v) => (
                  <div key={v.src} className="deck-video-wrap">
                    <video src={v.src} controls muted playsInline preload="metadata" />
                    <div className="deck-video-cap">
                      <strong>{v.name}</strong>
                      {v.views} views · {v.niche}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slide === 7 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Scale</div>
              <h1 className="deck-h1">
                <em>80,000+</em> creators — three platforms
              </h1>
              <p className="deck-sub">
                Volume of authentic posts beats betting everything on one account or one flat-fee deal. Content ships as
                organic posts — no &quot;Sponsored&quot; label — so it reads like real recommendations, not ads.
              </p>
              <div className="deck-platforms">
                <span>
                  <IconTikTok /> TikTok
                </span>
                <span>
                  <IconInstagram /> Instagram Reels
                </span>
                <span>
                  <IconYouTube /> YouTube Shorts
                </span>
              </div>
              <p className="deck-timeline" style={{ marginTop: 22 }}>
                Niches we run often: e-commerce, music, podcasts, health &amp; fitness, sports &amp; PPV, apps, and more —
                anywhere audiences already watch short-form video.
              </p>
            </div>
          )}

          {slide === 8 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Risk</div>
              <h1 className="deck-h1">
                Guarantee, cap, and <em>quality control</em>
              </h1>
              <ul className="deck-bullets">
                <li>
                  <strong style={{ color: 'var(--white)' }}>Money back</strong> if the agreed minimum views are not met
                  (details and timing are in your agreement — we&apos;ll cover this on the call)
                </li>
                <li>You are never charged beyond your agreed campaign budget</li>
                <li>Clips that fail review do not count — you don&apos;t pay for off-brand or low-quality submissions</li>
              </ul>
            </div>
          )}

          {slide === 9 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">Fit</div>
              <h1 className="deck-h1">
                Who this works <em>best</em> for
              </h1>
              <div className="deck-niche-grid">
                {RFY_ITEMS.map(({ icon, label }) => (
                  <div key={label} className="deck-niche">
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <p className="deck-econ-note" style={{ marginTop: 22 }}>
                Simple rule: <strong>If your audience watches short-form video, this model can work.</strong> On the call
                we&apos;ll sanity-check your niche, offer, and creative angles.
              </p>
            </div>
          )}

          {slide === 10 && (
            <div className="deck-slide-inner">
              <div className="deck-eyebrow">On the call</div>
              <h1 className="deck-h1">
                Not another pitch — <em>your</em> plan
              </h1>
              <ul className="deck-bullets">
                <li>Budget recommendation and view projections for your situation</li>
                <li>How we&apos;d brief creators for your brand or release</li>
                <li>Timeline, guarantee, and what &quot;good&quot; looks like for your KPIs</li>
                <li>Concrete next steps if you want to move forward</li>
              </ul>
              <p className="deck-econ-note" style={{ marginTop: 24, fontSize: 16 }}>
                <strong>You&apos;re all set.</strong> See you on the call — bring your goals and questions.
              </p>
            </div>
          )}
        </div>
      </div>

      <nav className="deck-nav" aria-label="Slide navigation">
        <button type="button" className="deck-nav-btn" onClick={prev} disabled={slide === 0} aria-label="Previous slide">
          ← Back
        </button>
        <button
          type="button"
          className="deck-nav-btn primary"
          onClick={next}
          disabled={slide === TOTAL_SLIDES - 1}
          aria-label="Next slide"
        >
          Next →
        </button>
      </nav>
    </div>
  )
}
