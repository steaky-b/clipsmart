import { useState, useMemo } from 'react'
import './ROICalculator.css'

const STATIC_CHANNELS = [
  { label: 'Meta Ads', cpm: 10, color: '#4A90E2' },
  { label: 'Google Display', cpm: 8, color: '#E8A838' },
  { label: 'TV / Streaming', cpm: 25, color: '#9B59B6' },
]

function CPMChart({ rpm }) {
  const clipsmart = rpm
  const maxCpm = Math.max(clipsmart, ...STATIC_CHANNELS.map(c => c.cpm))
  const allBars = [
    { label: 'ClipSmart', cpm: clipsmart, color: '#2ECC71', highlight: true },
    ...STATIC_CHANNELS,
  ]
  return (
    <div className="cpm-bars">
      {allBars.map(({ label, cpm, color, highlight }) => {
        const pct = (cpm / maxCpm) * 100
        const savings = highlight ? null : Math.round(((cpm - clipsmart) / cpm) * 100)
        return (
          <div key={label} className={'cpm-bar-col' + (highlight ? ' cpm-bar-col--hl' : '')}>
            <div className="cpm-bar-amount" style={{ color: highlight ? color : 'var(--t1)' }}>
              ${cpm}<span className="cpm-bar-unit"> CPM</span>
            </div>
            <div className="cpm-bar-track">
              <div
                className="cpm-bar-fill"
                style={{ height: pct + '%', background: color, opacity: highlight ? 1 : 0.45 }}
              />
            </div>
            <div className="cpm-bar-name">{label}</div>
            {!highlight && savings > 0 && (
              <div className="cpm-bar-save">{savings}% more<br />expensive</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const PRESETS = [
  { label: 'Starter', budget: 1000 },
  { label: 'Growth', budget: 2500 },
  { label: 'Scale', budget: 5000 },
  { label: 'Custom', budget: null },
]

export default function ROICalculator() {
  const [budget, setBudget] = useState(2500)
  const [customBudget, setCustomBudget] = useState('')
  const [activePreset, setActivePreset] = useState(1)
  const [rpm, setRpm] = useState(1)

  const activeBudget = activePreset === 3 ? Number(customBudget) || 0 : budget

  const calc = useMemo(() => {
    const b = activeBudget
    const views = Math.round(b / rpm * 1000)
    const paidAdCpm = 10
    const paidAdSpend = Math.round((views / 1000) * paidAdCpm)
    const savings = paidAdSpend - b
    const savingsPct = paidAdSpend > 0 ? Math.round((savings / paidAdSpend) * 100) : 0
    return { views, paidAdSpend, savings, savingsPct }
  }, [activeBudget, rpm])

  const fmt = (n) => n >= 1_000_000
    ? (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    : n >= 1_000
    ? (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    : n.toString()

  return (
    <>
      <div className="page-hero">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>ROI Calculator</div>
        <h1>See exactly what your<br /><em>budget buys you.</em></h1>
        <p>Adjust your budget and RPM rate to see your guaranteed views and how much you save compared to paid ads.</p>
      </div>

      <div className="calc-section">
        <div className="calc-inner">
          {/* Controls */}
          <div className="calc-controls fade-up">
            <div className="calc-card">
              <div className="calc-card-head">
                <h3>Your Campaign Budget</h3>
                <p>Select a preset or enter a custom amount</p>
              </div>
              <div className="calc-presets">
                {PRESETS.map(({ label, budget: b }, i) => (
                  <button
                    key={label}
                    className={'calc-preset' + (activePreset === i ? ' on' : '')}
                    onClick={() => {
                      setActivePreset(i)
                      if (b !== null) setBudget(b)
                    }}
                  >
                    {label}
                    {b && <span>${b.toLocaleString()}</span>}
                  </button>
                ))}
              </div>
              {activePreset === 3 && (
                <div className="calc-custom-input">
                  <label>Custom amount ($)</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    placeholder="e.g. 3500"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                  />
                </div>
              )}
              <div className="calc-slider-wrap">
                <div className="calc-slider-labels">
                  <span>RPM Rate</span>
                  <span className="calc-rpm-val">${rpm} RPM</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={rpm}
                  onChange={(e) => setRpm(Number(e.target.value))}
                  className="calc-slider"
                />
                <div className="calc-slider-note">Standard rate is $1 RPM. Higher RPM = more creator incentive = more content.</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="calc-results fade-up">
            {/* Savings hero */}
            <div className="calc-savings-hero">
              <div className="calc-savings-label">You save vs. paid ads</div>
              <div className="calc-savings-val">
                {calc.savings > 0 ? `$${calc.savings.toLocaleString()}` : '—'}
              </div>
              {calc.savingsPct > 0 && (
                <div className="calc-savings-pct">{calc.savingsPct}% cheaper than running paid ads for the same reach</div>
              )}
            </div>

            {/* Secondary stats */}
            <div className="calc-trio">
              <div className="calc-trio-item">
                <div className="ct-val">{fmt(calc.views)}</div>
                <div className="ct-lbl">Guaranteed views</div>
                <div className="ct-sub">Minimum, hard-capped</div>
              </div>
              <div className="calc-trio-item">
                <div className="ct-val">${activeBudget.toLocaleString()}</div>
                <div className="ct-lbl">Your spend</div>
                <div className="ct-sub">No overrun ever</div>
              </div>
              <div className="calc-trio-item">
                <div className="ct-val ct-muted">${calc.paidAdSpend.toLocaleString()}</div>
                <div className="ct-lbl">Paid ads equivalent</div>
                <div className="ct-sub">At avg. $10 CPM</div>
              </div>
            </div>

            {/* CPM Comparison Bar Chart */}
            <div className="cpm-chart">
              <div className="cpm-chart-head">
                <div className="cpm-chart-label">CPM Comparison</div>
                <div className="cpm-chart-sub">Cost per 1,000 views — ClipSmart vs the alternatives</div>
              </div>
              <CPMChart rpm={rpm} />
            </div>

            <a
              href="https://calendly.com/esaanwar/partner-with-clipsmart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary calc-cta"
            >
              Lock in this budget →
            </a>
            <p className="calc-guarantee">Full refund if we don't hit your guaranteed views</p>
          </div>
        </div>
      </div>
    </>
  )
}
