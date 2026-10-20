// Intro reel (10 s). Motion style adapted from @0xValure's reel in awesome-opus5-5-videos;
// all text is about Prudhvi's own work.
// Scenes: 01 PROMPT · 02 TYPE · 03 SIGNAL · 04 BUILD · 05 FIELD · 06 LOCKUP.
// runReel(root, { quick, reduce, isPageLoaded, onDone }) builds everything inside `root`
// and returns a cleanup function.
import { gsap } from 'gsap'

const SQ3 = Math.sqrt(3)
const BUILD_SCALE = 1.9 // logo size in the build scene, relative to the lockup size

// ---------- logo geometry (pointy-top hexagon split into three faces by a Y) ----------
const HEX = [
  [0, -1], [SQ3 / 2, -0.5], [SQ3 / 2, 0.5], [0, 1], [-SQ3 / 2, 0.5], [-SQ3 / 2, -0.5],
]
export function logoSVG(cls = '') {
  const pts = HEX.map((p) => p.join(',')).join(' ')
  return `<svg class="${cls}" viewBox="-1.12 -1.12 2.24 2.24" aria-hidden="true">
    <polygon points="${pts}" fill="#f2f2f0" stroke="#f2f2f0" stroke-width="0.14" stroke-linejoin="round"/>
    <g stroke="#050505" stroke-width="0.075" stroke-linecap="round">
      <line x1="0" y1="0" x2="0" y2="-1.2"/>
      <line x1="0" y1="0" x2="${-SQ3 / 2 * 1.2}" y2="${0.5 * 1.2}"/>
      <line x1="0" y1="0" x2="${SQ3 / 2 * 1.2}" y2="${0.5 * 1.2}"/>
    </g>
    <circle cx="0" cy="0" r="0.085" fill="#050505"/>
  </svg>`
}

const HUD = `
  <div class="rl-hud">
    <span class="rl-corner tl"></span><span class="rl-corner tr"></span>
    <span class="rl-corner bl"></span><span class="rl-corner br"></span>
    <p class="rl-meta tl">PRUDHVI KRISHNA&nbsp;&nbsp;/&nbsp;&nbsp;<span class="rl-chapter">01 PROMPT</span></p>
    <p class="rl-meta tr">PORTFOLIO · 2026</p>
    <p class="rl-meta bl"><span class="rl-tc">TC 00:00:00:00</span>&nbsp;&nbsp;&nbsp;<span class="rl-frame">F 0000</span></p>
    <p class="rl-meta br">EVERY FRAME IS CODE</p>
    <div class="rl-scrub"><div class="rl-scrub-bar"></div></div>
  </div>`

