// Project thumbnails. Real screenshots where they exist; otherwise a line-art
// schematic of what the project does (no numbers, so nothing reads as fake data).

const GOLD = '#c49a52'
const TEAL = '#25a8ad'
const DIM = '#3a4154'
const INK = '#0b0d11'

const Frame = ({ id, label, children }) => (
  <svg viewBox="0 0 320 200" role="img" aria-label={label} className="thumb-svg">
    <defs>
      <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#1e2230" />
      </pattern>
    </defs>
    <rect width="320" height="200" fill="#13161e" />
    <rect width="320" height="200" fill={`url(#dots-${id})`} />
    {children}
  </svg>
)

const LawDocx = () => (
  <Frame id="lawdocx" label="Illustration: a legal form turned into structured online fields">
    <rect x="70" y="22" width="130" height="160" fill={INK} stroke={DIM} />
    <rect x="84" y="36" width="70" height="7" fill={GOLD} />
    <rect x="84" y="49" width="45" height="4" fill={DIM} />
    {[66, 92, 118].map((y) => (
      <g key={y}>
        <rect x="84" y={y} width="34" height="4" fill={DIM} />
        <rect x="84" y={y + 8} width="102" height="12" fill="none" stroke={TEAL} />
      </g>
    ))}
    <rect x="84" y="148" width="9" height="9" fill="none" stroke={TEAL} />
    <path d="M86 152 l3 3 l5 -6" stroke={GOLD} strokeWidth="1.5" fill="none" />
    <rect x="98" y="151" width="40" height="4" fill={DIM} />
    <circle cx="172" cy="160" r="12" fill="none" stroke={GOLD} />
    <circle cx="172" cy="160" r="8" fill="none" stroke={GOLD} strokeOpacity=".5" />
    <path d="M214 102 h30" stroke={GOLD} />
    <path d="M238 96 l6 6 l-6 6" stroke={GOLD} fill="none" />
    <rect x="252" y="70" width="44" height="64" fill={INK} stroke={TEAL} />
    {[82, 96, 110].map((y) => (
      <rect key={y} x="260" y={y} width="28" height="6" fill="none" stroke={TEAL} strokeOpacity=".7" />
    ))}
  </Frame>
)

const Smtps = () => {
  const clusters = [
    { cx: 88, cy: 70, color: GOLD, pts: [[-14, -6], [-4, -14], [8, -8], [-10, 8], [4, 4], [14, 10], [0, 16]] },
    { cx: 170, cy: 132, color: TEAL, pts: [[-16, 0], [-6, -12], [6, -10], [14, 2], [-8, 10], [4, 12], [16, 14]] },
    { cx: 236, cy: 62, color: '#d97652', pts: [[-12, -8], [0, -14], [12, -4], [-8, 6], [6, 8], [16, 12]] },
  ]
  return (
    <Frame id="smtps" label="Illustration: smart meters grouped into risk clusters by K-Means">
      {clusters.map((c) => (
        <g key={c.cx}>
          <circle cx={c.cx} cy={c.cy} r="30" fill="none" stroke={c.color} strokeOpacity=".35" />
          {c.pts.map(([dx, dy]) => (
            <circle key={`${dx}${dy}`} cx={c.cx + dx} cy={c.cy + dy} r="3" fill={c.color} />
          ))}
          <path d={`M${c.cx - 5} ${c.cy - 5} l10 10 M${c.cx + 5} ${c.cy - 5} l-10 10`} stroke="#eef0f4" strokeWidth="1.5" />
        </g>
      ))}
      <g transform="translate(40 150)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 6} y={-i * 6} width="64" height="26" fill={INK} stroke={i === 2 ? GOLD : DIM} />
        ))}
        <rect x="20" y="-6" width="30" height="4" fill={GOLD} />
        <rect x="20" y="2" width="20" height="3" fill={DIM} />
      </g>
    </Frame>
  )
}

const Docking = () => {
  // hexagon ring ligand
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return [196 + 16 * Math.cos(a), 92 + 16 * Math.sin(a)]
  })
  return (
    <Frame id="docking" label="Illustration: a small molecule docking into a protein binding pocket">
      <path
        d="M30 40 C 90 20, 130 60, 150 70 C 170 80, 160 120, 175 130 C 200 150, 240 140, 250 120 C 262 98, 300 110, 300 150 L 300 190 L 30 190 Z"
        fill={INK}
        stroke={TEAL}
      />
      <path d="M48 60 C 96 46, 128 80, 138 90" stroke={TEAL} strokeOpacity=".35" fill="none" />
      <polygon points={hex.map((p) => p.join(',')).join(' ')} fill="none" stroke={GOLD} strokeWidth="1.5" />
      {hex.map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill={GOLD} />
      ))}
      <path d="M212 92 l22 -14 M234 78 l14 8 M196 76 l-6 -20" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="248" cy="86" r="4" fill={TEAL} />
      <circle cx="190" cy="56" r="4" fill="#d97652" />
      <path d="M196 110 v14" stroke="#eef0f4" strokeOpacity=".5" />
      <path d="M190 120 l6 6 l6 -6" stroke="#eef0f4" strokeOpacity=".5" fill="none" />
    </Frame>
  )
}

const Logistic = () => {
  const curve = Array.from({ length: 41 }, (_, i) => {
    const x = 50 + i * 5.5
    const t = (i - 20) / 4
    const y = 160 - 120 / (1 + Math.exp(-t))
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
  const low = [62, 78, 94, 110, 124, 140, 150]
  const high = [176, 190, 204, 216, 232, 248, 262]
  return (
    <Frame id="logistic" label="Illustration: a logistic regression curve separating low-risk and high-risk patients">
      <path d="M50 170 H290 M50 170 V24" stroke={DIM} />
      <path d={curve} stroke={GOLD} strokeWidth="2" fill="none" />
      {low.map((x) => (
        <circle key={x} cx={x} cy="160" r="3.5" fill={TEAL} />
      ))}
      {high.map((x) => (
        <circle key={x} cx={x} cy="40" r="3.5" fill="#d97652" />
      ))}
      <path d="M170 24 V170" stroke="#eef0f4" strokeOpacity=".25" />
    </Frame>
  )
}

const ProjectThumb = ({ thumb }) => {
  if (!thumb) return null
  if (thumb.type === 'image') {
    return <img src={thumb.src} alt={thumb.alt} loading="lazy" width="1280" height="900" className="thumb-img" />
  }
  const ART = { lawdocx: LawDocx, smtps: Smtps, docking: Docking, logistic: Logistic }
  const Art = ART[thumb.type]
  return Art ? <Art /> : null
}

export default ProjectThumb
