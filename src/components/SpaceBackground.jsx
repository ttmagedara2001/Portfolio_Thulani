import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// SpaceBackground — Immersive 3D Deep Space Astronomy Engine
//
// Layer architecture:
//   Layer 0 — Micro stars (dim, slow drift)  × 180
//   Layer 1 — Mid stars  (medium brightness) × 110
//   Layer 2 — Bright alpha stars (glow halo)  × 40
//
// Effects:
//   • Hyperspace warp-in on mount: stars accelerate outward then settle
//   • Mouse gravitational repulsion pushes nearby stars gently
//   • Twinkling via per-star sinusoidal alpha oscillation
//   • 4 slow-drifting nebula gradient blobs
// ---------------------------------------------------------------------------

const LAYERS = [
  { count: 180, rMin: 0.25, rMax: 0.9,  speedMult: 0.06, alphaMin: 0.2, alphaMax: 0.55, twinkle: 0.006 },
  { count: 110, rMin: 0.8,  rMax: 1.6,  speedMult: 0.13, alphaMin: 0.4, alphaMax: 0.85, twinkle: 0.010 },
  { count:  40, rMin: 1.4,  rMax: 2.4,  speedMult: 0.22, alphaMin: 0.7, alphaMax: 1.0,  twinkle: 0.015 },
]

const MOUSE_FORCE   = 90
const REPEL_STR     = 0.4
const WARP_DURATION = 90   // frames for hyperspace entry

// Nebula blob definitions — (cx%, cy%, color, radiusMult, baseOpacity)
const NEBULAS = [
  { cx: 0.15, cy: 0.22, r: 0.42, color: '99, 40, 180',   opacity: 0.055, driftX:  18, driftY: -12 },
  { cx: 0.82, cy: 0.65, r: 0.35, color: '20, 80,  220',  opacity: 0.045, driftX: -14, driftY:  10 },
  { cx: 0.50, cy: 0.85, r: 0.28, color: '180, 40, 220',  opacity: 0.038, driftX:   8, driftY: -18 },
  { cx: 0.70, cy: 0.12, r: 0.30, color: '20, 180, 210',  opacity: 0.030, driftX: -10, driftY:  15 },
]

function rand(a, b) { return a + Math.random() * (b - a) }

function initStar(canvas, layer) {
  const hue = Math.random() < 0.12 ? rand(260, 300)   // purple
            : Math.random() < 0.20 ? rand(185, 215)   // cyan-blue
            : 220                                       // cool white
  const angle = rand(0, Math.PI * 2)
  const speed = rand(layer.speedMult * 0.6, layer.speedMult * 1.4)
  return {
    x:           rand(0, canvas.width),
    y:           rand(0, canvas.height),
    r:           rand(layer.rMin, layer.rMax),
    vx:          Math.cos(angle) * speed,
    vy:          Math.sin(angle) * speed,
    baseAlpha:   rand(layer.alphaMin, layer.alphaMax),
    phase:       rand(0, Math.PI * 2),
    twinkle:     layer.twinkle,
    hue,
    layer:       LAYERS.indexOf(layer),
    // Warp origin — center of canvas (updated on resize)
    ox:          canvas.width  / 2,
    oy:          canvas.height / 2,
  }
}

export default function SpaceBackground() {
  const canvasRef  = useRef(null)
  const mouse      = useRef({ x: -9999, y: -9999 })
  const starsRef   = useRef([])
  const rafRef     = useRef(null)
  const tickRef    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // ── resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      // rebuild stars; set warp origins to new center
      starsRef.current = LAYERS.flatMap(layer =>
        Array.from({ length: layer.count }, () => initStar(canvas, layer))
      )
      tickRef.current = 0   // restart warp
    }
    resize()
    window.addEventListener('resize', resize)

    // ── mouse ────────────────────────────────────────────────────────────────
    const onMouseMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMouseMove)

    // ── nebula state (slow drift oscillation) ────────────────────────────────
    let nebulaTick = 0

    // ── draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      const tick = ++tickRef.current
      nebulaTick++

      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Warp factor: 1→0 as tick goes 0→WARP_DURATION, then stays 0
      const warp = tick < WARP_DURATION ? 1 - tick / WARP_DURATION : 0

      // ── Stars ──────────────────────────────────────────────────────────────
      for (const s of starsRef.current) {

        // Twinkle
        const rawAlpha = s.baseAlpha + 0.3 * Math.sin(tick * s.twinkle + s.phase)
        const alpha = Math.max(0.04, Math.min(1, rawAlpha))

        // Mouse repulsion (only mid/bright layers to avoid too much movement)
        if (s.layer > 0) {
          const dx   = s.x - mx
          const dy   = s.y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_FORCE && dist > 0) {
            const force = (MOUSE_FORCE - dist) / MOUSE_FORCE
            s.x += (dx / dist) * force * REPEL_STR * 2
            s.y += (dy / dist) * force * REPEL_STR * 2
          }
        }

        // Drift (warp applies a radial outward push during entry)
        if (warp > 0) {
          const wdx = s.x - s.ox
          const wdy = s.y - s.oy
          const wdist = Math.max(Math.sqrt(wdx * wdx + wdy * wdy), 1)
          s.x += (wdx / wdist) * warp * 4 * (s.layer + 1)
          s.y += (wdy / wdist) * warp * 4 * (s.layer + 1)
        }

        s.x += s.vx
        s.y += s.vy

        // Wrap edges
        if (s.x < -4)     s.x = W + 4
        if (s.x > W + 4)  s.x = -4
        if (s.y < -4)     s.y = H + 4
        if (s.y > H + 4)  s.y = -4

        // Draw glow halo for bright layer
        if (s.layer === 2) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5)
          glow.addColorStop(0, `hsla(${s.hue}, 85%, 92%, ${alpha * 0.55})`)
          glow.addColorStop(1, `hsla(${s.hue}, 85%, 92%, 0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        // Star core
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 80%, 95%, ${alpha})`
        ctx.fill()
      }

      // ── Nebula blobs ────────────────────────────────────────────────────────
      for (const nb of NEBULAS) {
        const t   = nebulaTick * 0.0004
        const cx  = nb.cx * W + Math.sin(t * 1.1) * nb.driftX
        const cy  = nb.cy * H + Math.cos(t * 0.9) * nb.driftY
        const rad = nb.r  * Math.min(W, H) * (0.9 + 0.1 * Math.sin(t))
        const op  = nb.opacity * (0.85 + 0.15 * Math.cos(t * 1.3))

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        grad.addColorStop(0, `rgba(${nb.color}, ${op})`)
        grad.addColorStop(0.5, `rgba(${nb.color}, ${op * 0.4})`)
        grad.addColorStop(1, `rgba(${nb.color}, 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
