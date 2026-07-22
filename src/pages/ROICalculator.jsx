import { useState, useMemo } from 'react'
import './ROICalculator.css'

const PLATFORMS = [
  { label: 'ClipSmart', cpmKey: 'clipsmart', color: '#2ECC71', highlight: true },
  { label: 'Google Display', cpm: 3, color: '#4A90E2' },
  { label: 'Meta Ads', cpm: 8, color: '#E8A838' },
  { label: 'TV / Streaming', cpm: 25, color: '#9B59B6' },
]

const BUDGET_STEP = 100
const CPM_STEP = 0.25
const MIN_BUDGET = 500
const MAX_BUDGET = 50000
const MIN_CPM = 0.50
const MAX_CPM = 5.00

export default function ROICalculator() {
  const [budget, setBudget] = useState(2500)
  const [cpm, setCpm] = useState(1.00)

  const calc = useMemo(() => {
    const views = Math.round((budget / cpm) * 1000)
    const costPerView = cpm / 1000
    const costPer1M = cpm * 1000
    const rows = PLATFORMS.map((p) => {
      const platformCpm = p.highlight ? cpm : p.cpm
      const platformViews = Math.round((budget / platformCpm) * 1000)
      return { ...p, platformCpm, platformViews }
    })
    const maxViews = Math.max(...rows.map((r) => r.platformViews))
    return { views, costPerView, costPer1M, rows, maxViews }
  }, [budget, cpm])

  const fmt = (n) =>
    n >= 1_000_000
      ? (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M'
      : n >= 1_000
      ? Math.round(n).toLocaleString()
      : n.toString()

  const nudgeBudget = (dir) =>
    setBudget((b) => Math.min(MAX_BUDGET, Math.max(MIN_BUDGET, b + dir * BUDGET_STEP)))
  const nudgeCpm = (dir) =>
    setCpm((r) => {
      const next = Math.round((r + dir * CPM_STEP) * 100) / 100
      return Math.min(MAX_CPM, Math.max(MIN_CPM, next))
    })

  return (
    <>
      <div className="roi-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>ROI Calculator</div>
        <h1>Calculate your <em>ROI</em></h1>
        <p>
          Enter your budget and ClipSmart CPM to see what that same budget could generate
          across other advertising platforms.
        </p>
      </div>

      <div className="roi-section">
        <div className="roi-stack">

          {/* CARD 1 — Inputs + estimate */}
          <div className="roi-card fade-up">
            <div className="roi-card-title">Your campaign estimate</div>
            <div className="roi-estimate">
              <div className="roi-inputs">
                <div className="roi-field">
                  <label>Budget</label>
                  <div className="roi-field-row">
                    <div className="roi-field-value">
                      <span className="roi-currency">$</span>
                      <input
                        type="number"
                        min={MIN_BUDGET}
                        max={MAX_BUDGET}
                        step={BUDGET_STEP}
                        value={budget}
                        onChange={(e) => setBudget(Math.max(0, Number(e.target.value) || 0))}
                      />
                    </div>
                    <div className="roi-steppers">
                      <span className="roi-step-hint">Changes by ${BUDGET_STEP}</span>
                      <div className="roi-step-btns">
                        <button type="button" onClick={() => nudgeBudget(-1)} aria-label="Decrease budget">−</button>
                        <button type="button" onClick={() => nudgeBudget(1)} aria-label="Increase budget">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="roi-field">
                  <label>ClipSmart CPM</label>
                  <div className="roi-field-row">
                    <div className="roi-field-value">
                      <span className="roi-currency">$</span>
                      <input
                        type="number"
                        min={MIN_CPM}
                        max={MAX_CPM}
                        step={CPM_STEP}
                        value={cpm.toFixed(2)}
                        onChange={(e) => setCpm(Math.max(0.01, Number(e.target.value) || 0.01))}
                      />
                    </div>
                    <div className="roi-steppers">
                      <span className="roi-step-hint">Changes by ${CPM_STEP.toFixed(2)}</span>
                      <div className="roi-step-btns">
                        <button type="button" onClick={() => nudgeCpm(-1)} aria-label="Decrease CPM">−</button>
                        <button type="button" onClick={() => nudgeCpm(1)} aria-label="Increase CPM">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="roi-summary">
                <div className="roi-summary-label">qualified short-form views</div>
                <div className="roi-summary-views">{calc.views.toLocaleString()}</div>
                <div className="roi-summary-grid">
                  <div className="roi-sg-item">
                    <div className="roi-sg-v">${budget.toLocaleString()}</div>
                    <div className="roi-sg-l">Budget</div>
                  </div>
                  <div className="roi-sg-item">
                    <div className="roi-sg-v">${cpm.toFixed(2)}</div>
                    <div className="roi-sg-l">ClipSmart CPM</div>
                  </div>
                  <div className="roi-sg-item">
                    <div className="roi-sg-v">${calc.costPerView.toFixed(4)}</div>
                    <div className="roi-sg-l">Cost per view</div>
                  </div>
                  <div className="roi-sg-item">
                    <div className="roi-sg-v">${calc.costPer1M.toLocaleString()}</div>
                    <div className="roi-sg-l">Cost per 1M views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2 — Platform comparison table */}
          <div className="roi-card fade-up">
            <div className="roi-card-title">What your budget buys on each platform</div>
            <div className="roi-table">
              <div className="roi-table-head">
                <span>Platform</span>
                <span>CPM</span>
                <span>Total views</span>
              </div>
              {calc.rows.map(({ label, platformCpm, platformViews, color, highlight }) => (
                <div key={label} className={'roi-table-row' + (highlight ? ' roi-table-row--hl' : '')}>
                  <span className="roi-platform">
                    <span className="roi-dot" style={{ background: color }} />
                    {label}
                  </span>
                  <span className="roi-cpm">${platformCpm.toFixed(2)}</span>
                  <span className="roi-views">{platformViews.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 3 — Horizontal bar chart */}
          <div className="roi-card fade-up">
            <div className="roi-card-title">How much farther your budget goes</div>
            <div className="roi-hbar-list">
              {calc.rows.map(({ label, platformViews, color, highlight }) => {
                const pct = Math.max(4, (platformViews / calc.maxViews) * 100)
                return (
                  <div key={label} className="roi-hbar-row">
                    <div className="roi-hbar-label">{label}</div>
                    <div className="roi-hbar-track">
                      <div
                        className={'roi-hbar-fill' + (highlight ? ' roi-hbar-fill--hl' : '')}
                        style={{ width: pct + '%', background: color }}
                      >
                        <span className="roi-hbar-val">{fmt(platformViews)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <a
            href="https://calendly.com/esaanwar/partner-with-clipsmart"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary roi-cta fade-up"
          >
            Lock in this budget →
          </a>
          <p className="roi-guarantee">Full refund if we don't hit your guaranteed views</p>
        </div>
      </div>
    </>
  )
}
