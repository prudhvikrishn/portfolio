import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Hero: gradient descent on a 3D loss surface.
// Inspired by @anirockshady's gradient descent piece in awesome-opus5-5-videos.
// The ball really runs gradient descent with momentum on the surface function below,
// dropping a dot at every step. Calm: slow camera drift, no cursor tracking,
// a still frame (full path drawn) for reduced motion, paused when off screen.

const BG = new THREE.Color('#0b0d11')
const SIZE = 9 // surface spans [-SIZE/2, SIZE/2]
const MIN = new THREE.Vector2(1.4, 1.1) // centre of the global minimum basin

// Synthetic loss surface: a tall peak, two smaller bumps, a wide basin, a gentle bowl.
function loss(x, z) {
  const g = (cx, cz, s) => Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / s)
  return (
    1.9 * g(-2.1, -1.5, 1.7) +
    0.75 * g(0.9, -2.3, 0.9) +
    0.5 * g(-2.4, 2.0, 1.2) -
    1.55 * g(MIN.x, MIN.y, 2.3) +
    0.035 * (x * x + z * z)
  )
}
function grad(x, z) {
  const e = 1e-3
  return [(loss(x + e, z) - loss(x - e, z)) / (2 * e), (loss(x, z + e) - loss(x, z - e)) / (2 * e)]
}

const surfaceVertex = /* glsl */ `
  attribute float aHeight;
  varying float vH;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying float vDepth;
  void main() {
    vH = aHeight;
    vNormal = normalize(normalMatrix * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vec4 mv = viewMatrix * world;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`

const surfaceFragment = /* glsl */ `
  uniform vec3 uLightDir;
  uniform vec3 uBg;
  uniform vec2 uMin;
  uniform vec3 uGroupPos;
  uniform float uSize;
  varying float vH;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying float vDepth;

  void main() {
    vec2 local = vWorld.xz - uGroupPos.xz;

    // height colour: teal valley -> soft grey slopes -> volcanic orange peak
    vec3 teal = vec3(0.145, 0.66, 0.68);
    vec3 grey = vec3(0.66, 0.69, 0.76);
    vec3 orange = vec3(1.0, 0.5, 0.24);
    vec3 col = mix(grey, orange, smoothstep(0.2, 1.35, vH));
    col = mix(teal * 0.9, col, smoothstep(-1.15, -0.25, vH));

    // soft lighting from a fixed direction
    float diff = max(dot(normalize(vNormal), normalize(uLightDir)), 0.0);
    col *= 0.5 + 0.7 * diff;
    // keep the peaks a warm volcanic orange even on the shaded side
    col += orange * 0.28 * smoothstep(0.5, 1.7, vH);

    // fine grid on the surface
    vec2 gp = local * 2.0;
    vec2 gl = abs(fract(gp - 0.5) - 0.5) / fwidth(gp);
    float line = 1.0 - min(min(gl.x, gl.y), 1.0);
    col = mix(col, col * 1.35 + 0.03, line * 0.22);

    // teal glow pooled in the minimum
    float d = length(local - uMin);
    col += vec3(0.15, 0.85, 0.88) * exp(-d * d / 0.55) * 0.55;

    // fade the square edges and distance into the background
    float r = max(abs(local.x), abs(local.y)) / (uSize * 0.5);
    float edge = 1.0 - smoothstep(0.62, 1.0, r);
    float fog = smoothstep(9.0, 17.0, vDepth);
    col = mix(col, uBg, fog);
    gl_FragColor = vec4(col, edge * (1.0 - fog * 0.6));
  }
`

const HeroScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60)
    const group = new THREE.Group()
    scene.add(group)

    // ---- surface ----
    const SEG = 180
    const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG)
    geo.rotateX(-Math.PI / 2)
    const p = geo.attributes.position
    const heights = new Float32Array(p.count)
    for (let i = 0; i < p.count; i++) {
      const h = loss(p.getX(i), p.getZ(i))
      heights[i] = h
      p.setY(i, h)
    }
    geo.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1))
    geo.computeVertexNormals()

    const surfMat = new THREE.ShaderMaterial({
      uniforms: {
        uLightDir: { value: new THREE.Vector3(-0.4, 0.9, 0.5) },
        uBg: { value: BG },
        uMin: { value: MIN.clone() },
        uGroupPos: { value: group.position },
        uSize: { value: SIZE },
      },
      vertexShader: surfaceVertex,
      fragmentShader: surfaceFragment,
      transparent: true,
      side: THREE.DoubleSide,
    })
    group.add(new THREE.Mesh(geo, surfMat))

    // ---- ball and lights ----
    const R = 0.17
    const ballGeo = new THREE.SphereGeometry(R, 48, 32)
    const ballMat = new THREE.MeshStandardMaterial({ color: '#f08a4b', emissive: '#5a1e08', roughness: 0.32, metalness: 0.05 })
    const ball = new THREE.Mesh(ballGeo, ballMat)
    group.add(ball)
    scene.add(new THREE.AmbientLight('#ffffff', 0.55))
    const key = new THREE.DirectionalLight('#ffffff', 1.6)
    key.position.set(-3, 6, 4)
    scene.add(key)
    const rim = new THREE.PointLight('#25a8ad', 2.2, 5)
    rim.position.set(MIN.x, -0.6, MIN.y)
    group.add(rim)

    // ---- step dots (one per optimiser step) ----
    const MAX_DOTS = 260
    const dotPos = new Float32Array(MAX_DOTS * 3)
    const dotCol = new Float32Array(MAX_DOTS * 3)
    const dotGeo = new THREE.BufferGeometry()
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dotPos, 3))
    dotGeo.setAttribute('color', new THREE.BufferAttribute(dotCol, 3))
    dotGeo.setDrawRange(0, 0)
    const dotMat = new THREE.PointsMaterial({ size: 0.07, vertexColors: true, sizeAttenuation: true, depthWrite: false })
    group.add(new THREE.Points(dotGeo, dotMat))
    const DOT = new THREE.Color('#ffb27a')

    // ---- gradient descent with momentum ----
    const starts = [[-2.6, -0.2], [-1.0, -2.4], [-2.9, -2.6], [-1.3, -0.9], [0.4, -3.0]]
    let run = 0
    let pos = [0, 0]
    let vel = [0, 0]
    let dots = 0
    let stepTimer = 0
    let settled = 0
    let fade = 1

    const reset = () => {
      const s = starts[run % starts.length]
      run++
      pos = [s[0] + (Math.random() - 0.5) * 0.4, s[1] + (Math.random() - 0.5) * 0.4]
      vel = [0, 0]
      dots = 0
      settled = 0
      fade = 1
      dotGeo.setDrawRange(0, 0)
    }
    const ballTarget = () => new THREE.Vector3(pos[0], loss(pos[0], pos[1]) + R * 0.95, pos[1])
    const addDot = () => {
      if (dots >= MAX_DOTS) return
      dotPos.set([pos[0], loss(pos[0], pos[1]) + 0.03, pos[1]], dots * 3)
      dots++
      dotGeo.setDrawRange(0, dots)
      dotGeo.attributes.position.needsUpdate = true
    }
    const colourDots = () => {
      for (let i = 0; i < dots; i++) {
        const age = (dots - i) / Math.max(dots, 1)
        const k = (0.35 + 0.65 * (1 - age)) * fade
        dotCol[i * 3] = BG.r + (DOT.r - BG.r) * k
        dotCol[i * 3 + 1] = BG.g + (DOT.g - BG.g) * k
        dotCol[i * 3 + 2] = BG.b + (DOT.b - BG.b) * k
      }
      dotGeo.attributes.color.needsUpdate = true
    }
    const LR = 0.06
    const BETA = 0.86
    const converged = () => {
      const [gx, gz] = grad(pos[0], pos[1])
      return Math.hypot(vel[0], vel[1]) < 0.004 && Math.hypot(gx, gz) < 0.03
    }
    const step = () => {
      const [gx, gz] = grad(pos[0], pos[1])
      vel = [BETA * vel[0] - LR * gx, BETA * vel[1] - LR * gz]
      pos = [pos[0] + vel[0], pos[1] + vel[1]]
      addDot()
    }

    reset()
    ball.position.copy(ballTarget())

    // ---- framing ----
    let aspect = 1
    // The camera circles the surface slowly; on wide screens the view is shifted so the
    // surface sits in the right half, clear of the hero text.
    const frame = (t) => {
      const a = 0.55 + Math.sin(t * 0.05) * 0.18
      const wide = aspect >= 1
      const dist = wide ? 10.5 : 12.5
      camera.position.set(Math.sin(a) * dist, wide ? 6.2 : 7.4, Math.cos(a) * dist)
      camera.lookAt(0, -0.2, 0)
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h)
      aspect = w / h
      camera.aspect = aspect
      if (aspect >= 1) camera.setViewOffset(w, h, -w * 0.24, -h * 0.02, w, h)
      else camera.setViewOffset(w, h, 0, h * 0.06, w, h)
      camera.updateProjectionMatrix()
      frame(0)
      renderer.render(scene, camera)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    if (reduceMotion) {
      // Still frame: run the whole descent and show the full path.
      for (let i = 0; i < MAX_DOTS && !converged(); i++) step()
      ball.position.copy(ballTarget())
      colourDots()
    }
    resize()

    let raf = 0
    let visible = true
    let last = 0
    const clock = new THREE.Clock()
    const STEP_EVERY = 0.05 // seconds per optimiser step

    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = clock.getElapsedTime()

      if (settled > 0) {
        settled += dt
        if (settled > 2.2) fade = Math.max(0, 1 - (settled - 2.2) / 0.8)
        if (settled > 3.0) reset()
      } else {
        stepTimer += dt
        while (stepTimer >= STEP_EVERY && settled === 0) {
          stepTimer -= STEP_EVERY
          step()
          if (converged() || dots >= MAX_DOTS) settled = 0.0001
        }
      }
      // ease the ball between steps so it rolls smoothly
      ball.position.lerp(ballTarget(), 1 - Math.exp(-dt * 14))
      ball.rotation.x += vel[1] * 0.9
      ball.rotation.z -= vel[0] * 0.9
      colourDots()
      frame(t)
      renderer.render(scene, camera)
    }
    const start = () => {
      if (!reduceMotion && !raf && visible && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(mount)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      ;[geo, ballGeo, dotGeo].forEach((g) => g.dispose())
      ;[surfMat, ballMat, dotMat].forEach((m) => m.dispose())
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}

export default HeroScene