const MARKUP = `
  <div class="rl-bg"></div>
  <canvas class="rl-field"></canvas>

  <section class="rl-scene rl-prompt">
    <div class="rl-prompt-head"><span>&gt; PRUDHVI_DS&nbsp;&nbsp;·&nbsp;&nbsp;READY</span><span class="rl-sending">RUNNING…</span></div>
    <div class="rl-bar">
      <span class="rl-bar-logo">${logoSVG()}</span>
      <span class="rl-typed"></span><span class="rl-caret"></span>
      <span class="rl-send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="#050505" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    </div>
  </section>

  <section class="rl-scene rl-word rl-data">
    <p class="rl-echo up">DATA</p><p class="rl-solid">DATA</p><p class="rl-echo down">DATA</p>
  </section>

  <section class="rl-scene rl-word rl-tobuy">
    <div class="rl-select">
      <span class="rl-dims">1482 × 300</span>
      <p class="rl-solid">TO MODELS</p>
      <i class="h h1"></i><i class="h h2"></i><i class="h h3"></i><i class="h h4"></i>
      <i class="h h5"></i><i class="h h6"></i><i class="h h7"></i><i class="h h8"></i>
    </div>
  </section>

  <section class="rl-scene rl-word rl-live"><p class="rl-solid"><span class="rl-dot"></span>LIVE</p></section>

  <section class="rl-scene rl-marquee"></section>
  <div class="rl-glitch"></div>

  <section class="rl-scene rl-build">
    <svg class="rl-rings" viewBox="-500 -500 1000 1000" aria-hidden="true">
      <circle class="ring r1" r="260"/><circle class="ring r2" r="500"/>
      <g class="ticks"></g>
      <line class="cross" x1="-560" y1="0" x2="-310" y2="0"/><line class="cross" x1="310" y1="0" x2="560" y2="0"/>
      <line class="cross" x1="0" y1="-540" x2="0" y2="-500"/><line class="cross" x1="0" y1="500" x2="0" y2="540"/>
    </svg>
    <div class="rl-readout left"><p>FACES 03 / 06</p><p>PROJ&nbsp;&nbsp;ORTHO</p></div>
    <div class="rl-readout right">
      <p>ROT.X&nbsp;&nbsp;&nbsp;<span class="rx">0.0°</span></p>
      <p>ROT.Y&nbsp;&nbsp;&nbsp;<span class="ry">0.0°</span></p>
      <p>ROT.Z&nbsp;&nbsp;&nbsp;<span class="rz">0.0°</span></p>
      <p class="rl-locked">ISO 35.26°&nbsp;&nbsp;■ LOCKED</p>
    </div>
    <canvas class="rl-cube"></canvas>
    <div class="rl-orbit">${'<i></i>'.repeat(6)}</div>
  </section>

  <div class="rl-logo-wrap">${logoSVG('rl-logo')}</div>

  <section class="rl-scene rl-lockup">
    <p class="rl-wordmark"><span>P</span><span>r</span><span>u</span><span>d</span><span>h</span><span>v</span><span>i</span><span>&nbsp;</span><span>K</span><span>r</span><span>i</span><span>s</span><span>h</span><span>n</span><span>a</span></p>
    <p class="rl-tagline"><span class="rl-tag-text"></span><span class="rl-tag-caret"></span></p>
    <i class="rl-rule"></i>
  </section>

  ${HUD}
  <div class="rl-grain"></div>
  <button class="rl-skip" type="button">Skip intro</button>`

