import { useEffect, useRef } from 'react'

const QUADRANTS = [
  { id: 'fullstack', angle: 3.73, name: 'FS_CORE_NODE_01', label: 'Q1.TL', color: '217, 70, 239' }, // Top-Left (~213 deg)
  { id: 'iot',       angle: 5.69, name: 'IOT_CYBER_NODE_02', label: 'Q2.TR', color: '6, 182, 212' }, // Top-Right (~326 deg)
  { id: 'ecosystem', angle: 0.59, name: 'ECO_HUMAN_NODE_04', label: 'Q4.BR', color: '245, 158, 11' }, // Bottom-Right (~34 deg)
  { id: 'ar',        angle: 2.55, name: 'AR_SPATIAL_NODE_03', label: 'Q3.BL', color: '168, 85, 247' }  // Bottom-Left (~146 deg)
]

export default function RadarTerminal({ onSweepIntersect }) {
  const canvasRef = useRef(null)
  const lastIntersectedRef = useRef(null)
  const angleRef = useRef(0)
  
  // Track pulsing rings radii
  const pulsesRef = useRef([100, 250, 400])
  // Track active particle flares
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let animationFrameId

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      if (!W || !H) {
        animationFrameId = requestAnimationFrame(draw)
        return
      }

      const cx = W / 2
      const cy = H / 2
      const maxRadius = Math.sqrt(cx * cx + cy * cy)
      const targetDist = Math.min(Math.max(Math.min(W, H) * 0.35, 190), 340)

      // ── 1. Clear background ──
      ctx.fillStyle = '#02000a'
      ctx.fillRect(0, 0, W, H)

      // ── 2. Draw fine grid mesh with dot intersection markers ──
      ctx.save()
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)'
      ctx.lineWidth = 1
      const gridSize = 50
      ctx.beginPath()
      for (let x = cx % gridSize; x < W; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
      }
      for (let y = cy % gridSize; y < H; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
      }
      ctx.stroke()

      // Crosshairs at grid intersections
      ctx.fillStyle = 'rgba(34, 211, 238, 0.15)'
      for (let x = cx % gridSize; x < W; x += gridSize) {
        for (let y = cy % gridSize; y < H; y += gridSize) {
          if (Math.random() < 0.03) { // keep it sparse and clean
            ctx.fillRect(x - 1, y - 1, 3, 3)
          }
        }
      }
      ctx.restore()

      // ── 3. Draw Concentric Pulsing Rings ──
      ctx.save()
      const maxPulseRadius = Math.min(W, H) * 0.6
      pulsesRef.current = pulsesRef.current.map((r) => {
        let nextR = r + 1.2
        if (nextR > maxPulseRadius) {
          nextR = 0
        }
        
        const opacity = (1 - nextR / maxPulseRadius) * 0.09
        ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(cx, cy, nextR, 0, Math.PI * 2)
        ctx.stroke()
        return nextR
      })
      ctx.restore()

      // ── 4. Static Radar Telemetry Circles & Compass ──
      ctx.save()
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)'
      ctx.lineWidth = 1
      const staticRings = [100, 200, targetDist, targetDist + 60]
      staticRings.forEach((r) => {
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.stroke()

        // Tiny compass bearing tick marks on the node target ring
        if (r === targetDist) {
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)'
          ctx.fillStyle = 'rgba(34, 211, 238, 0.4)'
          ctx.font = '8px monospace'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          for (let deg = 0; deg < 360; deg += 15) {
            const rad = (deg * Math.PI) / 180
            const tickLen = deg % 90 === 0 ? 8 : 4
            const sx = cx + Math.cos(rad) * (r - tickLen / 2)
            const sy = cy + Math.sin(rad) * (r - tickLen / 2)
            const ex = cx + Math.cos(rad) * (r + tickLen / 2)
            const ey = cy + Math.sin(rad) * (r + tickLen / 2)
            
            ctx.beginPath()
            ctx.moveTo(sx, sy)
            ctx.lineTo(ex, ey)
            ctx.stroke()

            // Degree text at cardinals
            if (deg % 90 === 0) {
              const tx = cx + Math.cos(rad) * (r - 16)
              const ty = cy + Math.sin(rad) * (r - 16)
              ctx.fillText(`${deg}°`, tx, ty)
            }
          }
        }
      })
      ctx.restore()

      // ── 5. Center crosshair indicator ──
      ctx.save()
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)'
      ctx.lineWidth = 1
      ctx.beginPath()
      // Center crosshair
      ctx.moveTo(cx - 25, cy)
      ctx.lineTo(cx - 8, cy)
      ctx.moveTo(cx + 8, cy)
      ctx.lineTo(cx + 25, cy)
      ctx.moveTo(cx, cy - 25)
      ctx.lineTo(cx, cy - 8)
      ctx.moveTo(cx, cy + 8)
      ctx.lineTo(cx, cy + 25)
      ctx.stroke()
      ctx.restore()

      // ── 6. Draw Sweep Radar Line (rotating vector line with trailing fade) ──
      const sweepAngle = angleRef.current
      ctx.save()
      const trailCount = 65
      const trailAngleStep = (Math.PI / 180) * 0.9 // 0.9 deg steps
      for (let i = 0; i < trailCount; i++) {
        const a = (sweepAngle - i * trailAngleStep + Math.PI * 2) % (Math.PI * 2)
        const alpha = (1 - i / trailCount) * 0.18
        
        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
        ctx.lineWidth = i === 0 ? 2.5 : 1
        
        // Let's add a glowing head to the primary sweep line
        if (i === 0) {
          ctx.shadowColor = 'rgba(34, 211, 238, 0.8)'
          ctx.shadowBlur = 8
        } else {
          ctx.shadowBlur = 0
        }
        
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(a) * maxRadius, cy + Math.sin(a) * maxRadius)
        ctx.stroke()
      }
      ctx.restore()

      // ── 7. Target Quadrant Coordinates & Telemetry Markers ──
      QUADRANTS.forEach((q) => {
        const tx = cx + targetDist * Math.cos(q.angle)
        const ty = cy + targetDist * Math.sin(q.angle)

        // Check if radar sweep crosses this coordinate
        let diff = sweepAngle - q.angle
        if (diff < 0) diff += Math.PI * 2
        
        const isHovered = diff >= 0 && diff < 0.07 // sweet spot angle tolerance
        
        ctx.save()
        if (isHovered) {
          // Trigger callbacks & particle explosions
          if (lastIntersectedRef.current !== q.id) {
            lastIntersectedRef.current = q.id
            if (onSweepIntersect) {
              onSweepIntersect(q.id)
            }
            
            // Trigger Solar Flare local explosion of particle sparks!
            const particleCount = 35 + Math.floor(Math.random() * 15)
            for (let pIdx = 0; pIdx < particleCount; pIdx++) {
              const baseAngle = q.angle
              // Bias explosion outwards along the radial sweep angle, with some spray dispersion
              const sprayAngle = baseAngle + (Math.random() - 0.5) * 1.5
              const speed = Math.random() * 4.5 + 1.2
              
              particlesRef.current.push({
                x: tx,
                y: ty,
                vx: Math.cos(sprayAngle) * speed + (Math.random() - 0.5) * 1.0,
                vy: Math.sin(sprayAngle) * speed + (Math.random() - 0.5) * 1.0,
                color: q.color,
                alpha: 1.0,
                decay: 0.012 + Math.random() * 0.015,
                size: Math.random() * 2.5 + 1.0,
                friction: 0.975
              })
            }
          }
        }

        // Draw HUD Node on Canvas
        const targetOpacity = isHovered ? 1.0 : 0.28
        ctx.strokeStyle = `rgba(${q.color}, ${targetOpacity})`
        ctx.fillStyle = `rgba(${q.color}, ${isHovered ? 0.2 : 0.03})`
        ctx.lineWidth = isHovered ? 2 : 1
        
        // Reticle square brackets or ring at target
        ctx.shadowColor = `rgba(${q.color}, 0.8)`
        ctx.shadowBlur = isHovered ? 10 : 0
        ctx.beginPath()
        ctx.arc(tx, ty, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        
        // Draw crosshair corners
        ctx.shadowBlur = 0
        ctx.beginPath()
        const retSize = 15
        // Top Left
        ctx.moveTo(tx - retSize, ty - retSize + 5)
        ctx.lineTo(tx - retSize, ty - retSize)
        ctx.lineTo(tx - retSize + 5, ty - retSize)
        // Top Right
        ctx.moveTo(tx + retSize - 5, ty - retSize)
        ctx.lineTo(tx + retSize, ty - retSize)
        ctx.lineTo(tx + retSize, ty - retSize + 5)
        // Bottom Left
        ctx.moveTo(tx - retSize, ty + retSize - 5)
        ctx.lineTo(tx - retSize, ty + retSize)
        ctx.lineTo(tx - retSize + 5, ty + retSize)
        // Bottom Right
        ctx.moveTo(tx + retSize - 5, ty + retSize)
        ctx.lineTo(tx + retSize, ty + retSize)
        ctx.lineTo(tx + retSize, ty + retSize - 5)
        ctx.stroke()

        // Telemetry labeling on canvas next to the target
        ctx.fillStyle = `rgba(${q.color}, ${isHovered ? 0.95 : 0.4})`
        ctx.font = '9px monospace'
        ctx.textAlign = q.angle > Math.PI/2 && q.angle < 3*Math.PI/2 ? 'right' : 'left'
        const textOffset = q.angle > Math.PI/2 && q.angle < 3*Math.PI/2 ? -22 : 22
        
        ctx.fillText(q.name, tx + textOffset, ty - 4)
        ctx.fillStyle = `rgba(148, 163, 184, ${isHovered ? 0.8 : 0.3})`
        ctx.fillText(`${q.label} | BD:${(q.angle * 180 / Math.PI).toFixed(1)}°`, tx + textOffset, ty + 6)
        
        ctx.restore()
      })

      // ── 8. Update and Draw Solar Flare Particles ──
      ctx.save()
      particlesRef.current = particlesRef.current.filter((p) => {
        // Apply friction
        p.vx *= p.friction
        p.vy *= p.friction
        
        // Move particle
        p.x += p.vx
        p.y += p.vy
        
        // Decay alpha and size
        p.alpha -= p.decay
        if (p.alpha <= 0) return false

        // Draw spark with glowing glow particle shadow
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        return true
      })
      ctx.restore()

      // Increment rotation angle
      // Speed multiplier (default is around 0.009 for cinematic, 0.015 for snappier feedback)
      angleRef.current = (sweepAngle + 0.01) % (Math.PI * 2)

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      ro.disconnect()
    }
  }, [onSweepIntersect])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ background: '#02000a' }}
      aria-hidden="true"
    />
  )
}
