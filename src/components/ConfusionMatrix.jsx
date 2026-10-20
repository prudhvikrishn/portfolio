import { useState } from 'react'
import { confusion, intentLabels } from '../data'

// Heatmap of the held-out test confusion matrix (818 queries).
// One-hue teal ramp, binned (counts span 1 to 239). Zero cells stay empty.

const BINS = [
  { max: 2, color: '#1d5c62', label: '1 to 2' },
  { max: 9, color: '#1f7a7e', label: '3 to 9' },
  { max: 49, color: '#25a8ad', label: '10 to 49' },
  { max: 149, color: '#5cc4c8', label: '50 to 149' },
  { max: Infinity, color: '#a3e2e4', label: '150 or more' },
]
const binOf = (v) => BINS.findIndex((b) => v <= b.max)

const SHORT = ['Balance', 'Card issue', 'Credit card app', 'Forgot PIN', 'Fraud', 'Loan', 'Password', 'Transaction']
const CELL = 46
const GAP = 2
const LEFT = 128
const TOP = 96
const SIZE = intentLabels.length

const ConfusionMatrix = () => {
  const [hover, setHover] = useState(null)
  const W = LEFT + SIZE * CELL + 8
  const H = TOP + SIZE * CELL + 8
  const total = confusion.flat().reduce((a, b) => a + b, 0)
  const correct = confusion.reduce((a, r, i) => a + r[i], 0)

  return (
    <div className="chart">
      <div className="matrix-scroll">
        <div className="chart-plot matrix-plot" onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Confusion matrix: ${correct} of ${total} test queries classified correctly`}>
            {SHORT.map((name, i) => (
              <g key={name}>
                <text
                  x={LEFT - 10}
                  y={TOP + i * CELL + CELL / 2 + 4}
                  textAnchor="end"
                  className={`chart-label ${hover && hover.r === i ? 'is-best' : ''}`}
                >
                  {name}
                </text>
                <text
                  transform={`translate(${LEFT + i * CELL + CELL / 2 + 4} ${TOP - 10}) rotate(-45)`}
                  className={`chart-label ${hover && hover.c === i ? 'is-best' : ''}`}
                >
                  {name}
                </text>
              </g>
            ))}
            {confusion.map((row, r) =>
              row.map((v, c) => {
                const b = v ? BINS[binOf(v)] : null
                const dim = hover && hover.r !== r && hover.c !== c
                const px = LEFT + c * CELL
                const py = TOP + r * CELL
                return (
                  <g
                    key={`${r}-${c}`}
                    onMouseEnter={() => setHover({ r, c, v })}
                    opacity={dim ? 0.45 : 1}
                  >
                    <rect
                      x={px + GAP / 2}
                      y={py + GAP / 2}
                      width={CELL - GAP}
                      height={CELL - GAP}
                      rx="2"
                      fill={b ? b.color : '#13161e'}
                      stroke={r === c ? '#c49a52' : 'none'}
                      strokeOpacity=".55"
                    />
                    {v > 0 && (
                      <text x={px + CELL / 2} y={py + CELL / 2 + 4} textAnchor="middle" className="matrix-num" fill={binOf(v) >= 3 ? '#0b0d11' : '#eef0f4'}>
                        {v}
                      </text>
                    )}
                  </g>
                )
              }),
            )}
          </svg>
          {hover && (
            <div
              className="chart-tip"
              style={{ left: `${((LEFT + hover.c * CELL + CELL / 2) / W) * 100}%`, top: `${((TOP + hover.r * CELL) / H) * 100}%` }}
            >
              <strong>{hover.v} {hover.v === 1 ? 'query' : 'queries'}</strong>
              <span>True: {intentLabels[hover.r]}</span>
              <span>Predicted: {intentLabels[hover.c]}</span>
              <span className="tip-value">{hover.r === hover.c ? 'Correct' : 'Mistake'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="chart-foot">
        <ul className="chart-legend">
          {BINS.map((b) => (
            <li key={b.label}><span className="swatch" style={{ background: b.color }} />{b.label}</li>
          ))}
        </ul>
      </div>
      <p className="chart-caption">
        Rows are the true intent, columns the predicted intent; the outlined diagonal is correct.
        {' '}{correct} of {total} test queries were right ({((correct / total) * 100).toFixed(2)}%).
        13 of the 24 mistakes were predicted as Fraud Report.
      </p>
    </div>
  )
}

export default ConfusionMatrix
