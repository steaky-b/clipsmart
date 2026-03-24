import { useState, useMemo } from 'react'
import './ROICalculator.css'

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
    const cpm = rpm
    const paidAdCpm = 10
    const paidAdSpend = Math.round((views / 1000) * paidAdCpm)
    const savings = paidAdSpend - b
    const savingsPct = Math.round((savings / paidAdSpend) * 100)
    return { views, cpm, paidAdSpend, savings, savingsPct }
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
        <p>Adjust your budget and see guaranteed views, effective CPM, and what you'd pay for the same reach on paid ads.</p>
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
            <div className="calc-main-result">
              <div className="calc-mr-label">Guaranteed Minimum Views</div>
              <div className="calc-mr-val">{fmt(calc.views)}</div>
              <div className="calc-mr-sub">at ${rpm} RPM · ${activeBudget.toLocaleString()} budget</div>
            </div>

            <div className="calc-metrics">
              <div className="calc-metric">
                <div className="cm-val">${calc.cpm}</div>
                <div className="cm-lbl">Your effective CPM</div>
                <div className="cm-sub">Cost per 1,000 views</div>
              </div>
              <div className="calc-metric">
                <div className="cm-val">${activeBudget.toLocaleString()}</div>
                <div className="cm-lbl">Your total spend</div>
                <div className="cm-sub">Hard cap — no overrun</div>
              </div>
            </div>

            <div className="calc-vs">
              <div className="calc-vs-head">ClipSmart vs Paid Ads</div>
              <div className="calc-vs-row">
                <div className="calc-vs-col them">
                  <div className="calc-vs-col-label">Paid Ads (avg. $10 CPM)</div>
                  <div className="calc-vs-col-val">${calc.paidAdSpend.toLocaleString()}</div>
                  <div className="calc-vs-col-sub">for {fmt(calc.views)} views</div>
                </div>
                <div className="calc-vs-divider">vs</div>
                <div className="calc-vs-col us">
                  <div className="calc-vs-col-label">ClipSmart</div>
                  <div className="calc-vs-col-val">${activeBudget.toLocaleString()}</div>
                  <div className="calc-vs-col-sub">for {fmt(calc.views)}+ views</div>
                </div>
              </div>
              {calc.savings > 0 && (
                <div className="calc-savings">
                  You save <strong>${calc.savings.toLocaleString()}</strong> ({calc.savingsPct}% less) vs paid ads
                </div>
              )}
            </div>

            <a
              href="https://calendly.com/esaanwar/partner-with-clipsmart"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary calc-cta"
            >
              Lock in this budget →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