export function runReel(root, { quick = false, reduce = false, isPageLoaded = () => true, onDone = () => {} } = {}) {
  root.innerHTML = MARKUP
  const $ = (s) => root.querySelector(s)
  const timers = []
  let finished = false
  let three = null // { renderer, scene, camera, cube, dispose }
  const finish = () => {
    if (finished) return
    finished = true
    onDone()
  }

  // ---------- marquee rows ----------
  const marquee = $('.rl-marquee')
  const styles = ['fill', 'outline', 'dim', 'fill', 'invert', 'dim', 'fill', 'outline', 'dim']
  styles.forEach((st, i) => {
    const row = document.createElement('div')
    row.className = `rl-row ${st}`
    row.textContent = 'PRUDHVI KRISHNA · '.repeat(8)
    row.dataset.dir = i % 2 ? '1' : '-1'
    marquee.appendChild(row)
  })

  // ---------- HUD ticks ----------
  const ticks = $('.ticks')
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * Math.PI * 2
    const r1 = 282
    const r2 = i % 6 === 0 ? 302 : 292
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    l.setAttribute('x1', (Math.cos(a) * r1).toFixed(1)); l.setAttribute('y1', (Math.sin(a) * r1).toFixed(1))
    l.setAttribute('x2', (Math.cos(a) * r2).toFixed(1)); l.setAttribute('y2', (Math.sin(a) * r2).toFixed(1))
    ticks.appendChild(l)
  }

  // ---------- cube field (canvas 2D) ----------
  const field = $('.rl-field')
  const fctx = field.getContext('2d')
  let cells = []
  let fieldW = 0
  let fieldH = 0
  const fieldState = { grow: 0, wave: 0, shrink: 0, alpha: 0 }
  const layoutField = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    fieldW = root.clientWidth
    fieldH = root.clientHeight
    field.width = fieldW * dpr
    field.height = fieldH * dpr
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const r = Math.max(22, Math.min(fieldW, fieldH) / 15)
    const w = SQ3 * r
    const rowH = 1.5 * r
    cells = []
    const cx = fieldW / 2
    const cy = fieldH / 2
    for (let row = -Math.ceil(fieldH / rowH / 2) - 1; row <= Math.ceil(fieldH / rowH / 2) + 1; row++) {
      for (let col = -Math.ceil(fieldW / w / 2) - 1; col <= Math.ceil(fieldW / w / 2) + 1; col++) {
        const x = cx + col * w + (row % 2 ? w / 2 : 0)
        const y = cy + row * rowH
        const d = Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy)
        cells.push({ x, y, d, r, centre: row === 0 && col === 0 })
      }
    }
  }
  const drawCell = (x, y, r, s, light) => {
    if (s <= 0.01) return
    const k = r * s * 0.86
    const P = HEX.map(([a, b]) => [x + a * k, y + b * k])
    const C = [x, y]
    const faces = [
      [[P[0], C, P[4], P[5]], 0.72],
      [[P[0], P[1], P[2], C], 0.42],
      [[C, P[2], P[3], P[4]], 0.96],
    ]
    faces.forEach(([poly, shade]) => {
      const v = Math.round(255 * Math.min(1, shade * light))
      fctx.fillStyle = `rgb(${v},${v},${v})`
      fctx.beginPath()
      poly.forEach(([px, py], i) => (i ? fctx.lineTo(px, py) : fctx.moveTo(px, py)))
      fctx.closePath()
      fctx.fill()
    })
  }
  const renderField = () => {
    fctx.clearRect(0, 0, fieldW, fieldH)
    if (fieldState.alpha <= 0) return
    fctx.globalAlpha = fieldState.alpha
    cells.forEach((c) => {
      if (c.centre) return
      const grow = gsap.utils.clamp(0, 1, fieldState.grow * 1.6 - c.d * 0.9)
      const shrink = gsap.utils.clamp(0, 1, fieldState.shrink * 1.6 - (1 - c.d) * 0.6)
      const s = grow * (1 - shrink)
      const wave = 0.55 + 0.45 * Math.cos((c.d * 7 - fieldState.wave * 9))
      drawCell(c.x, c.y, c.r, s * (0.9 + 0.1 * wave), 0.35 + 0.65 * wave * (1 - c.d * 0.45))
    })
    fctx.globalAlpha = 1
  }

  // ---------- three.js open box (loaded in the background) ----------
  // Three separate panels (front, right, bottom) meeting at one corner, with seams
  // between them and a curved inner corner on each panel. Seen straight on at that
  // corner, the open box lines up exactly with the flat logo.
  const cubeCanvas = $('.rl-cube')
  const cubeState = { p: 0, s: 0, spin: 0 }
  if (!reduce) {
    import('three').then((THREE) => {
      if (finished) return
      const renderer = new THREE.WebGLRenderer({ canvas: cubeCanvas, antialias: true, alpha: true, preserveDrawingBuffer: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 20)
      camera.position.set(0, 0, 8)

      // One panel in 2D: the shared corner sits at (0,0); a seam gap runs along the two
      // edges that touch it; that corner gets a large curve, the others a small one.
      const G = 0.05
      const RB = 0.24
      const rs = 0.05
      const shape = new THREE.Shape()
      shape.moveTo(G + RB, G)
      shape.lineTo(1 - rs, G)
      shape.quadraticCurveTo(1, G, 1, G + rs)
      shape.lineTo(1, 1 - rs)
      shape.quadraticCurveTo(1, 1, 1 - rs, 1)
      shape.lineTo(G + rs, 1)
      shape.quadraticCurveTo(G, 1, G, 1 - rs)
      shape.lineTo(G, G + RB)
      shape.quadraticCurveTo(G, G, G + RB, G)
      const panelGeo = new THREE.ShapeGeometry(shape, 24)
      const outlinePts = shape.getPoints(24).map((v) => new THREE.Vector3(v.x, v.y, 0))
      const outlineGeo = new THREE.BufferGeometry().setFromPoints(outlinePts)

      const mat = new THREE.MeshStandardMaterial({ color: '#efefed', roughness: 0.6, metalness: 0, side: THREE.DoubleSide, emissive: '#ffffff', emissiveIntensity: 0 })
      const lineMat = new THREE.LineBasicMaterial({ color: '#f2f2f0', transparent: true, opacity: 0.45 })

      const box = new THREE.Group()
      const C = new THREE.Vector3(0.5, -0.5, 0.5) // the corner that faces the camera at the end
      const C2 = C.clone().negate()              // the opposite corner
      // [corner, u, v, isFront]: each panel starts at its corner and grows inward along u and v
      const faces = [
        [C, new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, 0), true],   // front  (z = +0.5)
        [C, new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 1, 0), true],   // right  (x = +0.5)
        [C, new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, -1), true],  // bottom (y = -0.5)
        [C2, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, -1, 0), false], // back   (z = -0.5)
        [C2, new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, -1, 0), false], // left   (x = -0.5)
        [C2, new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), false],  // top    (y = +0.5)
      ]
      const backPanels = []
      const outlineSet = new THREE.Group()
      faces.forEach(([corner, u, v, front]) => {
        const n = new THREE.Vector3().crossVectors(u, v)
        const out = corner.clone().normalize().dot(n) < 0 ? -1 : 1 // push outlines outward
        const panel = new THREE.Mesh(panelGeo, mat)
        panel.applyMatrix4(new THREE.Matrix4().makeBasis(u, v, n).setPosition(corner))
        box.add(panel)
        if (!front) backPanels.push(panel)
        const line = new THREE.LineLoop(outlineGeo, lineMat)
        line.applyMatrix4(new THREE.Matrix4().makeBasis(u, v, n).setPosition(corner.clone().addScaledVector(n, -0.02 * out)))
        outlineSet.add(line)
      })
      box.add(outlineSet)
      const holder = new THREE.Group()
      holder.add(box)
      scene.add(holder)
      // ghost outlines that trail the rotation (the faint lines around the box)
      const ghosts = [0.32, 0.2, 0.11].map((op) => {
        const gm = new THREE.LineBasicMaterial({ color: '#f2f2f0', transparent: true, opacity: op })
        const g = outlineSet.clone()
        g.traverse((o) => { if (o.isLine) o.material = gm })
        const gh = new THREE.Group()
        gh.add(g)
        scene.add(gh)
        return { group: gh, mat: gm, base: op }
      })
      const history = []

      // Final pose: the shared corner points straight at the camera, the front/right seam points up
      const z = C.clone().normalize()
      const x = new THREE.Vector3(0, 1, 0).cross(z).normalize()
      const y = new THREE.Vector3().crossVectors(z, x)
      const qFinal = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(x, y, z).transpose())
      const qStart = new THREE.Quaternion().setFromEuler(new THREE.Euler(2.1, -2.6, 0.9))

      scene.add(new THREE.AmbientLight('#ffffff', 0.35))
      const key = new THREE.DirectionalLight('#ffffff', 2.6)
      key.position.set(-4, -1.5, 2)
      scene.add(key)
      const fill = new THREE.DirectionalLight('#ffffff', 0.35)
      fill.position.set(3, 2, 3)
      scene.add(fill)

      three = {
        THREE, renderer, scene, camera, holder, mat, lineMat, qStart, qFinal, ghosts, history, backPanels,
        dispose: () => { panelGeo.dispose(); outlineGeo.dispose(); mat.dispose(); lineMat.dispose(); ghosts.forEach((g) => g.mat.dispose()); renderer.dispose() },
      }
      sizeCube()
    }).catch(() => { /* the flat logo still plays if 3D is unavailable */ })
  }
  const sizeCube = () => {
    if (!three) return
    const w = cubeCanvas.clientWidth
    const h = cubeCanvas.clientHeight
    if (!w || !h) return
    three.renderer.setSize(w, h, false)
    const aspect = w / h
    three.camera.left = -aspect
    three.camera.right = aspect
    three.camera.top = 1
    three.camera.bottom = -1
    three.camera.updateProjectionMatrix()
  }
  const spinQ = { q: null }
  const renderCube = () => {
    if (!three) return
    const { THREE } = three
    // hexagon height on screen should match the flat logo: 1.633 * side = logo height
    const logoH = $('.rl-logo-wrap').clientHeight * 0.89 * BUILD_SCALE
    const side = logoH / (1.633 * (cubeCanvas.clientHeight / 2))
    three.holder.scale.setScalar(Math.max(0.0001, side * cubeState.s))
    // tumble: slerp from the start pose to the final pose, with extra spin that unwinds to zero
    if (!spinQ.q) spinQ.q = new THREE.Quaternion()
    spinQ.q.setFromAxisAngle(new THREE.Vector3(0.25, 1, 0.15).normalize(), cubeState.spin)
    three.holder.quaternion.copy(three.qStart).slerp(three.qFinal, cubeState.p).premultiply(spinQ.q)
    // panels brighten to flat white and the outlines fade as the box locks into the logo
    const lock = Math.max(0, (cubeState.p - 0.75) / 0.25)
    three.mat.emissiveIntensity = lock * lock * 0.75
    // the back panels go just before the lock, so the seams show black like the flat logo
    three.backPanels.forEach((b) => { b.visible = cubeState.p < 0.9 })
    three.lineMat.opacity = 0.5 * (1 - lock)
    // ghosts follow the box a few frames behind, slightly larger
    three.history.unshift(three.holder.quaternion.clone())
    if (three.history.length > 12) three.history.pop()
    three.ghosts.forEach((g, i) => {
      const q = three.history[Math.min(three.history.length - 1, (i + 1) * 3)]
      g.group.quaternion.copy(q)
      g.group.scale.copy(three.holder.scale).multiplyScalar(1.03 + i * 0.025)
      g.mat.opacity = g.base * (1 - lock) * Math.min(1, cubeState.s)
    })
    three.renderer.render(three.scene, three.camera)
  }

  const onResize = () => { layoutField(); sizeCube() }
  window.addEventListener('resize', onResize)
  layoutField()

  // ---------- HUD timecode ----------
  const tcEl = $('.rl-tc')
  const frEl = $('.rl-frame')
  const scrub = $('.rl-scrub-bar')
  const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0')
  const setChapter = (txt) => { const el = $('.rl-chapter'); if (el) el.textContent = txt }

  // ---------- typing helper ----------
  const typer = (el, text) => {
    const o = { n: 0 }
    return gsap.to(o, {
      n: text.length, ease: 'none',
      onUpdate: () => { el.textContent = text.slice(0, Math.round(o.n)) },
    })
  }

  // ---------- reduced motion: show the lockup, no animation ----------
  if (reduce) {
    gsap.set('.rl-scene, .rl-glitch', { autoAlpha: 0 })
    gsap.set(root.querySelector('.rl-lockup'), { autoAlpha: 1 })
    gsap.set(root.querySelector('.rl-logo-wrap'), { autoAlpha: 1, xPercent: -50, yPercent: -50, x: () => -root.querySelector('.rl-logo-wrap').clientWidth * 1.57, scale: 0.86 })
    $('.rl-tag-text').textContent = 'data science · machine learning · NLP'
    setChapter('06 LOCKUP')
    const wait = () => {
      if (isPageLoaded()) gsap.to(root, { opacity: 0, duration: 0.4, delay: 0.8, onComplete: finish })
      else timers.push(setTimeout(wait, 100))
    }
    wait()
    $('.rl-skip').addEventListener('click', finish)
    return () => { timers.forEach(clearTimeout); window.removeEventListener('resize', onResize) }
  }

  // ---------- initial states ----------
  const q = gsap.utils.selector(root)
  gsap.set(q('.rl-scene'), { autoAlpha: 0 })
  gsap.set(q('.rl-hud'), { autoAlpha: 0 })
  gsap.set(q('.rl-bar'), { width: 0 })
  gsap.set(q('.rl-prompt-head'), { autoAlpha: 0, y: 6 })
  gsap.set(q('.rl-sending'), { autoAlpha: 0 })
  gsap.set(q('.rl-logo-wrap'), { autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 1 })
  gsap.set(q('.rl-wordmark span'), { yPercent: 110 })
  gsap.set(q('.rl-rule'), { scaleX: 0 })
  gsap.set(q('.rl-locked'), { autoAlpha: 0 })
  gsap.set(q('.rl-orbit i'), { autoAlpha: 0 })
  gsap.set(q('.rl-glitch'), { autoAlpha: 0, scaleX: 0 })
  gsap.set(q('.rl-rings .ring'), { strokeDasharray: 2600, strokeDashoffset: 2600 })
  gsap.set(q('.rl-rings .ticks line'), { opacity: 0 })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onUpdate: () => {
      const t = tl.time()
      const frames = Math.floor(t * 60)
      tcEl.textContent = `TC 00:00:${pad(t)}:${pad(frames % 60)}`
      frEl.textContent = `F ${pad(frames, 4)}`
      scrub.style.transform = `scaleX(${Math.min(1, t / 10)})`
      renderField()
      renderCube()
    },
  })

  // ===== 01 PROMPT (0 - 1.45) =====
  tl.to(q('.rl-hud'), { autoAlpha: 1, duration: 0.3 }, 0)
    .set(q('.rl-prompt'), { autoAlpha: 1 }, 0)
    .to(q('.rl-bar'), { width: () => Math.min(window.innerWidth * (window.innerWidth < 700 ? 0.88 : 0.54), 720), duration: 0.45, ease: 'expo.out' }, 0.08)
    .to(q('.rl-prompt-head'), { autoAlpha: 1, y: 0, duration: 0.3 }, 0.25)
    .add(typer($('.rl-typed'), 'classify this banking customer query').duration(0.55), 0.38)
    .to(q('.rl-sending'), { autoAlpha: 1, duration: 0.08, repeat: 3, yoyo: true }, 0.9)
    .to(q('.rl-send'), { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, 0.95)
    .to(q('.rl-bar'), { height: 2, width: '7vw', duration: 0.2, ease: 'expo.in' }, 1.04)
    .to(q('.rl-bar > *, .rl-prompt-head'), { autoAlpha: 0, duration: 0.1 }, 1.04)
    .to(q('.rl-prompt'), { autoAlpha: 0, duration: 0.08 }, 1.4)

  // ===== 02 TYPE (1.45 - 3.1) =====
    .call(() => setChapter('02 TYPE'), null, 1.45)
    .set(q('.rl-data'), { autoAlpha: 1 }, 1.45)
    .fromTo(q('.rl-data .rl-solid'), { yPercent: 70, scaleY: 1.6, autoAlpha: 0 }, { yPercent: 0, scaleY: 1, autoAlpha: 1, duration: 0.32, ease: 'expo.out', immediateRender: false }, 1.45)
    .fromTo(q('.rl-echo.up'), { xPercent: -30, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'expo.out', immediateRender: false }, 1.5)
    .fromTo(q('.rl-echo.down'), { xPercent: 30, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.45, ease: 'expo.out', immediateRender: false }, 1.5)
    .to(q('.rl-data'), { scale: 1.08, duration: 0.55, ease: 'none' }, 1.5)
    .set(q('.rl-data'), { autoAlpha: 0 }, 2.05)

    .set(q('.rl-tobuy'), { autoAlpha: 1 }, 2.05)
    .fromTo(q('.rl-tobuy .rl-solid'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.22, ease: 'expo.out', immediateRender: false }, 2.05)
    .fromTo(q('.rl-select'), { '--box': 0 }, { '--box': 1, duration: 0.2, immediateRender: false }, 2.12)
    .fromTo(q('.rl-select .h'), { scale: 0 }, { scale: 1, duration: 0.18, stagger: 0.015, ease: 'back.out(3)', immediateRender: false }, 2.16)
    .fromTo(q('.rl-dims'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.2, immediateRender: false }, 2.2)
    .to(q('.rl-select'), { scale: 1.05, duration: 0.5, ease: 'none' }, 2.1)
    .set(q('.rl-tobuy'), { autoAlpha: 0 }, 2.6)

    .set(q('.rl-live'), { autoAlpha: 1 }, 2.6)
    .fromTo(q('.rl-bg'), { backgroundColor: '#ffffff' }, { backgroundColor: '#ededeb', duration: 0.4, immediateRender: false }, 2.6)
    .set(q('.rl-hud'), { '--hud': '#050505' }, 2.6)
    .fromTo(q('.rl-live .rl-solid'), { scale: 1.25, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'expo.out', immediateRender: false }, 2.6)
    .fromTo(q('.rl-dot'), { scale: 0 }, { scale: 1, duration: 0.25, ease: 'back.out(3)', immediateRender: false }, 2.68)
    .to(q('.rl-dot'), { autoAlpha: 0.25, duration: 0.12, yoyo: true, repeat: 1 }, 2.9)
    .set(q('.rl-live'), { autoAlpha: 0 }, 3.1)
    .set(q('.rl-bg'), { backgroundColor: '#050505' }, 3.1)
    .set(q('.rl-hud'), { '--hud': '#e8e8e6' }, 3.1)

  // ===== 03 SIGNAL (3.1 - 4.4) =====
    .call(() => setChapter('03 SIGNAL'), null, 3.1)
    .set(q('.rl-marquee'), { autoAlpha: 1 }, 3.1)
    .fromTo(q('.rl-row'), { xPercent: (i, el) => (el.dataset.dir === '1' ? -30 : 0) }, {
      xPercent: (i, el) => (el.dataset.dir === '1' ? 0 : -30), duration: 0.95, ease: 'power1.inOut', immediateRender: false,
    }, 3.1)
    .fromTo(q('.rl-row'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.25, stagger: 0.02, ease: 'expo.out', immediateRender: false }, 3.1)
    .to(q('.rl-marquee'), { skewY: -4, scale: 1.08, duration: 0.6, ease: 'power2.in' }, 3.4)
    .to(q('.rl-row'), { scaleY: 0, duration: 0.18, stagger: { each: 0.012, from: 'center' }, ease: 'expo.in' }, 3.9)
    .set(q('.rl-marquee'), { autoAlpha: 0 }, 4.1)
    .to(q('.rl-glitch'), { autoAlpha: 1, scaleX: 1, duration: 0.12, ease: 'expo.out' }, 4.02)
    .to(q('.rl-glitch'), { autoAlpha: 0.2, duration: 0.04, yoyo: true, repeat: 3 }, 4.14)
    .to(q('.rl-glitch'), { scaleX: 0, autoAlpha: 0, duration: 0.14, ease: 'expo.in' }, 4.3)

  // ===== 04 BUILD (4.4 - 6.85) =====
    .call(() => setChapter('04 BUILD'), null, 4.4)
    .set(q('.rl-build'), { autoAlpha: 1 }, 4.4)
    .to(q('.rl-rings .ring'), { strokeDashoffset: 0, duration: 1.1, stagger: 0.12, ease: 'power2.inOut' }, 4.4)
    .to(q('.rl-rings .ticks line'), { opacity: 1, duration: 0.02, stagger: 0.006 }, 4.5)
    .fromTo(q('.rl-readout'), { autoAlpha: 0, x: (i) => (i ? 12 : -12) }, { autoAlpha: 1, x: 0, duration: 0.4, immediateRender: false }, 4.6)
    .fromTo(cubeState, { s: 0, p: 0, spin: Math.PI * 1.6 }, { s: 1, duration: 0.5, ease: 'back.out(1.7)', immediateRender: false }, 4.45)
    .to(cubeState, { p: 1, duration: 1.2, ease: 'power3.inOut' }, 4.5)
    .to(cubeState, {
      spin: 0, duration: 1.2, ease: 'power3.inOut',
      onUpdate: () => {
        const e = root.querySelector('.rx'); if (!e) return
        const left = 1 - cubeState.p
        e.textContent = `${(left * 118.4).toFixed(1)}°`
        root.querySelector('.ry').textContent = `${(left * -149.0).toFixed(1)}°`
        root.querySelector('.rz').textContent = `${(left * 51.6).toFixed(1)}°`
      },
    }, 4.5)
    .to(q('.rl-locked'), { autoAlpha: 1, duration: 0.05, repeat: 3, yoyo: true }, 5.72)
    .set(q('.rl-locked'), { autoAlpha: 1 }, 5.95)
    // the cube becomes the flat logo
    .set(q('.rl-logo-wrap'), { scale: BUILD_SCALE }, 5.7)
    .to(q('.rl-logo-wrap'), { autoAlpha: 1, duration: 0.18 }, 5.78)
    .to(q('.rl-cube'), { autoAlpha: 0, duration: 0.2 }, 5.82)
    .fromTo(q('.rl-logo-wrap'), { scale: BUILD_SCALE * 1.06 }, { scale: BUILD_SCALE, duration: 0.5, ease: 'elastic.out(1, 0.5)', immediateRender: false }, 5.8)
    // six dots orbit in and collapse into the logo
    .to(q('.rl-orbit i'), { autoAlpha: 1, duration: 0.15, stagger: 0.03 }, 6.35)
    .fromTo(q('.rl-orbit'), { rotation: 0, scale: 1 }, { rotation: 120, scale: 0, duration: 0.5, ease: 'expo.in', immediateRender: false }, 6.45)
    .to(q('.rl-logo-wrap'), { scale: 1.2, duration: 0.45, ease: 'expo.in' }, 6.5)
    .to(q('.rl-rings, .rl-readout'), { autoAlpha: 0, duration: 0.3 }, 6.55)

  // ===== 05 FIELD (6.85 - 8.0) =====
    .call(() => setChapter('05 FIELD'), null, 6.85)
    .set(q('.rl-build'), { autoAlpha: 0 }, 6.9)
    .set(fieldState, { alpha: 1, grow: 0, shrink: 0, wave: 0 }, 6.85)
    .to(fieldState, { grow: 1.6, duration: 0.6, ease: 'power2.out' }, 6.85)
    .to(fieldState, { wave: 1.2, duration: 1.15, ease: 'none' }, 6.85)
    .to(q('.rl-logo-wrap'), { scale: 0.32, duration: 0.6, ease: 'expo.out' }, 6.95)
    .to(fieldState, { shrink: 1.6, duration: 0.45, ease: 'expo.in' }, 7.55)
    .set(fieldState, { alpha: 0 }, 8.0)

  // ===== 06 LOCKUP (8.0 - 10.0) =====
    .call(() => setChapter('06 LOCKUP'), null, 8.0)
    .to(q('.rl-logo-wrap'), { scale: 1, duration: 0.45, ease: 'expo.out' }, 8.0)
    .set(q('.rl-lockup'), { autoAlpha: 1 }, 8.3)
    .to(q('.rl-logo-wrap'), { x: () => -root.querySelector('.rl-logo-wrap').clientWidth * 1.57, scale: 0.86, duration: 0.55, ease: 'expo.inOut' }, 8.3)
    .to(q('.rl-wordmark span'), { yPercent: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out' }, 8.5)
    .add(typer($('.rl-tag-text'), 'data science · machine learning · NLP').duration(0.7), 9.0)
    .to(q('.rl-rule'), { scaleX: 1, duration: 0.6, ease: 'expo.inOut' }, 9.1)
    .addLabel('end', 10)

  // ===== exit (after the page has loaded) =====
    .to(q('.rl-skip'), { autoAlpha: 0, duration: 0.2 }, 'end')
    .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'expo.inOut' }, 'end+=0.15')
    .add(finish)

  tl.addPause('end', () => {
    const check = () => { if (isPageLoaded()) tl.play(); else timers.push(setTimeout(check, 100)) }
    check()
  })

  window.__reelTimeline = tl // used to preview single frames

  // Return visits skip straight to the lockup (about 2 s)
  if (quick) tl.seek(8.0, true)

  const skip = () => { tl.kill(); gsap.to(root, { opacity: 0, duration: 0.3, onComplete: finish }) }
  $('.rl-skip').addEventListener('click', skip)

  return () => {
    tl.kill()
    timers.forEach(clearTimeout)
    window.removeEventListener('resize', onResize)
    if (three) three.dispose()
    gsap.killTweensOf([cubeState, fieldState])
  }
}
