import { useState } from 'react'
import { featureSets, modelComparison } from '../data'

// Dot plot: validation Macro-F1 for 5 classifiers.
// The selected feature set is highlighted; the other feature sets are grey context.
// A dot plot (not bars) because all scores sit between 92% and 98%.

const W = 640
const ROW = 46
const LEFT = 150
const RIGHT = 96
const TOP = 16
const MIN = 92
const MAX = 98
const HIGHLIGHT = '#25a8ad'
const CONTEXT = '#5d6375'
const SURFACE = '#0b0d11'

const x = (v) => LEFT + ((v - MIN) / (MAX - MIN)) * (W - LEFT - RIGHT)

const ModelComparison = () => {
  const [fs, setFs] = useState(5) // Hybrid + NLP
  const [hover, setHover] = useState(null)
  const [table, setTable] = useState(false)
  const H = TOP + modelComparison.length * ROW + 34

  return (
    <div className="chart">
      <div className="chart-controls" role="group" aria-label="Feature set">
        {featureSets.map((name, i) => (
          <button key={name} type="button" className="filter filter-sm" aria-pressed={fs === i} onClick={() => setFs(i)}>
            {name}
          </button>
        ))}
      </div>

      {table ? (
        <div className="table-wrap">
          <table className="data-table">
            <caption>Validation Macro-F1 (%) by classifier and feature set</caption>
            <thead>
              <tr>
                <th scope="col">Classifier</th>
                {featureSets.map((f) => <th key={f} scope="col">{f}</th>)}
              </tr>
            </thead>
            <tbody>
              {modelComparison.map((r) => (
                <tr key={r.model}>
                  <th scope="row">{r.model}</th>
                  {r.scores.map((s, i) => <td key={featureSets[i]}>{s == null ? 'n/a' : s.toFixed(2)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="matrix-scroll">
        <div className="chart-plot dot-plot" onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Validation Macro-F1 by classifier for ${featureSets[fs]} features`}>
            {/* grid + axis */}
            {[92, 93, 94, 95, 96, 97, 98].map((t) => (
              <g key={t}>
                <line x1={x(t)} x2={x(t)} y1={TOP - 6} y2={H - 30} stroke="#1e2230" />
                <text x={x(t)} y={H - 12} textAnchor="middle" className="chart-tick">{t}%</text>
              </g>
            ))}
            {modelComparison.map((r, ri) => {
              const cy = TOP + ri * ROW + ROW / 2
              const sel = r.scores[fs]
              const best = r.model === 'LinearSVC' && fs === 5
              return (
                <g key={r.model}>
                  <line x1={LEFT} x2={W - RIGHT} y1={cy} y2={cy} stroke="#1e2230" />
                  <text x={LEFT - 14} y={cy + 4} textAnchor="end" className={`chart-label ${best ? 'is-best' : ''}`}>{r.model}</text>
                  {r.scores.map((s, i) =>
                    s == null || i === fs ? null : (
                      <g key={featureSets[i]} onMouseEnter={() => setHover({ model: r.model, fs: featureSets[i], v: s, cx: x(s), cy })}>
                        <circle cx={x(s)} cy={cy} r="12" fill="transparent" />
                        <circle cx={x(s)} cy={cy} r="4" fill={CONTEXT} stroke={SURFACE} strokeWidth="2" />
                      </g>
                    ),
                  )}
                  {sel == null ? (
                    <text x={W - RIGHT + 18} y={cy + 4} className="chart-note">n/a</text>
                  ) : (
                    <g
                      tabIndex={0}
                      onMouseEnter={() => setHover({ model: r.model, fs: featureSets[fs], v: sel, cx: x(sel), cy })}
                      onFocus={() => setHover({ model: r.model, fs: featureSets[fs], v: sel, cx: x(sel), cy })}
                      onBlur={() => setHover(null)}
                      aria-label={`${r.model}, ${featureSets[fs]}: ${sel.toFixed(2)}%`}
                    >
                      <circle cx={x(sel)} cy={cy} r="14" fill="transparent" />
                      <circle cx={x(sel)} cy={cy} r="6.5" fill={HIGHLIGHT} stroke={SURFACE} strokeWidth="2" />
                      <text x={W - RIGHT + 18} y={cy + 4} className={`chart-value ${best ? 'is-best' : ''}`}>{sel.toFixed(2)}%</text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
          {hover && (
            <div className="chart-tip" style={{ left: `${(hover.cx / W) * 100}%`, top: `${(hover.cy / H) * 100}%` }}>
              <strong>{hover.model}</strong>
              <span>{hover.fs} features</span>
              <span className="tip-value">{hover.v.toFixed(2)}% Macro-F1</span>
            </div>
          )}
        </div>
        </div>
      )}

      <div className="chart-foot">
        <ul className="chart-legend">
          <li><span className="swatch" style={{ background: HIGHLIGHT }} />{featureSets[fs]}</li>
          <li><span className="swatch" style={{ background: CONTEXT }} />Other feature sets</li>
        </ul>
        <button type="button" className="text-link small" onClick={() => setTable(!table)}>
          {table ? 'View as chart' : 'View as table'}
        </button>
      </div>
      <p className="chart-caption">
        Validation Macro-F1. The chosen model, LinearSVC on Hybrid + NLP features (97.82%), then
        scored 96.42% on the held-out test set. Naive Bayes only runs on BoW and TF-IDF because it
        needs non-negative features.
      </p>
    </div>
  )
}

export default ModelComparison
