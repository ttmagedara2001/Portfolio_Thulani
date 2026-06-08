import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// SpaceBackground — kinetic starfield rendered on an HTML5 <canvas>.
//
// Behaviour:
//   • Stars drift slowly across the field in randomised directions.
//   • Mouse position applies a soft gravitational repulsion so stars
//     subtly "push away" from the cursor, creating a parallax depth feel.
//   • The canvas is positioned fixed behind all content (z-index -1).
// ---------------------------------------------------------------------------

const NUM_STARS   = 220
const MAX_RADIUS  = 1.8
const DRIFT_SPEED = 0.18   // base drift multiplier
const MOUSE_FORCE = 80     // repulsion radius in px
const REPEL_STR   = 0.3    // how aggressively stars repel

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function initStar(canvas) {
  return {
    x:  randomBetween(0, canvas.width),
    y:  randomBetween(0, canvas.height),
    r:  randomBetween(0.3, MAX_RADIUS),
    // drift velocity
    vx: randomBetween(-DRIFT_SPEED, DRIFT_SPEED),
    vy: randomBetween(-DRIFT_SPEED * 0.5, DRIFT_SPEED * 0.5),
    // base opacity — twinkle oscillates around it
    baseAlpha: randomBetween(0.35, 0.95),
    // twinkle phase offset
    phase: randomBetween(0, Math.PI * 2),
    // twinkle speed
    twinkleSpeed: randomBetween(0.004, 0.016),
    // colour: mostly white-blue, occasional purple/cyan tints
    hue: Math.random() < 0.15 ? randomBetween(260, 300)   // purple
       : Math.random() < 0.25 ? randomBetween(185, 210)   // cyan-blue
       : 220,                                               // cool white
  }
}

export default function SpaceBackground() {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -9999, y: -9999 })
  const starsRef  = useRef([])
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    // ── resize helper ──────────────────────────────────────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      // reinitialise stars so they spread across new size
      starsRef.current = Array.from({ length: NUM_STARS }, () => initStar(canvas))
    }
    resize()
    window.addEventListener('resize', resize)

    // ── mouse tracker ──────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── animation loop ─────────────────────────────────────────────────────
    let tick = 0
    const draw = () => {
      tick++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouse.current.x
      const my = mouse.current.y

      for (const s of starsRef.current) {
        // twinkle
        const alpha = s.baseAlpha + 0.25 * Math.sin(tick * s.twinkleSpeed + s.phase)
        const clampedAlpha = Math.max(0.05, Math.min(1, alpha))

        // mouse repulsion
        const dx   = s.x - mx
        const dy   = s.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_FORCE && dist > 0) {
          const force = (MOUSE_FORCE - dist) / MOUSE_FORCE
          s.x += (dx / dist) * force * REPEL_STR * 2
          s.y += (dy / dist) * force * REPEL_STR * 2
        }

        // drift
        s.x += s.vx
        s.y += s.vy

        // wrap around edges
        if (s.x < -2)               s.x = canvas.width  + 2
        if (s.x > canvas.width  + 2) s.x = -2
        if (s.y < -2)               s.y = canvas.height + 2
        if (s.y > canvas.height + 2) s.y = -2

        // draw — larger stars get a soft glow halo
        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
          glow.addColorStop(0,   `hsla(${s.hue}, 80%, 90%, ${clampedAlpha * 0.6})`)
          glow.addColorStop(1,   `hsla(${s.hue}, 80%, 90%, 0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        // star core
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 80%, 95%, ${clampedAlpha})`
        ctx.fill()
      }

      // subtle nebula gradient overlays — painted once per frame at low opacity
      // they add depth without cluttering
      const neb1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.3, 0,
        canvas.width * 0.15, canvas.height * 0.3, canvas.width * 0.35
      )
      neb1.addColorStop(0,   'rgba(99,  40, 180, 0.045)')
      neb1.addColorStop(1,   'rgba(99,  40, 180, 0)')
      ctx.fillStyle = neb1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const neb2 = ctx.createRadialGradient(
        canvas.width * 0.82, canvas.height * 0.6, 0,
        canvas.width * 0.82, canvas.height * 0.6, canvas.width * 0.3
      )
      neb2.addColorStop(0,   'rgba(20, 100, 200, 0.04)')
      neb2.addColorStop(1,   'rgba(20, 100, 200, 0)')
      ctx.fillStyle = neb2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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
